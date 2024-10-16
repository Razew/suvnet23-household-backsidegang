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
        <View style={s.root}>
          <Image
            source={hushallet_logo}
            resizeMode="contain"
            style={s.logo}
          />
          <View style={s.container}>
            <Text style={s.title}>Log in</Text>
            <TextInput
              style={s.input}
              mode="outlined"
              label="Username"
              value={form.username}
              onChangeText={(e) => setForm({ ...form, username: e })}
            />
            <TextInput
              style={s.input}
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
              style={s.button}
              icon="login"
              mode="contained"
              onPress={() => console.log('Pressed')}
            >
              Log-in
            </Button>
            <View style={s.signUpTextContainer}>
              <Text>Dont have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={s.signUpLink}>Sign-up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
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
  signUpTextContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
  signUpLink: {
    color: 'blue', // If keeping the link as text, might want to set color by theme instead
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
