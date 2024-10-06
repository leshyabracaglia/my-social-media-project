
import 'react-native-reanimated';

import { Button, Text, View } from 'react-native';
import { Link } from '@react-navigation/native';
import { AVAILABLE_APPS, useCurrentAppContext } from './shared/CurrentAppProvider';


export default function HomeScreen() {
  const { currentApp, setCurrentApp } = useCurrentAppContext();

  return (
    <View className='bg-white h-full flex flex-col justify-center items-center p-12 gap-11 z-0'>
      <View className='w-56 h-56 bg-blue-300 rounded-8 flex items-center justify-center p-4'>
        <Button onPress={() => setCurrentApp(AVAILABLE_APPS.LESHYA_PAY)} title='LeshyaPay' />
      </View>
      <View className='w-56 h-56 bg-blue-300 rounded-8 flex items-center justify-center p-4'>
        <Button onPress={() => setCurrentApp(AVAILABLE_APPS.SOCIAL_MEDIA_APP)} title='Social Media App' />
      </View>
    </View>
  )
}

