import { Text, TouchableOpacity, View } from "react-native";

import AppPage from "../components/AppPage";
import Button from "../components/Button";
import { useLoginStateContext } from "../providers/LoginStateProvider";
import UserProfileProvider, { useUserProfileContext } from "./UserProfileProvider";
import { Image } from "react-native-elements";
import { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";
import ProfileDrawer from "./ProfileDrawer";
import Post from "../Feed/Post";
import { ScrollView } from "react-native-gesture-handler";

function ProfileScreen() {
  const { logout, loggedInUser, updateUser } = useLoginStateContext();
  const { isUsernameTaken, userPosts, fetchUserPosts } = useUserProfileContext();

  const [profileImage, setProfileImage] = useState<string | undefined>(loggedInUser?.photoURL ?? undefined);
  const [username, setUsername] = useState<string | undefined>(loggedInUser?.displayName ?? undefined);

  const [usernameAvailable, setUsernameAvailable] = useState<boolean>(true);

  const [profileDrawerOpen, setProfileDrawerOpen] = useState<boolean>(false); 

  const checkUsername = async () => {
    if (!username) return;
    const isTaken = await isUsernameTaken(username);
    setUsernameAvailable(!isTaken);
  }

  useEffect(() => {
    console.log('fetching user posts');
    if(!userPosts) {
      fetchUserPosts();
    }
  }, [fetchUserPosts]);

  console.log(userPosts);

  return (
    <ProfileDrawer open={profileDrawerOpen} setOpen={setProfileDrawerOpen}>
      <ScrollView className="flex flex-col gap-6 mx-0 mt-6">
    <AppPage>
      <View className="flex flex-col items-center h-full font-poppins">
        <TouchableOpacity onPress={() => setProfileDrawerOpen(true)}>
          <Text className="text-md font-bold mt-4 w-full font-poppins text-center text-2xl">Open Drawer</Text>
        </TouchableOpacity>
          <Image source={{uri: "https://picsum.photos/200/300"}} className="w-28 h-28 rounded-2xl mt-12 border border-solid border-gray-300 borx-border" />
        <Text className="text-md font-bold mt-4 w-full font-poppins text-center text-2xl">@{loggedInUser?.displayName}</Text>
        
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

        <View className="flex flex-col items-center h-full w-full mt-6">
        {userPosts?.map((post) => (
          <Post post={post} key={post.id} />
        ))}
        </View>
      </View>
    </AppPage>
    </ScrollView>
    </ProfileDrawer>
  );
}

export default function UserProfileWrapper(){
  return(
    <UserProfileProvider>
      <ProfileScreen />
    </UserProfileProvider>
  )
}