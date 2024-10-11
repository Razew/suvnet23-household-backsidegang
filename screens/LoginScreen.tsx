import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text, View } from 'react-native';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { container, large } from '../themes/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  return (
    <View style={container}>
      <Text style={large}>Login screen</Text>
      <Button
        title="Log in"
        onPress={() => navigation.replace('HomeNavigator')}
      />
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
}
