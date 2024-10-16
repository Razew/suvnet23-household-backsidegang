import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import hushallet_logo from '../assets/logo/hushallet_logo.png';
import { RootStackParamList } from '../navigators/RootStackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen = ({ navigation }: Props) => {
  const [form, setForm] = useState({ username: '', password: '' });

  //const [isSubmitting, setIsSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const submit = async () => {
    if (!form.password || !form.username) {
      Alert.alert('Error', 'Please fill in all fields');
    }
    //   setIsSubmitting(true);
    //   try {
    //     const result = await createAccount(
    //       form.password,
    //       form.username
    //     );
    //     navigation.navigate("Home");
    //   } catch (error: any) {
    //     setIsSubmitting(false);
    //     Alert.alert("Error", error.message);
    //   } finally {
    //     setIsSubmitting(false);
    //   }
  };
  return (
    <SafeAreaView>
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image
            source={hushallet_logo}
            resizeMode="contain"
            style={{ width: '100%' }}
          />
          <View style={{ width: '80%', gap: 5 }}>
            <Text style={{ fontSize: 16, fontStyle: 'normal' }}>Sign up</Text>
            <TextInput
              style={{ borderRadius: 10 }}
              mode="outlined"
              label="Username"
              onChangeText={(e) => setForm({ ...form, username: e })}
              value={form.username}
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
              onPress={() => submit()}
            >
              Sign-Up
            </Button>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'center',
              }}
            >
              <Text>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text
                  style={{ color: 'blue', textDecorationLine: 'underline' }}
                >
                  Log-In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
