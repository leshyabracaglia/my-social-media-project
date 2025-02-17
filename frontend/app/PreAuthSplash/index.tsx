import React, { useState } from 'react';
import LoginScreen from './LoginScreen';
import CreateAccountScreen from './CreateAccountScreen';
import { View } from 'react-native';
import Button from '../components/Button';
import { Image } from 'react-native';

export default function PreAuthSplash() {
  const [showCreateAccountScreen, setShowCreateAccountScreen] = useState(false);
  const [showLoginScreen, setShowLoginScreen] = useState(false);

  if (showCreateAccountScreen) {
    return (
      <CreateAccountScreen
        onLogin={() => {
          setShowLoginScreen(true);
          setShowCreateAccountScreen(false);
        }}
      />
    );
  }

  if (showLoginScreen) {
    return (
      <LoginScreen
        onCreateAccount={() => {
          setShowCreateAccountScreen(true);
          setShowLoginScreen(false);
        }}
      />
    );
  }

  return (
    <View className="flex h-full justify-center px-6">
      <Image
        source={require('../../assets/images/icon.png')}
        className="mb-8 h-48 w-48 self-center"
        resizeMode="contain"
      />
      <Button onPress={() => setShowCreateAccountScreen(true)}>Create Account</Button>
      <View className="mt-6" />
      <Button onPress={() => setShowLoginScreen(true)}>Login</Button>
    </View>
  );
}
