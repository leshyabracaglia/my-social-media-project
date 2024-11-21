import { Text, View } from "react-native";

import useBackend from "../hooks/useBackend";

export default function ProfileScreen() {
  const message = useBackend();

  return (
    <View>
      <Text>Profile</Text>
      <Text>{message}</Text>
    </View>
  );
}
