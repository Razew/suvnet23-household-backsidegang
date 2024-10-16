import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import hushallet_logo from '../assets/logo/hushallet_logo.png';
import { RootStackParamList } from '../navigators/RootStackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
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
    <SafeAreaView>
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image
            source={hushallet_logo}
            resizeMode="contain"
            style={{ width: '100%' }}
          />
          <View style={{ width: '80%', gap: 5 }}>
            <Text>Log in to Household</Text>
            <TextInput
              style={{ borderRadius: 10 }}
              mode="outlined"
              label="Username"
              value={form.username}
              onChangeText={(e) => setForm({ ...form, username: e })}
            />
            <TextInput
              style={{ borderRadius: 10 }}
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
              style={{ marginTop: 10 }}
              icon="login"
              mode="contained"
              onPress={() => console.log('Pressed')}
            >
              Log-in
            </Button>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'center',
              }}
            >
              <Text>Dont have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text
                  style={{ color: 'blue', textDecorationLine: 'underline' }}
                >
                  Sign-up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
