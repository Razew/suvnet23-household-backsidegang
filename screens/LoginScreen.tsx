import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import {
  Button,
  Dialog,
  Portal,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import hushallet_logo from '../assets/logo/hushallet_logo.png';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { authStyles } from '../themes/styles';
import { loginUser } from '../store/Auth/slice';
import { useAppDispatch } from '../store/store';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });
  const [visible, setVisible] = useState(false);
  const hideDialog = () => setVisible(false);
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    if (!form.username || !form.password) {
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
        >
          <Dialog.Title>Error:</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Please fill in all fields</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>;
      return;
    }
    try {
      const resultAction = await dispatch(
        loginUser({ username: form.username, password: form.password }),
      );
      if (loginUser.fulfilled.match(resultAction)) {
        navigation.replace('HomeNavigator');
      } else {
        throw new Error(resultAction.payload as string);
      }
    } catch {
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
        >
          <Dialog.Title>Error:</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Wrong username or password</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>;
      return;
    }
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
                onPress={() => handleLogin()}
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
}
