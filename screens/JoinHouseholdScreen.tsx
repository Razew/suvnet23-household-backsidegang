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
import { useAppDispatch } from '../store/hooks';
import { setHouseholdBeingJoined } from '../store/households/slice';
import { fetchUsersToHouseholds } from '../store/userToHousehold/slice';
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
  // const [nicknameFormVisible, setnicknameFormVisible] = useState(false);
  // const currentUser = useAppSelector(selectLoggedInUser);
  const dispatch = useAppDispatch();
  // const loggedinuser = useAppSelector(selectCurrentProfile);
  // const { setMostRecentHousehold } = useHouseholdContext();

  // console.log(`user: ${currentUser?.id}`);

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

  // const insertUserToHousehold = async (household: Household) => {
  //   if (currentUser) {
  //     const userToInsert: User_To_Household = {
  //       user_id: currentUser?.id,
  //       household_id: household.id,
  //       avatar_id: loggedinuser?.avatar_id ?? 0,
  //       nickname: loggedinuser?.nickname ?? '',
  //       is_active: true,
  //       is_admin: false,
  //     };

  //     try {
  //       const { error } = await supabase
  //         .from('user_to_household')
  //         .insert(userToInsert);

  //       if (error) {
  //         console.error(error.message);
  //         throw error;
  //       }
  //     } catch (error) {
  //       console.log('CALL DA POLICE: ', (error as Error).message);
  //     }
  //   }
  // };

  const onSubmit = async (data: FormData) => {
    const { householdCode } = data;

    const householdBeingJoined = existingHouseholds.find(
      (h) => h.code.toLowerCase() === householdCode.toLowerCase(),
    );
    console.log('Household being joined:', householdBeingJoined);

    if (householdBeingJoined) {
      // setMostRecentHousehold(household);
      // await insertUserToHousehold(household);
      dispatch(setHouseholdBeingJoined(householdBeingJoined));
      dispatch(fetchUsersToHouseholds());
      setSnackBarMessage(`Joined household: ${householdBeingJoined.name}`);
      setAvatarSelectorVisible(true);

      // onToggleSnackBar();
      // navigation.replace('HouseholdScreen');
      // console.log('balls');
    } else {
      setSnackBarMessage('Household code not found');
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
