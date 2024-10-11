import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { container, large } from './themes/styles';

export default function App() {
  return (
    <View style={container}>
      <Text style={large}>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
