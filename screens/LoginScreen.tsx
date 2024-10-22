import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import hushallet_logo from '../assets/logo/hushallet_logo.png';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { loginUser, resetState, selectLogInSuccess } from '../store/Auth/slice';
import { authStyles } from '../themes/styles';
import { useAppDispatch, useAppSelector } from '../store/hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.auth.error);
  const loading = useAppSelector((state) => state.auth.loading);
  const success = useAppSelector(selectLogInSuccess);

  const handleLogin = async () => {
    await dispatch(
      loginUser({ username: form.username, password: form.password }),
    );
    if (success) {
      navigation.replace('HomeNavigator');
    }
  };

  const handleNavigate = () => {
    dispatch(resetState());
    navigation.navigate('Register');
  };

  return (
    <>
      <SafeAreaView
        style={{ backgroundColor: colors.primaryContainer, flex: 1 }}
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
              >
                {/* Log In */}
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
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
