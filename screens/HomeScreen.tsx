import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Button, Surface, Text } from 'react-native-paper';
import { HomeStackParamList } from '../navigators/HomeStackNavigator';
import { container, large } from '../themes/styles';
import { selectAllHouseholds } from '../store/households/slice';
import { selectUsersToHouseholds } from '../store/userToHousehold/slice';
import { useAppSelector } from '../store/hooks';
import { User_To_Household } from '../types/types';
import { selectLoggedInUser } from '../store/Auth/slice';
import HouseholdCard from '../components/HouseholdCard';
type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const loggedInUser = useAppSelector(selectLoggedInUser);
  if (!loggedInUser) {
    <View style={container}>
      <Text style={large}>Not logged in</Text>
    </View>;
  }

  const allHouseholds = useAppSelector(selectAllHouseholds);
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

  return (
    <Surface style={container}>
      <Surface
        style={s.cardContainer}
        elevation={0}
      >
        {userHouseholds.length > 0 ? (
          profileAndHouseholds.map((profileAndHousehold) => (
            <HouseholdCard
              key={profileAndHousehold.household.id}
              household={profileAndHousehold.household}
              profile={profileAndHousehold.profile}
              navigation={navigation}
            />
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
    </Surface>
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
});
