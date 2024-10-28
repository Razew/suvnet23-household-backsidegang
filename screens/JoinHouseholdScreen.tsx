import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Snackbar, Text, TextInput } from 'react-native-paper';
import { z } from 'zod';
import AvatarSelector from '../components/AvatarSelector';
import NicknameForm from '../components/NicknameForm';
import { HomeStackParamList } from '../navigators/HomeStackNavigator';
import { selectLoggedInUser } from '../store/auth/slice';
import { selectCurrentAvatar } from '../store/avatars/slice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectCurrentHousehold,
  selectHouseholdBeingJoined,
  setHouseholdBeingJoined,
} from '../store/households/slice';
import {
  fetchUsersToHouseholds,
  selectCurrentProfile,
  selectUsersToHouseholds,
} from '../store/userToHousehold/slice';
import { Household } from '../types/types';
import { supabase } from '../utils/supabase';

type Props = NativeStackScreenProps<HomeStackParamList, 'JoinHousehold'>;

const schema = z.object({
  householdCode: z.string().min(1, 'Household code is required'),
});

type FormData = z.infer<typeof schema>;

export default function JoinHouseholdScreen({ navigation }: Props) {
  const [existingHouseholds, setExistingHouseholds] = useState<Household[]>([]);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [avatarSelectorVisible, setAvatarSelectorVisible] = useState(false);

  const currentAvatar = useAppSelector(selectCurrentAvatar);
  const currentNickname = useAppSelector(selectCurrentProfile); //UserToHousehold
  const householdBeingJoined = useAppSelector(selectHouseholdBeingJoined);
  const currentHousehold = useAppSelector(selectCurrentHousehold);

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

  useEffect(() => {
    getAllHouseholds();
  }, []);

  const getAllHouseholds = async () => {
    try {
      const { data: dbQueryResult, error } = await supabase
        .from('household')
        .select();

      if (error) {
        console.error(error.message);
        throw error;
      }

      if (dbQueryResult && dbQueryResult.length > 0) {
        setExistingHouseholds(dbQueryResult);
      } else {
        console.log('No household records found');
      }
    } catch (error) {
      console.error('Error fetching households:', (error as Error).message);
    }
  };

  const onSubmit = async (data: FormData) => {
    const { householdCode } = data;

    const householdBeingJoined = existingHouseholds.find(
      (h) => h.code.toLowerCase() === householdCode.toLowerCase(),
    );
    // console.log('Household being joined:', householdBeingJoined);

    if (householdBeingJoined) {
      const userHouseholds = usersToHouseholds
        .filter(
          (usersToHousehold) => usersToHousehold.user_id === currentUser?.id,
        )
        .map((usersToHousehold) => usersToHousehold.household_id);
      // console.log('Household ids user belong to:', userHouseholds);
      // console.log('householdBeingJoined.id', householdBeingJoined.id);

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
          <NicknameForm />

          {currentAvatar && currentNickname && householdBeingJoined ? (
            <>
              <TextInput>Chosen emoji: {currentAvatar.emoji}</TextInput>
              <TextInput>Chosen nickanme: {currentNickname.nickname}</TextInput>
              <TextInput>Current household: {currentHousehold?.name}</TextInput>
              <TextInput>
                Houeshold being joined: {householdBeingJoined.name}
              </TextInput>
              <Button
                mode="contained"
                onPress={() => {
                  // dispatch(setCurrentHousehold(householdBeingJoined));
                  dispatch(setHouseholdBeingJoined(null));
                  console.log(currentHousehold);
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
