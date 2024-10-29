import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HandleChoreScreen from '../screens/HandleChoreScreen';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeStackNavigator from './HomeStackNavigator';
import { Chore } from '../types/types';

export type RootStackParamList = {
  Loading: undefined;
  Login: undefined;
  Register: undefined;
  HomeNavigator: undefined;
  CreateChore: undefined;
  EditChore: undefined;
  HandleChore: { chore: Chore | undefined };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <RootStack.Navigator
      initialRouteName="Loading"
      screenOptions={{ headerBackTitle: 'Back', headerShown: false }} // Only relevant for iOS
    >
      <RootStack.Screen
        name="Loading"
        component={LoadingScreen}
      />
      <RootStack.Screen
        name="Login"
        component={LoginScreen}
      />
      <RootStack.Screen
        name="Register"
        component={RegisterScreen}
      />
      <RootStack.Screen
        name="HomeNavigator"
        component={HomeStackNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="HandleChore"
        component={HandleChoreScreen}
        options={{
          headerShown: false,
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
    </RootStack.Navigator>
  );
}
