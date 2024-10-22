import { StatusBar } from 'expo-status-bar';
import RootStackNavigator from './navigators/RootStackNavigator';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <RootStackNavigator />
    </NavigationContainer>
  );
}
