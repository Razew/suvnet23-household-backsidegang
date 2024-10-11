import { Text, View } from 'react-native';
import { container, large } from '../themes/styles';

export default function HomeScreen() {
  return (
    <View style={container}>
      <Text style={large}>Home screen</Text>
    </View>
  );
}
