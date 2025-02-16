import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { PaperProvider } from 'react-native-paper';
import BottomNav from './components/BottomNav';
import LoginScreen from './LoginScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase_config';
import LoginStateProvider, { useLoginStateContext } from './providers/LoginStateProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RenderApp() {
  const { loggedInUser } = useLoginStateContext();

  if (!loggedInUser) {
    return <LoginScreen />;
  }

  return (
    <PaperProvider>
      <BottomNav />
    </PaperProvider>
  );
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
    <LoginStateProvider>
      <RenderApp />
    </LoginStateProvider>
  );
}
