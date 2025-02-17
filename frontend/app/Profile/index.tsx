import { Text, View } from 'react-native';

import AppPage from '../components/AppPage';
import { useLoginStateContext } from '../providers/LoginStateProvider';
import UserProfileProvider, { useUserProfileContext } from './UserProfileProvider';
import { Image } from 'react-native-elements';
import { useEffect, useState } from 'react';
import { IconButton } from 'react-native-paper';
import ProfileDrawer from './ProfileDrawer';
import Post from '../Feed/Post';
import { ScrollView } from 'react-native-gesture-handler';

function ProfileScreen() {
  const { loggedInUser } = useLoginStateContext();
  const { userPosts, fetchUserPosts } = useUserProfileContext();

  // const [profileImage, setProfileImage] = useState<string | undefined>(
  //   loggedInUser?.photoURL ?? undefined,
  // );
  const [username, setUsername] = useState<string | undefined>(
    loggedInUser?.displayName ?? undefined,
  );

  const [profileDrawerOpen, setProfileDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!userPosts) {
      fetchUserPosts();
    }
  }, [fetchUserPosts]);

  return (
    <ProfileDrawer open={profileDrawerOpen} setOpen={setProfileDrawerOpen}>
      <ScrollView className="mx-0 flex flex-col gap-6">
        <AppPage>
          <View className="mt-8 flex h-screen flex-col items-center font-poppins">
            <IconButton
              icon="arrow-left-bold-hexagon-outline"
              iconColor="black"
              mode="contained"
              containerColor="#C6A9F4"
              style={{
                borderRadius: 10,
                borderWidth: 2,
                borderColor: '#9900FF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 1.84,
                elevation: 3,
              }}
              className="absolute left-9 top-2"
              size={35}
              onPress={() => setProfileDrawerOpen(true)}
            />
            <Image
              source={{ uri: 'https://picsum.photos/200/300' }}
              className="borx-border mt-12 h-28 w-28 rounded-2xl border border-solid border-gray-300"
            />
            <Text className="text-md mt-4 w-full text-center font-poppins text-2xl font-bold">
              @{loggedInUser?.displayName}
            </Text>

            {/* <TextInput
              label="Username"
              value={username}
              onChangeText={setUsername}
              onBlur={async () => {
                await checkUsername();
                if (usernameAvailable && !!username) {
                  updateUser(username, profileImage || '');
                }
              }}
              className="font-mono text-md mt-3 w-full rounded-lg bg-gray-100 p-1 text-black"
              placeholder="Username"
            /> */}
            {/* {!usernameAvailable && (
              <Text className="mt-2 text-sm text-red-500">Username is already taken</Text>
            )} */}

            <View className="mx-4 mt-6 h-full pl-6">
              {userPosts?.map((post) => <Post post={post} key={post.id} />)}
              {userPosts?.length === 0 && (
                <Text className="mt-2 text-sm text-black">No posts yet</Text>
              )}
            </View>
          </View>
        </AppPage>
      </ScrollView>
    </ProfileDrawer>
  );
}

export default function UserProfileWrapper() {
  return (
    <UserProfileProvider>
      <ProfileScreen />
    </UserProfileProvider>
  );
}
