import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text, View } from 'react-native';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { container, large } from '../themes/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Loading'>;

export default function LoadingScreen({ navigation }: Props) {
  return (
    <View style={container}>
      <Text style={large}>Loading screen</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.replace('Login')}
      />
    </View>
  );
}
