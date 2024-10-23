import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { HouseholdProvider } from './contexts/HouseholdContext';
import RootStackNavigator from './navigators/RootStackNavigator';
import ThemeProvider from './providers/ThemeProvider';
import { store } from './store/store';

export default function App() {
  return (
    <HouseholdProvider>
      <Provider store={store}>
        <ThemeProvider>
          <StatusBar style="auto" />
          <RootStackNavigator />
        </ThemeProvider>
      </Provider>
    </HouseholdProvider>
  );
}
