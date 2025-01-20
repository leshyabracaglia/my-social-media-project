import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { PaperProvider } from 'react-native-paper';
import BottomNav from './components/BottomNav';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


function RenderApp() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // if(!isLoggedIn){
  //   return <LoginScreen onLogin={() => {setIsLoggedIn(true); router.push('/Feed')}} />
  // }
  
  return (
    <PaperProvider>
      <BottomNav />
    </PaperProvider>
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
