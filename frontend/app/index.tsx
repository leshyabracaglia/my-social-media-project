import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import FeedScreen from './Feed';
import NavBar from './NavBar';
import LoginScreen from './LoginScreen';
import { router } from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


function RenderApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if(!isLoggedIn){
    return <LoginScreen onLogin={() => {setIsLoggedIn(true); router.push('/Feed')}} />
  }
  
  return (
    <>
      <FeedScreen />
      <NavBar />
    </>
  )

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
      <RenderApp />
  );
}
