import { StatusBar } from 'expo-status-bar';
import RootStackNavigator from './navigators/RootStackNavigator';
import StatisticsScreen from './screens/StatisticsScreen';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      {/* <RootStackNavigator /> */}
      <StatisticsScreen />
    </NavigationContainer>
  );
}
