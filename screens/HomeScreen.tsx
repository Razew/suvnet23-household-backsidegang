import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, List, Surface, Text } from 'react-native-paper';
import { HomeStackParamList } from '../navigators/HomeStackNavigator';
import { selectLoggedInUser } from '../store/auth/slice';
import { selectAvatars } from '../store/avatars/slice';
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

  const usersLastHousehold = useAppSelector(selectCurrentHousehold);
  const allHouseholds = useAppSelector(selectHouseholds);
  const allUserToHouseholds = useAppSelector(selectUsersToHouseholds);
  const allAvatars = useAppSelector(selectAvatars);

  console.log(allAvatars);

  const userHouseholds: User_To_Household[] = allUserToHouseholds.filter(
    (userToHousehold) => userToHousehold.user_id === loggedInUser?.id,
  );

  const profileAndHouseholds = userHouseholds.map((userHousehold) => {
    const household = allHouseholds.find(
      (household) => household.id === userHousehold.household_id,
    )!;
    return { household, profile: userHousehold };
  });

  // console.log(JSON.stringify(allUserToHouseholds, null, 2));
  console.log(JSON.stringify(profileAndHouseholds, null, 2));

  useEffect(() => {
    if (profileAndHouseholds.length === 1) {
      dispatch(setCurrentHousehold(profileAndHouseholds[0].household));
    }
  }, [profileAndHouseholds, dispatch]);

  return (
    <>
      <View>
        {profileAndHouseholds.length === 0 ? (
          <Surface
            style={s.surface}
            elevation={4}
          >
            <Text>You are not a member of any households</Text>
          </Surface>
        ) : null}
        {profileAndHouseholds.map((profileAndHousehold) => (
          <View key={profileAndHousehold.household.id}>
            <List.Accordion
              title={profileAndHousehold.household.name}
              description={
                profileAndHousehold.household.id === usersLastHousehold?.id
                  ? `${profileAndHousehold.household.code} (Current household)`
                  : profileAndHousehold.household.code
              }
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="home"
                />
              )}
            >
              {allUserToHouseholds.map(
                (userToHousehold) =>
                  userToHousehold.household_id ===
                    profileAndHousehold.household.id && (
                    <View key={userToHousehold.nickname}>
                      <List.Item
                        title={userToHousehold.nickname}
                        description={
                          userToHousehold.is_active ? '' : 'Not active'
                        }
                        left={() => {
                          const avatar = allAvatars.find(
                            (avatar) => avatar.id === userToHousehold.avatar_id,
                          );
                          return avatar ? <Text>{avatar.emoji}</Text> : null;
                        }}
                        right={(props) =>
                          userToHousehold.is_admin ? (
                            <List.Icon
                              {...props}
                              icon="crown"
                            />
                          ) : null
                        }
                      />
                    </View>
                  ),
              )}
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
  surface: {
    marginTop: 20,
    padding: 8,
    // height: 80,
    // width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
