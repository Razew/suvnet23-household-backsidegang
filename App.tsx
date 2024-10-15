import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import RootStackNavigator from './navigators/RootStackNavigator';
import { mockedAvatars } from './data/mocked';
import { Text, View } from 'react-native';
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <View style={{ width: '100%', height: '100%', marginTop: 40 }}>
        {mockedAvatars.map((avatar) => (
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 48 }}>{avatar.image}</Text>
            <View
              style={{
                backgroundColor: avatar.colour_code,
                width: 100,
                height: 100,
              }}
            />
          </View>
        ))}
        {/* <RootStackNavigator /> */}
      </View>
    </NavigationContainer>
  );
}
