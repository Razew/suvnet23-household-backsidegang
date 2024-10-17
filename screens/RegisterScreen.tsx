import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import hushallet_logo from '../assets/logo/hushallet_logo.png';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { authStyles } from './LoginScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const [form, setForm] = useState({ username: '', password: '' });

  //const [isSubmitting, setIsSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const submit = async () => {
    if (!form.password || !form.username) {
      Alert.alert('Error', 'Please fill in all fields');
    } else {
      navigation.replace('HomeNavigator');
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
              onPress={() => submit()}
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
