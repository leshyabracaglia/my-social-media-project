

import { useState } from 'react';
import { TextInput } from 'react-native-paper';
import Button from './components/Button';
import AppPage from './components/AppPage';

import { View } from "react-native";

import { auth } from "../firebase_config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useLoginStateContext } from './providers/LoginStateProvider';

// TODO: phone login


export default function LoginScreen() {
  const {createUser, login, logout} = useLoginStateContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AppPage>
      <View className='flex flex-col justify-center p-12 gap-3 z-0 h-full'>
      <TextInput
        label="Email"
        keyboardType='email-address'
        textContentType='emailAddress'
        className='bg-gray-100 p-4 rounded-lg'
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        />
      <TextInput
        label="Password"
        className='bg-gray-100 p-4 rounded-lg'
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        />
        <Button onPress={() => login(email, password)} disabled={!email || !password}>Login</Button>
        <Button onPress={() => createUser(email, password)} disabled={!email || !password}>Create Account</Button>
      </View>
    </AppPage>
  );
}
