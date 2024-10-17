import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Snackbar, TextInput } from 'react-native-paper';
import { Household } from '../types/types';
import { supabase } from '../utils/supabase';
import { HomeStackParamList } from '../navigators/HomeStackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<HomeStackParamList, 'CreateHousehold'>;

export default function CreateHouseholdScreen({ navigation }: Props) {
  const [newHousehold, setNewHousehold] = useState('');
  const [existingHouseholds, setExistingHouseholds] = useState<Household[]>([]);
  const [code, setCode] = useState('');
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [AddedToDataBase, setAddedToDataBase] = useState(false);
  const [visible, setVisible] = useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    getHouseholds();
  }, []);

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
        console.log(dbQueryResult);
        setExistingHouseholds(dbQueryResult);
      } else {
        console.log('No household records found');
      }
    } catch (error) {
      console.error('Error fetching households:', (error as Error).message);
    }
  };

  const handleSubmit = async () => {
    // check if our user household name & code match the db
    const householdExists = existingHouseholds.some(
      (h) =>
        newHousehold.toLowerCase() === h.name.toLowerCase() &&
        code.toLowerCase() === h.code.toLowerCase(),
    );

    if (householdExists) {
      const errorMessage: string = `Household ${newHousehold} with code ${code} already exists in DB`;
      // Display feedback on screen // Snackbar?
      console.log(errorMessage);
      setSnackBarMessage(errorMessage);
      setAddedToDataBase(false);
    } else {
      const successMessage: string = `You have added ${newHousehold} with code ${code} to the DB`;
      console.log(successMessage);
      setSnackBarMessage(successMessage);
      setAddedToDataBase(true);
      // Display feedback on screen // Snackbar?
      // Then navigate to household screen (How? timed/ continue button? Something else?)
    }

    onToggleSnackBar();
  };

  return (
    <View style={style.container}>
      <TextInput
        label="Enter Household"
        value={newHousehold}
        onChangeText={(household) => setNewHousehold(household)}
      />
      <TextInput
        label="Enter code"
        value={code}
        onChangeText={(code) => setCode(code)}
      />
      <Button
        mode="contained"
        onPress={handleSubmit}
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
