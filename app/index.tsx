import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import ProfileScreen from './Profile';
import FeedScreen from './Feed';
import NavBar from './NavBar';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


function RenderApp() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // if(!isLoggedIn){
  //   return <LoginScreen onLogin={() => setIsLoggedIn(true)} />
  // }
  return (
    <>
      {/* <ProfileScreen /> */}
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
