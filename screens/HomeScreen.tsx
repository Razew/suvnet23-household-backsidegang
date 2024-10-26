import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, List, Surface, Text, useTheme } from 'react-native-paper';
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
import { Household, User_To_Household } from '../types/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(selectLoggedInUser);
  if (!loggedInUser) {
    return (
      <View style={container}>
        <Text style={large}>Not logged in</Text>
      </View>
    );
  }

  const usersLastHousehold = useAppSelector(selectCurrentHousehold);
  const allHouseholds = useAppSelector(selectHouseholds);
  const allUserToHouseholds = useAppSelector(selectUsersToHouseholds);
  const allAvatars = useAppSelector(selectAvatars);

  const userHouseholds: User_To_Household[] = allUserToHouseholds.filter(
    (userToHousehold) => userToHousehold.user_id === loggedInUser?.id,
  );

  const profileAndHouseholds = userHouseholds.map((userHousehold) => {
    const household = allHouseholds.find(
      (household) => household.id === userHousehold.household_id,
    )!;
    return { household, profile: userHousehold };
  });

  // console.log(JSON.stringify(profileAndHouseholds, null, 2));

  const goToHousehold = (household: Household) => {
    if (household.id !== usersLastHousehold?.id) {
      dispatch(setCurrentHousehold(household));
    }
    navigation.navigate('HouseholdScreen');
  };

  return (
    <View style={s.container}>
      <ScrollView>
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
                              (avatar) =>
                                avatar.id === userToHousehold.avatar_id,
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
                <View>
                  <Button
                    icon="home-import-outline"
                    mode="contained"
                    onPress={() => goToHousehold(profileAndHousehold.household)}
                    style={s.enterHouseholdButton}
                  >
                    Enter
                  </Button>
                </View>
              </List.Accordion>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={[s.buttonRow, { backgroundColor: colors.elevation.level2 }]}>
        <Button
          icon="home-search"
          mode="elevated"
          style={s.button}
          onPress={() => navigation.navigate('JoinHousehold')}
        >
          Join household
        </Button>
        <Button
          icon="home-plus"
          mode="elevated"
          elevation={5}
          style={s.button}
          onPress={() => navigation.navigate('CreateHousehold')}
        >
          Create household
        </Button>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
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
    borderRadius: 6,
  },
  buttonRow: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
  },
  enterHouseholdButton: {
    marginVertical: 10,
    width: 100,
  },
  surface: {
    marginTop: 20,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
