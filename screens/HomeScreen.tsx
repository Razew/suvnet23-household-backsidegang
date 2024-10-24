import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Button, List, Text } from 'react-native-paper';
import { HomeStackParamList } from '../navigators/HomeStackNavigator';
import { selectLoggedInUser } from '../store/auth/slice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectCurrentHousehold,
  selectHouseholds,
  setCurrentHousehold,
} from '../store/households/slice';
import { selectUsersToHouseholds } from '../store/userToHousehold/slice';
import { container, large } from '../themes/styles';
import { User_To_Household } from '../types/types';
type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(selectLoggedInUser);
  if (!loggedInUser) {
    <View style={container}>
      <Text style={large}>Not logged in</Text>
    </View>;
  }

  const allHouseholds = useAppSelector(selectHouseholds);
  const allUserToHouseholds: User_To_Household[] = useAppSelector(
    selectUsersToHouseholds,
  );
  const userHouseholds: User_To_Household[] = allUserToHouseholds.filter(
    (userToHousehold) => userToHousehold.user_id === loggedInUser?.id,
  );

  const profileAndHouseholds = userHouseholds.map((userHousehold) => {
    const household = allHouseholds.find(
      (household) => household.id === userHousehold.household_id,
    )!;
    return { household, profile: userHousehold };
  });

  const usersLastHousehold = useAppSelector(selectCurrentHousehold);

  return (
    <>
      {/* <Surface style={container}>
        <Surface
          style={s.cardContainer}
          elevation={0}
        >
          {userHouseholds.length > 0 ? (
            profileAndHouseholds.map((profileAndHousehold) => (
              <Pressable
                key={profileAndHousehold.household.id}
                style={s.pressableContainer}
                onPress={() => {
                  navigation.navigate('HouseholdScreen');
                  dispatch(setCurrentHousehold(profileAndHousehold.household));
                }}
              >
                <HouseholdCard
                  household={profileAndHousehold.household}
                  profile={profileAndHousehold.profile}
                />
              </Pressable>
            ))
          ) : (
            <Text>No households found</Text>
          )}
        </Surface>
        <Surface elevation={0}>
          <Button
            mode="elevated"
            onPress={() => navigation.replace('CreateHousehold')}
          >
            Create Household
          </Button>
        </Surface>
      </Surface> */}

      <View>
        {profileAndHouseholds.map((profileAndHousehold) => (
          <View key={profileAndHousehold.household.id}>
            <List.Accordion
              title={profileAndHousehold.household.name}
              description={profileAndHousehold.household.code}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="home"
                />
              )}
            >
              <List.Item title="What's supposed to be here?" />
              <List.Item title="First task?" />
              <List.Item title="Second task?" />
              {profileAndHousehold.household.id !== usersLastHousehold?.id && (
                <Button
                  mode="outlined"
                  onPress={() => {
                    dispatch(
                      setCurrentHousehold(profileAndHousehold.household),
                    );
                  }}
                  style={{ marginTop: 10 }}
                >
                  {`Set ${profileAndHousehold.household.name} as current household`}
                </Button>
              )}
            </List.Accordion>
          </View>
        ))}
        <View style={s.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('JoinHousehold')}
            style={s.button}
          >
            Join household
          </Button>
          <Button
            mode="contained"
            style={s.button}
            onPress={() => navigation.navigate('CreateHousehold')}
          >
            Create household
          </Button>
        </View>
      </View>
    </>
  );
}

const s = StyleSheet.create({
  tempHouseholdContainer: {
    marginBottom: 20,
  },
  tempHouseholdName: {
    fontSize: 18,
  },
  cardContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
    padding: 10,
  },
  pressableContainer: {
    marginBottom: 13,
    height: 65,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: 20,
  },
});
