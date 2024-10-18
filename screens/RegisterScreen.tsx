import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import hushallet_logo from '../assets/logo/hushallet_logo.png';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { authStyles } from '../themes/styles';
import { createUser } from '../store/Auth/slice';
import { useAppDispatch } from '../store/store';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();

  const handleRegister = async () => {
    if (!form.username || !form.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    try {
      const resultAction = await dispatch(
        createUser({ username: form.username, password: form.password }),
      );
      if (createUser.fulfilled.match(resultAction)) {
        console.log('User created');
        navigation.navigate('Login');
      } else {
        throw new Error(resultAction.payload as string);
      }
    } catch {
      Alert.alert('Error something went wrong');
    }
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
              Sign Up
            </Button>
            <View style={authStyles.linkTextContainer}>
              <Text>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
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
