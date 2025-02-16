import { useState } from 'react';
import { Text, TextInput } from 'react-native-paper';
import Button from './components/Button';
import AppPage from './components/AppPage';
import validator from 'validator';

import { View } from 'react-native';

import {
  ILoginErrorCode,
  LOGIN_ERROR_CODES,
  useLoginStateContext,
} from './providers/LoginStateProvider';
import TextField from './components/TextField';

// TODO: phone login

const LOGIN_ERROR_MESSAGES = {
  [LOGIN_ERROR_CODES.INVALID_CREDENTIAL]: 'Invalid email or password',
  [LOGIN_ERROR_CODES.INVALID_EMAIL]: 'Invalid email',
  [LOGIN_ERROR_CODES.USER_NOT_FOUND]: 'User not found',
  [LOGIN_ERROR_CODES.WRONG_PASSWORD]: 'Invalid password',
};

export default function LoginScreen() {
  const { createUser, login } = useLoginStateContext();

  const [emailError, setEmailError] = useState<boolean>(false);
  const [email, setEmail] = useState('leshyabracaglia+3@gmail.com');
  const [password, setPassword] = useState('0rch1d12!');
  const [error, setError] = useState<ILoginErrorCode | null>(null);

  const handleLogin = async () => {
    const error = await login(email, password);
    if (!!error) {
      setError(error);
    }
  };

  return (
    <AppPage>
      <View className="z-0 flex h-full flex-col justify-center gap-3">
        <TextField
          label="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError(false);
          }}
          onBlur={() => {
            const isEmail = validator.isEmail(email);
            setEmailError(!isEmail);
          }}
          placeholder="Email"
        />
        <View className="h-1" />
        <TextField
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
        />
        {!!emailError && (
          <Text className="text-bold bg-white pl-2 text-sm uppercase text-red-500">
            Invalid email
          </Text>
        )}
        {error && <Text className="text-red-500">{LOGIN_ERROR_MESSAGES[error]}</Text>}
        <View className="pt-2">
          <Button onPress={handleLogin} disabled={!email || !password}>
            Login
          </Button>
          <View className="mt-2" />
        </View>
        <View className="absolute bottom-4 left-0 right-0">
          <Button onPress={() => createUser(email, password)}>Create Account</Button>
        </View>
      </View>
    </AppPage>
  );
}
