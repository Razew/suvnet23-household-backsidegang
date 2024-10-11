import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateHouseholdScreen from '../screens/CreateHouseholdScreen';
import HomeScreen from '../screens/HomeScreen';
import JoinHouseholdScreen from '../screens/JoinHouseholdScreen';
import HouseholdTabNavigator from './HouseholdTabNavigator';

export type HomeStackParamList = {
  Home: undefined;
  JoinHousehold: undefined;
  CreateHousehold: undefined;
  HouseholdNavigator: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerBackTitle: 'Back' }}
    >
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
        name="HouseholdNavigator"
        component={HouseholdTabNavigator}
        options={{ title: 'Household' }}
      />
    </HomeStack.Navigator>
  );
}
