import { Text, View, TextInput, Button } from 'react-native';

import { useState } from 'react';
import { Link } from 'expo-router';

// no login quick send me money using apple pay and I could send like an invite link to someone
// public page like how we do store

export default function LoginScreen() {

  const [email, setEmail] = useState('');

  return (
    <View className='bg-white h-full flex flex-col justify-center p-12 gap-3 z-0'>
      <Text className='text-center text-16'>LeshyaPay</Text>
      <Text className='text-black text-12 text-sm'>Login</Text>
      <TextInput className='bg-gray-100 p-4 rounded-lg' placeholder='email' value={email} onChangeText={setEmail} />
      <TextInput className='bg-gray-100 p-4 rounded-lg' placeholder='password' />
      {/* <Link href='/HomeScreen' className='text-blue-500 text-12 text-sm bg-purple-100 p-4'>LeshyaPay</Link> */}
      {/* <Link href='/HomeScreen' className='text-blue-500 text-12 text-sm bg-purple-100 p-4'>Social Media App</Link> */}
      {/* <View className='rounded-lg bg-black py-1'><Button title='Login' onPress={() => {}} color="#f194ff" /></View> */}
    </View>
  );
}
