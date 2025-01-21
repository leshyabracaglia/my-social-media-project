import { Text, View } from "react-native";

import AppPage from "../components/AppPage";
import Button from "../components/Button";
import { useLoginStateContext } from "../providers/LoginStateProvider";
import { Image } from "react-native-elements";
import { useState } from "react";
import { TextInput } from "react-native-paper";

export default function ProfileScreen() {
  const { logout, loggedInUser, isUsernameTaken, updateUser } = useLoginStateContext();

  const [profileImage, setProfileImage] = useState<string | undefined>(loggedInUser?.photoURL ?? undefined);
  const [username, setUsername] = useState<string | undefined>(loggedInUser?.displayName ?? undefined);

  const [usernameAvailable, setUsernameAvailable] = useState<boolean>(true);

  const checkUsername = async () => {
    if (!username) return;
    const isTaken = await isUsernameTaken(username);
    setUsernameAvailable(!isTaken);
  }

  return (
    <AppPage>
      <View className="flex flex-col items-center h-full">
        <Image source={{uri: "https://picsum.photos/200/300"}} className="w-24 h-24 rounded-full mt-12" />
        <Text className="text-md font-bold mt-4">Email:{' '}{loggedInUser?.email}</Text>
        <Text className="text-md font-bold mt-4 w-full">Username:{' '}{loggedInUser?.displayName}</Text>
        <TextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
          onBlur={async () => {
            await checkUsername();
            if (usernameAvailable && !!username) {
              updateUser(username, profileImage || '');
            }
          }}
          className="bg-gray-100 p-1 rounded-lg font-mono text-md w-full mt-3 text-black"
          placeholder="Username"
        />
        {!usernameAvailable && <Text className="text-red-500 text-sm mt-2">Username is already taken</Text>}
        <View className="absolute bottom-6 w-full">
          <Button onPress={logout}>Logout</Button>
        </View>
      </View>
    </AppPage>
  );
}
