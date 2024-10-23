import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Household, User } from '../types/types';
import { supabase } from '../utils/supabase';

// Need current logged in user
// Need last selected household
// To list all available households
// select households from

type SupabaseHouseholdResponse = {
  household: {
    id: number;
    name: string;
    code: string;
  }[];
};

const loggedInUser: User = {
  id: 5,
  username: 'sara',
  password: '12346578',
};

const usersLastHousehold: Household = {
  id: 1,
  name: 'Svensson Family',
  code: 'SVNS',
};

export default function ChangeHousehold() {
  const [userHouseholds, setUserHouseholds] = useState<Household[]>([]);

  useEffect(() => {
    const fetchUserHouseholds = async () => {
      const { data, error } = await supabase
        .from('user_to_household')
        .select(
          `
          household (
            id,
            name,
            code
          )
        `,
        )
        .eq('user_id', loggedInUser.id);

      if (error) {
        console.error('Error fetching user households:', error.message);
      } else {
        // Map the data to extract the household objects
        const households: Household[] = data.flatMap(
          (u: SupabaseHouseholdResponse) => u.household,
        );
        setUserHouseholds(households);
      }
    };

    fetchUserHouseholds();
  }, []);

  return (
    <View style={style.container}>
      <Text>Change Household</Text>
      <Text>Last household: {usersLastHousehold?.name}</Text>
      <Text>Member of: </Text>
      {userHouseholds.map((user_to_household, index) => (
        <View key={index}>
          <Text>Household ID: {user_to_household.id}</Text>
          <Text>Nickname: {user_to_household.name}</Text>
          <Text>Code: {user_to_household.code}</Text>
        </View>
      ))}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
  },
  button: {
    marginTop: 20,
  },
});
