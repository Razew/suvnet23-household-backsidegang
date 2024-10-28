import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text } from 'react-native';
import CreateHouseholdScreen from '../screens/CreateHouseholdScreen';
import HomeScreen from '../screens/HomeScreen';
import HouseholdScreen from '../screens/HouseholdScreen';
import JoinHouseholdScreen from '../screens/JoinHouseholdScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useAppSelector } from '../store/hooks';
import { selectCurrentHousehold } from '../store/households/slice';
// import HouseholdTabNavigator from './HouseholdTabNavigator';

export type HomeStackParamList = {
  Home: undefined;
  JoinHousehold: undefined;
  CreateHousehold: undefined;
  HouseholdScreen: undefined;
  Profile: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

// both headerRight pressables are just there to make
// navigating back easier during development
export default function HomeStackNavigator() {
  const currentHousehold = useAppSelector(selectCurrentHousehold);

  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <Pressable
            style={s.tempExit}
            onPress={() => navigation.replace('Loading')}
          >
            <Text style={s.tempText}>LoadingScreen</Text>
            <MaterialIcons
              name="exit-to-app"
              size={24}
              color="#D32F2F"
            />
          </Pressable>
        ),
        headerLeft: () => (
          <Pressable
            style={s.tempExit}
            onPress={() => navigation.replace('Profile')}
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
        name="Profile"
        component={ProfileScreen}
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
