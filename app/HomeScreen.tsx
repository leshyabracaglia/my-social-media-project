
import 'react-native-reanimated';

import { Text, View } from 'react-native';
import { Link } from '@react-navigation/native';


export default function HomeScreen() {
  return (
    <View className='bg-white h-full flex flex-col justify-center items-center p-12 gap-11 z-0'>
        <Link to='/LeshyaPay'><View className='w-56 h-56 bg-blue-300 rounded-8 flex items-center justify-center p-4'><Text>LeshyaPay</Text></View></Link>
        <Link to='/SocialMediaApp'><View className='w-56 h-56 bg-blue-300 rounded-8 flex items-center justify-center p-4'><Text>Social Media App</Text></View></Link>
    </View>
  )
}

