import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { Text, View } from 'react-native';
import CurrentAppProvider, { AVAILABLE_APPS, useCurrentAppContext } from './shared/CurrentAppProvider';
import LeshyaPay from './LeshyaPay';
import SocialMediaApp from './SocialMediaApp';
import HomeScreen from './HomeScreen';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function AppNavigationHeader() {
  const { currentApp } = useCurrentAppContext();

  console.log('currentApp', currentApp);

  if(currentApp === null) {
    return null;
  }

  return (
    <View className='z-50 bg-red-500 w-full flex items-center justify-center'>
      <Text className='text-black text-2xl font-bold'>{currentApp}</Text>
    </View>
  )
}

function RenderApp() {
  const { currentApp } = useCurrentAppContext();

  console.log('currentApp hi', currentApp);
  if(currentApp === AVAILABLE_APPS.LESHYA_PAY) {
    return <LeshyaPay />
  }

  if(currentApp === AVAILABLE_APPS.SOCIAL_MEDIA_APP) {
    return <SocialMediaApp />
  }

  return <HomeScreen />
  
  
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <CurrentAppProvider>
      <AppNavigationHeader />
      <RenderApp />
    </CurrentAppProvider>
  );
}
