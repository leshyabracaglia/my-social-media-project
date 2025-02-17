import { ImageBackground, SafeAreaView } from 'react-native';

export default function AppPage({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView className="bg-black px-6">
      <ImageBackground
        source={require('../../assets/images/background.jpg')}
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </ImageBackground>
    </SafeAreaView>
  );
}
