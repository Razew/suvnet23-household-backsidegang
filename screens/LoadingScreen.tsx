import { Text, View } from 'react-native';
import { container, large } from '../themes/styles';

export default function LoadingScreen() {
  return (
    <View style={container}>
      <Text style={large}>Loading screen</Text>
    </View>
  );
}
