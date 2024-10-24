import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { Image, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import hushalletLogo from '../assets/logo/hushallet_logo.png';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { fetchAvatars } from '../store/avatars/slice';
import { fetchChores } from '../store/chores/slice';
import { fetchChoresToUsers } from '../store/choreToUser/slice';
import { useAppDispatch } from '../store/hooks';
import { fetchHouseholds } from '../store/households/slice';
import { fetchUsersToHouseholds } from '../store/userToHousehold/slice';
import { container } from '../themes/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Loading'>;

export default function LoadingScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchChores());
    dispatch(fetchAvatars());
    dispatch(fetchChoresToUsers());
    dispatch(fetchHouseholds());
    dispatch(fetchUsersToHouseholds());
  }, []);

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
