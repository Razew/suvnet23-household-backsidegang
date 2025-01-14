import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, StyleSheet } from 'react-native';
import AdminScreen from '../screens/AdminScreen';
import CreateHouseholdScreen from '../screens/CreateHouseholdScreen';
import HomeScreen from '../screens/HomeScreen';
import HouseholdScreen from '../screens/HouseholdScreen';
import JoinHouseholdScreen from '../screens/JoinHouseholdScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { selectLoggedInUser } from '../store/auth/slice';
import { useAppSelector } from '../store/hooks';
import { selectCurrentHousehold } from '../store/households/slice';
import { selectUsersToHouseholds } from '../store/userToHousehold/slice';
// import HouseholdTabNavigator from './HouseholdTabNavigator';

export type HomeStackParamList = {
  Home: undefined;
  JoinHousehold: undefined;
  CreateHousehold: undefined;
  HouseholdScreen: undefined;
  Profile: undefined;
  Admin: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

// both headerRight pressables are just there to make
// navigating back easier during development
export default function HomeStackNavigator() {
  const currentHousehold = useAppSelector(selectCurrentHousehold);
  const allUsersToHouseholds = useAppSelector(selectUsersToHouseholds);
  const loggedInUser = useAppSelector(selectLoggedInUser);

  const isAdminOnHousehold = allUsersToHouseholds
    .filter((user) => user.user_id === loggedInUser?.id)
    .filter((user) => user.household_id === currentHousehold?.id)
    .find((user) => user.is_admin === true);

  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <>
            {isAdminOnHousehold && (
              <Pressable
                style={s.tempExit}
                onPress={() => navigation.navigate('Admin')}
              >
                <MaterialIcons
                  name="admin-panel-settings"
                  size={40}
                  color="black"
                />
              </Pressable>
            )}
          </>
        ),
        headerLeft: () => (
          <Pressable
            style={s.tempExit}
            onPress={() => navigation.navigate('Profile')}
          >
            {/* <Text style={s.tempText}>ProfileScreen</Text> */}
            <MaterialIcons
              name="person"
              size={40}
              color="black"
            />
          </Pressable>
        ),
        headerBackTitle: 'Back',
        headerTitleAlign: 'center',
      })}
    >
      <HomeStack.Screen
        name="Admin"
        component={AdminScreen}
        options={{
          animation: 'slide_from_bottom',
        }}
      />
      <HomeStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          animation: 'slide_from_bottom',
        }}
      />
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
      />
      <HomeStack.Screen
        name="JoinHousehold"
        component={JoinHouseholdScreen}
        options={{ title: 'Join Household' }}
      />
      <HomeStack.Screen
        name="CreateHousehold"
        component={CreateHouseholdScreen}
        options={{ title: 'Create Household' }}
      />
      <HomeStack.Screen
        name="HouseholdScreen"
        component={HouseholdScreen}
        options={{ title: currentHousehold?.name ?? 'Household' }}
      />
    </HomeStack.Navigator>
  );
}

// TEMPORARY
const s = StyleSheet.create({
  tempExit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  tempText: {
    color: '#B0B0B0',
    fontWeight: '500',
  },
});
