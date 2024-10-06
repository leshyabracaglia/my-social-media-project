import { Text, View, TextInput, Button } from 'react-native';

import { useState } from 'react';
import { Link, useNavigation } from 'expo-router';
import { AVAILABLE_APPS, useCurrentAppContext } from './CurrentAppProvider';

// no login quick send me money using apple pay and I could send like an invite link to someone
// public page like how we do store

export default function LoginScreen({onLogin}: {onLogin: () => void}) {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');

  return (
    <View className='bg-white flex flex-col justify-center p-12 gap-3 z-0 h-full'>
      <Text className='text-black text-12 text-sm'>Login</Text>
      <TextInput className='bg-gray-100 p-4 rounded-lg' placeholder='email' value={email} onChangeText={setEmail} />
      <TextInput className='bg-gray-100 p-4 rounded-lg' placeholder='password' />
      <View className='rounded-lg bg-black py-1'><Button title='Login' onPress={onLogin} color="#f194ff" /></View>
    </View>
  );
}
