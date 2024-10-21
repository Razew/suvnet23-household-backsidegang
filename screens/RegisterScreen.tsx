import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import hushallet_logo from '../assets/logo/hushallet_logo.png';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import {
  createUser,
  resetState,
  selectLogInSuccess,
} from '../store/Auth/slice';
import { useAppDispatch, useAppSelector } from '../store/store';
import { authStyles } from '../themes/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.auth.error);
  const loading = useAppSelector((state) => state.auth.loading);
  const success = useAppSelector(selectLogInSuccess);

  const handleRegister = async () => {
    await dispatch(
      createUser({ username: form.username, password: form.password }),
    );
    if (success) {
      console.log('User created');
      navigation.navigate('HomeNavigator');
    }
  };

  const handleNavigate = () => {
    dispatch(resetState());
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.primaryContainer, flex: 1 }}>
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View style={authStyles.root}>
          <Image
            source={hushallet_logo}
            resizeMode="contain"
            style={authStyles.logo}
          />
          <View style={authStyles.container}>
            <Text style={authStyles.title}>Sign up</Text>
            {error && (
              <View>
                <Text style={{ color: colors.error }}>{error}</Text>
              </View>
            )}
            <TextInput
              style={authStyles.input}
              mode="outlined"
              label="Username"
              onChangeText={(e) => setForm({ ...form, username: e })}
              value={form.username}
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
              onPress={() => handleRegister()}
            >
              {loading ? 'Loggin in' : 'Register'}
            </Button>
            <View style={authStyles.linkTextContainer}>
              <Text>Already have an account? </Text>
              <TouchableOpacity onPress={() => handleNavigate()}>
                <Text style={authStyles.linkText}>Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
