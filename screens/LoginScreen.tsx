import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import hushallet_logo from '../assets/image/icon_2.png';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { loginUser, resetState, selectLogInSuccess } from '../store/auth/slice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { authStyles } from '../themes/styles';
import ChoreFrequency from '../components/ChoreFrequency';
import ChoreWeight from '../components/ChoreWeight';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.auth.error);
  const loading = useAppSelector((state) => state.auth.loading);
  const success = useAppSelector(selectLogInSuccess);

  const handleLogin = () => {
    dispatch(loginUser({ username: form.username, password: form.password }));
  };

  useEffect(() => {
    if (success) {
      navigation.replace('HomeNavigator');
    }
  }, [success]);

  const handleNavigate = () => {
    dispatch(resetState());
    navigation.navigate('Register');
  };

  return (
    <>
      <SafeAreaView
        style={{ backgroundColor: colors.primaryContainer, flex: 1 }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView keyboardShouldPersistTaps={'handled'}>
            <View style={authStyles.root}>
              <Image
                source={hushallet_logo}
                resizeMode="contain"
                style={authStyles.logo}
              />
              <View style={authStyles.container}>
                <Text style={authStyles.title}>Log in</Text>
                {error && (
                  <View>
                    <Text style={{ color: colors.error }}>{error}</Text>
                  </View>
                )}
                <TextInput
                  style={authStyles.input}
                  mode="outlined"
                  label="Username"
                  value={form.username}
                  onChangeText={(e) => setForm({ ...form, username: e })}
                />
                <TextInput
                  style={authStyles.input}
                  mode="outlined"
                  label="Password"
                  secureTextEntry={!showPassword}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? 'eye-off' : 'eye'}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                  value={form.password}
                  onChangeText={(e) => setForm({ ...form, password: e })}
                />
                <Button
                  style={authStyles.button}
                  icon="login"
                  mode="contained"
                  onPress={handleLogin}
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Log In'}
                </Button>
                <View style={authStyles.linkTextContainer}>
                  <Text>Dont have an account? </Text>
                  <TouchableOpacity onPress={handleNavigate}>
                    <Text style={authStyles.linkText}>Sign up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <ChoreFrequency />
            <ChoreWeight />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
// function useEffect(arg0: () => void, arg1: never[]) {
//   throw new Error('Function not implemented.');
// }

// function fetchChores(): any {
//   throw new Error('Function not implemented.');
// }

// function fetchAvatars(): any {
//   throw new Error('Function not implemented.');
// }

// function fetchChoresToUsers(): any {
//   throw new Error('Function not implemented.');
// }

// function fetchHouseholds(): any {
//   throw new Error('Function not implemented.');
// }

// function fetchUsersToHouseholds(): any {
//   throw new Error('Function not implemented.');
// }
