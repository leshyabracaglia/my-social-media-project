import { useState } from 'react';
import { Text } from 'react-native-paper';
import Button from '../components/Button';
import AppPage from '../components/AppPage';
import validator from 'validator';

import { View } from 'react-native';

import { ILoginErrorCode, useLoginStateContext } from '../providers/LoginStateProvider';
import TextField from '../components/TextField';
import { Image } from 'react-native';
import { DEFAULT_EMAIL, DEFAULT_PASSWORD, LOGIN_ERROR_MESSAGES } from './constants';

export default function LoginScreen({
  onCreateAccount,
}: {
  onCreateAccount: () => void;
}) {
  const { login } = useLoginStateContext();

  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);

  const [emailError, setEmailError] = useState<boolean>(false);
  const [firebaseErrorCode, setFirebaseErrorCode] = useState<ILoginErrorCode | null>(
    null,
  );

  const handleLogin = async () => {
    const error = await login(email, password);
    if (!!error) {
      setFirebaseErrorCode(error);
    }
  };

  const disableLoginButton = !email || !password || !!firebaseErrorCode || !!emailError;

  return (
    <AppPage>
      <View className="z-0 flex h-full flex-col px-4">
        <Image
          source={require('../../assets/images/icon.png')}
          className="mb-8 mt-24 h-48 w-48 self-center"
          resizeMode="contain"
        />
        <View className="rounded-lg bg-white p-3 pt-1">
          <TextField
            label="Email"
            value={email}
            error={emailError}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError(false);
              setFirebaseErrorCode(null);
            }}
            onBlur={() => {
              const isEmail = validator.isEmail(email);
              setEmailError(!isEmail);
            }}
            placeholder="Email"
          />
          <View className="h-3" />
          <TextField
            label="Password"
            value={password}
            onChangeText={(newPassword) => {
              setPassword(newPassword);
              setFirebaseErrorCode(null);
            }}
            placeholder="Password"
          />
          {firebaseErrorCode && (
            <Text className="ml-4 mt-4 text-red-500">
              {LOGIN_ERROR_MESSAGES[firebaseErrorCode]}
            </Text>
          )}
          <View className="pl-1 pt-4">
            <Button onPress={handleLogin} disabled={disableLoginButton}>
              Login
            </Button>
          </View>
        </View>
        <View className="absolute bottom-9 left-0 right-0 px-4">
          <Button onPress={onCreateAccount}>Create Account</Button>
        </View>
      </View>
    </AppPage>
  );
}
