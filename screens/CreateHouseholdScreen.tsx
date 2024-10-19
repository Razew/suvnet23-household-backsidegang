import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Snackbar, TextInput } from 'react-native-paper';
import { HomeStackParamList } from '../navigators/HomeStackNavigator';
import { Household } from '../types/types';
import { supabase } from '../utils/supabase';

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

  const insertNewHousehold = async () => {
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

  const handleSubmit = async () => {
    // check if our user household name & code already exists in the DB
    // If household exists return an errormessage, else insert the new household
    const householdExists = existingHouseholds.some(
      (h) =>
        newHousehold.toLowerCase() === h.name.toLowerCase() &&
        code.toLowerCase() === h.code.toLowerCase(),
    );

    if (householdExists) {
      const errorMessage: string = `Household ${newHousehold} with code ${code} already exists in DB`;
      console.log(errorMessage);
      setSnackBarMessage(errorMessage);
      setAddedToDataBase(false);
    } else {
      insertNewHousehold();
      setAddedToDataBase(true);
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
