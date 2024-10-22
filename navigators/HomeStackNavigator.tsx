import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text } from 'react-native';
import CreateHouseholdScreen from '../screens/CreateHouseholdScreen';
import HomeScreen from '../screens/HomeScreen';
import JoinHouseholdScreen from '../screens/JoinHouseholdScreen';
import HouseholdTabNavigator from './HouseholdTabNavigator';
import ProfileScreen from '../screens/ProfileScreen';

export type HomeStackParamList = {
  Home: undefined;
  JoinHousehold: undefined;
  CreateHousehold: undefined;
  HouseholdNavigator: undefined;
  Profile: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

// both headerRight pressables are just there to make
// navigating back easier during development
export default function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <>
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
            <Pressable
              style={s.tempExit}
              onPress={() => navigation.replace('Profile')}
            >
              <Text style={s.tempText}>ProfileScreen</Text>
              <MaterialIcons
                name="exit-to-app"
                size={24}
                color="#D32F2F"
              />
            </Pressable>
          </>
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
        name="HouseholdNavigator"
        component={HouseholdTabNavigator}
        options={({ navigation }) => ({
          title: 'Household',
          headerRight: () => (
            <Pressable
              style={s.tempExit}
              onPress={() => navigation.replace('Home')}
            >
              <Text style={s.tempText}>HomeScreen</Text>
              <MaterialIcons
                name="exit-to-app"
                size={24}
                color="#D32F2F"
              />
            </Pressable>
          ),
        })}
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
