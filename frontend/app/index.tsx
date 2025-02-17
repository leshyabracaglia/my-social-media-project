import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { PaperProvider } from 'react-native-paper';
import BottomNav from './components/BottomNav';
import LoginScreen from './LoginScreen';
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
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
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
