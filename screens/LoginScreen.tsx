import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import hushallet_logo from '../assets/logo/hushallet_logo.png';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { authStyles } from '../themes/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });
  //  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.username || !form.password) {
      Alert.alert('Error', 'Please fill in all fields');
    } else {
      navigation.replace('HomeNavigator');
    }
    //   setIsSubmitting(true);
    //   try {
    //     await logIn(form.username, form.password);
    //     navigation.replace('HomeNavigator');
    //   } catch (error: any) {
    //     setIsSubmitting(false);
    //     Alert.alert("Error", error.message);
    //   } finally {
    //     setIsSubmitting(false);
    //   }
    // };

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
                  onPress={() => submit()}
                >
                  Log In
                </Button>
                <View style={authStyles.linkTextContainer}>
                  <Text>Dont have an account? </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                  >
                    <Text style={authStyles.linkText}>Sign up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  };
};
