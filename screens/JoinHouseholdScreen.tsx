import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Snackbar, Text, TextInput } from 'react-native-paper';
import { z } from 'zod';
import AvatarSelector from '../components/AvatarSelector';
import { HomeStackParamList } from '../navigators/HomeStackNavigator';
import { selectLoggedInUser } from '../store/auth/slice';
import { selectCurrentAvatar } from '../store/avatars/slice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectCurrentHousehold,
  selectHouseholdBeingJoined,
  selectHouseholds,
  setCurrentHousehold,
  setHouseholdBeingJoined,
} from '../store/households/slice';
import {
  fetchUsersToHouseholds,
  selectUsersToHouseholds,
  setCurrentProfile,
  updateNickname,
} from '../store/userToHousehold/slice';
import { User_To_Household } from '../types/types';
import { supabase } from '../utils/supabase';

type Props = NativeStackScreenProps<HomeStackParamList, 'JoinHousehold'>;

const schema = z.object({
  householdCode: z.string().min(1, 'Household code is required'),
});

type FormData = z.infer<typeof schema>;

export default function JoinHouseholdScreen({ navigation }: Props) {
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [avatarSelectorVisible, setAvatarSelectorVisible] = useState(false);
  const currentHousehold = useAppSelector(selectCurrentHousehold);
  const allHouseholds = useAppSelector(selectHouseholds);
  const [nickname, setNickname] = useState('');
  const [hasNickname, setHasNickname] = useState(false);
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const loggedInUser = useAppSelector(selectLoggedInUser);
  const householdBeingJoined = useAppSelector(selectHouseholdBeingJoined);
  const currentAvatar = useAppSelector(selectCurrentAvatar);
  const currentUser = useAppSelector(selectLoggedInUser);
  const dispatch = useAppDispatch();
  const usersToHouseholds = useAppSelector(selectUsersToHouseholds);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const insertUserToHousehold = async () => {
    if (loggedInUser && householdBeingJoined && currentAvatar) {
      const userToInsert: User_To_Household = {
        user_id: loggedInUser.id,
        household_id: householdBeingJoined.id,
        avatar_id: currentAvatar.id,
        nickname: nickname,
        is_active: true,
        is_admin: false,
      };
      console.log('userToInsert object:', userToInsert);

      try {
        const { error } = await supabase
          .from('user_to_household')
          .insert(userToInsert);

        if (error) {
          console.error(error.message);
          setSnackBarVisible(true);
          <Snackbar
            visible={snackBarVisible}
            onDismiss={onDismissSnackBar}
            action={{
              label: 'Hail Satan',
              onPress: () => {
                console.error(error.message);
              },
            }}
          >
            {error.message}
          </Snackbar>;
        } else {
          console.log('Post inserted');
        }
      } catch (error) {
        console.error(
          'Something catastrophic happened eg DB connection failed: ',
          (error as Error).message,
        );
      }
    } else {
      console.error('You did not select an avatar, or something else happened');
    }
  };

  const onSubmit = async (data: FormData) => {
    const { householdCode } = data;

    const householdBeingJoined = allHouseholds.find(
      (h) => h.code.toLowerCase() === householdCode.toLowerCase(),
    );

    if (householdBeingJoined) {
      const userHouseholds = usersToHouseholds
        .filter(
          (usersToHousehold) => usersToHousehold.user_id === currentUser?.id,
        )
        .map((usersToHousehold) => usersToHousehold.household_id);

      if (userHouseholds.includes(householdBeingJoined.id)) {
        setSnackBarMessage('Already in this household');
        onToggleSnackBar();
      } else {
        console.log('Joining household: ', householdBeingJoined.name);
        dispatch(setHouseholdBeingJoined(householdBeingJoined));
        dispatch(fetchUsersToHouseholds());
        setSnackBarMessage(`Joined household: ${householdBeingJoined.name}`);
        setAvatarSelectorVisible(true);
      }
    } else {
      console.log('Create a snackbar to say no such household, you lazi fucks');
      setSnackBarMessage(`No household with that code exists`);
      onToggleSnackBar();
    }
  };

  const changeNickname = async () => {
    if (!loggedInUser) {
      return console.log('No logged in user');
    }
    if (nickname === '') {
      return console.log('No nickname');
    }
    if (!householdBeingJoined) {
      return console.log('No household is being joined');
    }
    // DB Insert | Should really be in an extraReducer
    await insertUserToHousehold();

    dispatch(
      updateNickname({
        nickname,
        userId: loggedInUser.id,
        currentHouseholdId: householdBeingJoined.id,
      }),
    );
    dispatch(
      setCurrentProfile({
        nickname: nickname,
        userId: loggedInUser.id,
        householdId: householdBeingJoined.id,
        avatarId: currentAvatar?.id,
      }),
    );
    setHasNickname(true);
  };

  return (
    <View style={style.container}>
      <Card>
        <Card.Content>
          <Controller
            control={control}
            name="householdCode"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Enter household code"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={!!errors.householdCode}
              />
            )}
          />
          {errors.householdCode && <Text>{errors.householdCode.message}</Text>}
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            style={style.button}
          >
            SEARCH FOR HOUSEHOLD
          </Button>
        </Card.Content>
      </Card>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'OK',
          onPress: () => {
            onDismissSnackBar();
          },
        }}
      >
        {snackBarMessage}
      </Snackbar>
      {avatarSelectorVisible ? (
        <View>
          <AvatarSelector />

          <View style={{ justifyContent: 'center' }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 20 }}>Current nickname: </Text>
              <Text style={{ fontSize: 20, marginBottom: 20, marginLeft: 10 }}>
                {nickname}
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 20,
                  borderWidth: 1,
                  borderColor: currentAvatar?.colour_code,
                  width: 27,
                  height: 27,
                  backgroundColor: currentAvatar?.colour_code,
                  borderRadius: 20,
                }}
              >
                {currentAvatar?.emoji}
              </Text>
            </View>
            <TextInput
              label="Choose nickname"
              value={nickname}
              onChangeText={setNickname}
            />
            <View
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                gap: 65,
                justifyContent: 'center',
                marginTop: 20,
              }}
            >
              <Button
                onPress={() => changeNickname()}
                mode="contained"
              >
                Set nickname
              </Button>
            </View>
          </View>

          {currentAvatar && hasNickname && householdBeingJoined ? (
            <>
              <Button
                mode="contained"
                onPress={() => {
                  dispatch(setCurrentHousehold(householdBeingJoined));
                  dispatch(setHouseholdBeingJoined(null));
                  setHasNickname(false);
                  console.log(
                    '!!!! Household being joined',
                    householdBeingJoined,
                  );
                  console.log(
                    '!!!! Current household should be the same as household being joined',
                    currentHousehold,
                  );

                  navigation.replace('HouseholdScreen');
                }}
              >
                Join household
              </Button>
            </>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginTop: 20,
  },
});
