import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Snackbar, Text, TextInput } from 'react-native-paper';
import { z } from 'zod';
import { HomeStackParamList } from '../navigators/HomeStackNavigator';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectHouseholds,
  setCurrentHousehold,
} from '../store/households/slice';
import { NewHousehold } from '../types/types';
import { supabase } from '../utils/supabase';

type Props = NativeStackScreenProps<HomeStackParamList, 'CreateHousehold'>;

const schema = z.object({
  household: z.string().min(1, 'Household name is required'),
});

type FormData = z.infer<typeof schema>;

export default function CreateHouseholdScreen({ navigation }: Props) {
  // const [existingHouseholds, setExistingHouseholds] = useState<Household[]>([]);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [AddedToDataBase, setAddedToDataBase] = useState(false);
  const [visible, setVisible] = useState(false);
  // const { mostRecentHousehold, setMostRecentHousehold } = useHouseholdContext();
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const allHouseholds = useAppSelector(selectHouseholds);

  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  // useEffect(() => {
  //   getAllHouseholds();
  //   console.log('Most recent household');
  //   console.log(selectCurrentHousehold);
  // }, []);

  const checkIfHouseholdCodeExists = (code: string): boolean => {
    return allHouseholds.some((household) => household.code === code);
  };

  const generateRandomHouseholdCode = (): string => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  };

  const insertNewHousehold = async (newHousehold: NewHousehold) => {
    console.log(`Inserting ${newHousehold.name} ${newHousehold.code}`);

    try {
      const { data: dbQueryResult, error } = await supabase
        .from('household')
        .insert(newHousehold)
        .select()
        .single();

      if (error) {
        console.error(error.message);
        throw error;
      }

      if (dbQueryResult) {
        const householdAddedMessage: string = `Added ${dbQueryResult.name} household. Your code is: ${dbQueryResult.code}`;
        console.log(householdAddedMessage);
        console.log(JSON.stringify(dbQueryResult, null, 2));
        // setMostRecentHousehold(dbQueryResult);

        dispatch(setCurrentHousehold(dbQueryResult));
        setSnackBarMessage(householdAddedMessage);
      } else {
        console.log('Something did not work');
      }
    } catch (error) {
      console.log('Error inserting household:', (error as Error).message);
    }
  };

  // const getAllHouseholds = async () => {
  //   try {
  //     const { data: dbQueryResult, error } = await supabase
  //       .from('household')
  //       .select();

  //     if (error) {
  //       console.error(error.message);
  //       throw error;
  //     }

  //     if (dbQueryResult && dbQueryResult.length > 0) {
  //       // console.log(JSON.stringify(dbQueryResult, null, 2));
  //       console.log(`Total households in DB: ${dbQueryResult.length}`);
  //       setExistingHouseholds(dbQueryResult);
  //     } else {
  //       console.log('No household records found');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching households:', (error as Error).message);
  //   }
  // };

  const onSubmit = async (data: FormData) => {
    const { household } = data;
    let newCode = generateRandomHouseholdCode();

    // Generate a new code if the provided code already exists
    while (await checkIfHouseholdCodeExists(newCode)) {
      newCode = generateRandomHouseholdCode();
    }

    const newHousehold: NewHousehold = {
      name: household,
      code: newCode,
    };

    // check if our user household name & code already exists in the DB
    // If household exists return an errormessage, else insert the new household
    const householdExists = allHouseholds.some(
      (h) =>
        newHousehold.name.toLowerCase() === h.name.toLowerCase() &&
        newHousehold.code.toLowerCase() === h.code.toLowerCase(),
    );

    if (householdExists) {
      const errorMessage: string = `Household ${newHousehold.name} with code ${newHousehold.code} already exists in DB`;
      console.log(errorMessage);
      setSnackBarMessage(errorMessage);
      setAddedToDataBase(false);
    } else {
      insertNewHousehold(newHousehold);
      setAddedToDataBase(true);
    }

    onToggleSnackBar();
  };

  return (
    <View style={style.container}>
      <Card>
        <Card.Content>
          <Controller
            control={control}
            name="household"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Enter household name"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={!!errors.household}
              />
            )}
          />
          {errors.household && <Text>{errors.household.message}</Text>}
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            style={style.button}
            disabled={AddedToDataBase}
          >
            Create
          </Button>
        </Card.Content>
      </Card>

      {AddedToDataBase ? (
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          duration={1800000}
          action={{
            label: 'Continue',
            onPress: () => {
              navigation.replace('HouseholdScreen');
            },
          }}
        >
          {snackBarMessage}
        </Snackbar>
      ) : (
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Try again',
            onPress: () => {},
          }}
        >
          {snackBarMessage}
        </Snackbar>
      )}
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
