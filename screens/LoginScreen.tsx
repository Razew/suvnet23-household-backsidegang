import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { container, large } from '../themes/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  return (
    <View style={container}>
      <Text style={large}>Login screen</Text>
      <Button
        mode="elevated"
        onPress={() => navigation.replace('HomeNavigator')}
      >
        Log in
      </Button>
      <Button
        mode="elevated"
        onPress={() => navigation.navigate('Register')}
      >
        Register
      </Button>
    </View>
  );
}
