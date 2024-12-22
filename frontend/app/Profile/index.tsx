import { Text, View } from "react-native";

import useBackend from "../hooks/useBackend";

export default function ProfileScreen() {
  // const message = useBackend();

  return (
    <View className="bg-white flex flex-col justify-center p-12 gap-3 z-0 h-full">
      <Text>Profile</Text>
      {/* <Text>{message}</Text> */}
    </View>
  );
}
