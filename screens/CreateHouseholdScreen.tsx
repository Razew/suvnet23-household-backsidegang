import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button, Snackbar, Text, TextInput } from 'react-native-paper';
import { z } from 'zod';
import { HomeStackParamList } from '../navigators/HomeStackNavigator';
import { Household } from '../types/types';
import { supabase } from '../utils/supabase';

type Props = NativeStackScreenProps<HomeStackParamList, 'CreateHousehold'>;

const schema = z.object({
  household: z.string().min(1, 'Household name is required'),
  code: z.string().length(4, 'Code must be 4 characters long'),
});

type FormData = z.infer<typeof schema>;

export default function CreateHouseholdScreen({ navigation }: Props) {
  const [existingHouseholds, setExistingHouseholds] = useState<Household[]>([]);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [AddedToDataBase, setAddedToDataBase] = useState(false);
  const [visible, setVisible] = useState(false);
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
    getHouseholds();
  }, []);

  const insertNewHousehold = async (newHousehold: string, code: string) => {
    console.log(`Inserting ${newHousehold} ${code}`);

    try {
      const { data: dbQueryResult, error } = await supabase
        .from('household')
        .insert({ name: newHousehold, code: code })
        .select();

      if (error) {
        console.error(error.message);
        throw error;
      }

      if (dbQueryResult) {
        const householdAddedMessage: string = `Added id:${dbQueryResult[0].id} ${dbQueryResult[0].name} ${dbQueryResult[0].code}`;
        console.log(householdAddedMessage);
        console.log(JSON.stringify(dbQueryResult, null, 2));
        setSnackBarMessage(householdAddedMessage);
      } else {
        console.log('Something did not work');
      }
    } catch (error) {
      console.log('Error inserting household:', (error as Error).message);
    }
  };

  const getHouseholds = async () => {
    try {
      const { data: dbQueryResult, error } = await supabase
        .from('household')
        .select();

      if (error) {
        console.error(error.message);
        throw error;
      }

      if (dbQueryResult && dbQueryResult.length > 0) {
        console.log(`Total households in DB: ${dbQueryResult.length}`);
        console.log(JSON.stringify(dbQueryResult, null, 2));
        setExistingHouseholds(dbQueryResult);
      } else {
        console.log('No household records found');
      }
    } catch (error) {
      console.error('Error fetching households:', (error as Error).message);
    }
  };

  const onSubmit = async (data: FormData) => {
    const { household, code } = data;
    // check if our user household name & code already exists in the DB
    // If household exists return an errormessage, else insert the new household
    const householdExists = existingHouseholds.some(
      (h) =>
        household.toLowerCase() === h.name.toLowerCase() &&
        code.toLowerCase() === h.code.toLowerCase(),
    );

    if (householdExists) {
      const errorMessage: string = `Household ${household} with code ${code} already exists in DB`;
      console.log(errorMessage);
      setSnackBarMessage(errorMessage);
      setAddedToDataBase(false);
    } else {
      insertNewHousehold(household, code);
      setAddedToDataBase(true);
    }

    onToggleSnackBar();
  };

  return (
    <View style={style.container}>
      {/* <TextInput
        label="Enter Household"
        value={newHousehold}
        onChangeText={(household) => setNewHousehold(household)}
      />
      <TextInput
        label="Enter code"
        value={code}
        onChangeText={(code) => setCode(code)}
      /> */}
      <Controller
        control={control}
        name="household"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Enter Household"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={!!errors.household}
          />
        )}
      />
      {errors.household && <Text>{errors.household.message}</Text>}

      <Controller
        control={control}
        name="code"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Enter Code"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={!!errors.code}
          />
        )}
      />
      {errors.code && <Text>{errors.code.message}</Text>}
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={style.button}
      >
        Create
      </Button>
      {AddedToDataBase ? (
        <Snackbar
          // style={style.greenSnackBar}
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Continue',
            onPress: () => {
              navigation.replace('HouseholdNavigator');
            },
          }}
        >
          {snackBarMessage}
        </Snackbar>
      ) : (
        <Snackbar
          // style={style.redSnackBar}
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Try again',
            onPress: () => {
              // Do nothing
            },
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
    marginTop: 10,
  },
  // redSnackBar: {
  //   backgroundColor: 'red',
  // },
  // greenSnackBar: {
  //   backgroundColor: 'green',
  // },
});
