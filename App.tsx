import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import RootStackNavigator from './navigators/RootStackNavigator';
import { migrate } from './database/migration';

export default function App() {
  migrate();
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <RootStackNavigator />
    </NavigationContainer>
  );
}
