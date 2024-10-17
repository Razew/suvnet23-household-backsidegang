import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Household } from '../types/types';
import { supabase } from '../utils/supabase';

export default function CreateHouseholdScreen() {
  const [newHousehold, setNewHousehold] = useState('');
  const [existingHouseholds, setExistingHouseholds] = useState<Household[]>([]);
  const [code, setCode] = useState('');

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
      console.log(
        `Household ${newHousehold} with code ${code} already exists in DB`,
      );
    } else {
      console.log(`You have added ${newHousehold} with code ${code} to the DB`);
    }
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
});
