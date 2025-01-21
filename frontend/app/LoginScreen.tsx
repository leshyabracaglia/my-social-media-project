

import { useState } from 'react';
import { Text, TextInput } from 'react-native-paper';
import Button from './components/Button';
import AppPage from './components/AppPage';
import validator from 'validator';

import { View } from "react-native";

import { ILoginErrorCode, LOGIN_ERROR_CODES, useLoginStateContext } from './providers/LoginStateProvider';

// TODO: phone login

const LOGIN_ERROR_MESSAGES = {
  [LOGIN_ERROR_CODES.INVALID_CREDENTIAL]: "Invalid email or password",
  [LOGIN_ERROR_CODES.INVALID_EMAIL]: "Invalid email",
  [LOGIN_ERROR_CODES.USER_NOT_FOUND]: "User not found",
  [LOGIN_ERROR_CODES.WRONG_PASSWORD]: "Invalid password",
}

export default function LoginScreen() {
  const {createUser, login} = useLoginStateContext();

  const [emailError, setEmailError] = useState<boolean>(false);
  const [email, setEmail] = useState('leshyabracaglia+3@gmail.com');
  const [password, setPassword] = useState('0rch1d12!');
  const [error, setError] = useState<ILoginErrorCode | null>(null);

  const handleLogin = async () => {
    const error = await login(email, password);
    if(!!error){
      setError(error);
    }
  }

  return (
    <AppPage>
      <View className='flex flex-col justify-center gap-3 z-0 h-full'>
        <TextInput
          label="Email"
          keyboardType='email-address'
          textContentType='emailAddress'
          className='bg-gray-100 p-1 rounded-lg font-mono text-md'
          placeholder='Email'
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError(false);
          }}
          onBlur={() => {
            const isEmail = validator.isEmail(email);
            setEmailError(!isEmail);
          }}
        />
        <TextInput
          label="Password"
          className='bg-gray-100 p-1 rounded-lg font-mono text-md'
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
        />
        {!!emailError && <Text className='text-red-500 pl-2 text-bold uppercase text-sm'>Invalid email</Text>}
        {error && <Text className='text-red-500'>{LOGIN_ERROR_MESSAGES[error]}</Text>}
        <View className="pt-6">
          <Button onPress={handleLogin} disabled={!email || !password}>Login</Button>
          <View className='mt-2'/>
          
        </View>
        <View className=' absolute bottom-4 left-0 right-0'>
        <Button onPress={() => createUser(email, password)}>Create Account</Button>
        </View>
      </View>
    </AppPage>
  );
}
