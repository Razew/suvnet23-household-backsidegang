import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { container, large } from '../themes/styles';

export default function StatisticsScreen() {
  return (
    <View style={container}>
      <Text style={large}>Statistics screen</Text>
    </View>
  );
}
