import { Text, View } from 'react-native';

import LoginScreen from '../shared/LoginScreen';
import { useState } from 'react';

// no login quick send me money using apple pay and I could send like an invite link to someone
// public page like how we do store

export default function LeshyaPay() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if(!isLoggedIn){
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />
  }

  return (
    <View className='bg-white h-full flex flex-col justify-center p-12 gap-3'>
      <Text className='text-center text-16'>hello this will be leshya pay</Text>
    </View>
  );
}
