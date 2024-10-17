import { StatusBar } from 'expo-status-bar';
import RootStackNavigator from './navigators/RootStackNavigator';
import ThemeProvider from './providers/ThemeProvider';
import { Provider } from 'react-redux';
import { store } from './store/store';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <StatusBar style="auto" />
        <RootStackNavigator />
      </ThemeProvider>
    </Provider>
  );
}
