import { ScrollView, Text, View } from 'react-native';

import AppPage from '../components/AppPage';
import { useLoginStateContext } from '../providers/LoginStateProvider';
import UserProfileProvider, { useUserProfileContext } from './UserProfileProvider';
import { Image } from 'react-native-elements';
import { useEffect, useState } from 'react';
import { IconButton } from 'react-native-paper';
import Post from '../Feed/Post';
import ChangeUsernameDialog from './ChangeUsernameDialog';

function ProfileScreen() {
  const { loggedInUser } = useLoginStateContext();
  const { userPosts, fetchUserPosts } = useUserProfileContext();

  // const [profileImage, setProfileImage] = useState<string | undefined>(
  //   loggedInUser?.photoURL ?? undefined,
  // );
  const [changeUsernameDialogOpen, setChangeUsernameDialogOpen] =
    useState<boolean>(false);

  useEffect(() => {
    if (!userPosts) {
      fetchUserPosts();
    }
  }, [fetchUserPosts]);

  return (
    <>
      <AppPage>
        <ScrollView className="mx-0 flex flex-col gap-6">
          <View className="mt-8 flex h-screen flex-col items-center font-poppins">
            <View className="mt-12 flex items-center rounded-xl border border-solid border-[#9900FF] bg-white p-4">
              <Image
                source={{ uri: 'https://picsum.photos/200/300' }}
                className="borx-border h-28 w-28 rounded-2xl border border-solid border-gray-300"
              />
              <Text className="mt-4 w-full text-center font-silkscreen text-3xl">
                @{loggedInUser?.displayName}
              </Text>
              <View className="mt-1 flex flex-row">
                <IconButton
                  icon="account-edit"
                  onPress={() => setChangeUsernameDialogOpen(true)}
                  size={24}
                  className="rounded-lg border border-solid border-[#9900FF]"
                  iconColor="#9900FF"
                />
                <IconButton
                  icon="logout"
                  onPress={() => {}}
                  size={24}
                  className="rounded-lg border border-solid border-[#9900FF]"
                  iconColor="#9900FF"
                />
              </View>
            </View>
            <View className="mx-4 mt-6 h-full">
              {userPosts?.map((post) => <Post post={post} key={post.id} />)}
              {userPosts?.length === 0 && (
                <Text className="mt-2 text-sm text-black">No posts yet</Text>
              )}
            </View>
          </View>
        </ScrollView>
      </AppPage>
      <ChangeUsernameDialog
        open={changeUsernameDialogOpen}
        setOpen={setChangeUsernameDialogOpen}
      />
    </>
  );
}

export default function UserProfileWrapper() {
  return (
    <UserProfileProvider>
      <ProfileScreen />
    </UserProfileProvider>
  );
}
