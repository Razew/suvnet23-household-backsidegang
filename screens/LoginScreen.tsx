import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import hushallet_logo from '../assets/logo/hushallet_logo.png';
import { RootStackParamList } from '../navigators/RootStackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });
  //  const [isSubmitting, setIsSubmitting] = useState(false);

  // const submit = async () => {
  //   if (!form.email || !form.password) {
  //     Alert.alert("Error", "Please fill in all fields");
  //   }
  //   setIsSubmitting(true);
  //   try {
  //     await signIn(form.email, form.password);
  //     router.replace("/home");
  //   } catch (error: any) {
  //     setIsSubmitting(false);
  //     Alert.alert("Error", error.message);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

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
            <Text style={authStyles.title}>Log in</Text>
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
              onPress={() => navigation.replace('HomeNavigator')}
            >
              Log In
            </Button>
            <View style={authStyles.linkTextContainer}>
              <Text>Dont have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={authStyles.linkText}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const authStyles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    width: '80%',
    gap: 5,
  },
  logo: {
    width: '60%',
  },
  title: {
    fontSize: 16,
    fontStyle: 'normal',
  },
  input: {
    borderRadius: 10,
  },
  button: {
    marginTop: 10,
  },
  linkTextContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
  linkText: {
    color: 'blue', // If keeping the link as text, might want to set color by theme instead
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
