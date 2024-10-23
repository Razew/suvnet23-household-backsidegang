import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, List, Text } from 'react-native-paper';
import { useHouseholdContext } from '../contexts/HouseholdContext';
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
  const { mostRecentHousehold, setMostRecentHousehold } = useHouseholdContext();

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
        // flatMap the data to extract the household objects
        const households: Household[] = data.flatMap(
          (u: SupabaseHouseholdResponse) => u.household,
        );
        setUserHouseholds(households);
      }
    };

    fetchUserHouseholds();
  }, []);

  const fetchHouseholdById = async (id: number) => {
    const { data, error } = await supabase
      .from('household')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching household by id:', error.message);
    } else {
      return data;
    }
  };

  const handlePress = async (id: number) => {
    // Set the selected household as the current household
    const newCurrentHH: Household = await fetchHouseholdById(id);
    if (newCurrentHH) {
      console.log(`Set ${newCurrentHH.name} as current household`);
      setMostRecentHousehold(newCurrentHH);
      console.log(newCurrentHH);
    } else {
      console.error('Failed to fetch the new household');
    }
  };

  return (
    <View style={style.container}>
      <Text>Change Household</Text>
      <Text>Last household: {usersLastHousehold?.name}</Text>
      <Text>Member of: </Text>

      {/* <List.Section title="Households">
        {userHouseholds.map((user_to_household, index) => (
          <List.Accordion
            key={index}
            title={`${user_to_household.name}`}
            description={`# ${user_to_household.code}`}
            left={(props) => (
              <List.Icon
                {...props}
                icon="folder"
              />
            )}
          >
            <List.Item title="First task" />
            <List.Item title="Second task" />
          </List.Accordion>
        ))}
      </List.Section> */}

      {userHouseholds.map((user_to_household, index) => (
        <View
          key={index}
          style={{ marginBottom: 10 }}
        >
          <List.Accordion
            title={`${user_to_household.name}`}
            description={`# ${user_to_household.code}`}
            left={(props) => (
              <List.Icon
                {...props}
                icon="home"
              />
            )}
          >
            {/* Get tasks for the household */}
            <List.Item title="First task" />
            <List.Item title="Second task" />
            {user_to_household.id !== usersLastHousehold.id && (
              <Button
                mode="outlined"
                onPress={() => {
                  handlePress(user_to_household.id);
                }}
                style={{ marginTop: 10 }}
              >
                {`Set ${user_to_household.name} as current household`}
              </Button>
            )}
          </List.Accordion>
        </View>
      ))}

      <View style={style.buttonContainer}>
        <Button
          mode="contained"
          // onPress={handleSubmit(onSubmit)}
          style={style.button}
          // disabled={AddedToDataBase}
        >
          Join household
        </Button>
        <Button
          mode="contained"
          // onPress={handleSubmit(onSubmit)}
          style={style.button}
          // disabled={AddedToDataBase}
        >
          Create household
        </Button>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
});
