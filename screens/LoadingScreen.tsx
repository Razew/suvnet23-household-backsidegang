import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import hushalletLogo from '../assets/image/icon_2.png';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { container } from '../themes/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Loading'>;

export default function LoadingScreen({ navigation }: Props) {
  const { colors } = useTheme();
  return (
    <View style={[container, { backgroundColor: colors.primaryContainer }]}>
      <Image
        source={hushalletLogo}
        style={{ width: '100%' }}
        resizeMode="contain"
      />
      <Button
        mode="elevated"
        onPress={() => navigation.replace('Login')}
      >
        Go to Login
      </Button>
      <Button
        mode="elevated"
        onPress={() => navigation.replace('Register')}
      >
        Register an account
      </Button>
    </View>
  );
}
