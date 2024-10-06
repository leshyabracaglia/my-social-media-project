import { Text, View } from "react-native";
import LoginScreen from "../shared/LoginScreen";
import { useState } from "react";

export default function SocialMediaApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if(!isLoggedIn){
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />
  }

  return (
    <View>
      <Text>Social Media App</Text>
    </View>
  );
}
