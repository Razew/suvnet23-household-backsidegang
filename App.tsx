import { StatusBar } from 'expo-status-bar';
import RootStackNavigator from './navigators/RootStackNavigator';
import ThemeProvider from './providers/ThemeProvider';

export default function App() {
  return (
    <ThemeProvider>
      <StatusBar style={'auto'} />
      <RootStackNavigator />
    </ThemeProvider>
  );
}
