import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Image, View } from 'react-native';
import hushalletLogo from '../assets/logo/hushallet_logo.png';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { container } from '../themes/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Loading'>;

export default function LoadingScreen({ navigation }: Props) {
  return (
    <View style={container}>
      <Image
        source={hushalletLogo}
        style={{ width: '100%' }}
        resizeMode="contain"
      />
      <Button
        title="Go to Login"
        onPress={() => navigation.replace('Login')}
      />
    </View>
  );
}
