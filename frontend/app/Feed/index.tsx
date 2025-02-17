import React, { ScrollView, View } from 'react-native';
import CreatePostButton from './CreatePostButton';
import Post from './Post';
import FeedProvider, { useFeedContext } from './FeedProvider';
import AppPage from '../components/AppPage';
import { Text } from 'react-native-paper';
import { ActivityIndicator } from 'react-native-paper';

function Posts() {
  const { posts } = useFeedContext();

  const isLoading = !posts;
  if (isLoading)
    return (
      <View className="flex h-[50%] flex-col items-center justify-center">
        <ActivityIndicator animating={true} color="#6622CC" size="large" />
      </View>
    );

  if (!posts?.length) return <Text>No posts</Text>;

  return (
    <ScrollView className="flex flex-col">
      {posts.map((post, index) => (
        <>
          {index !== 0 && <View className="mt-5" />}
          <Post post={post} key={post.id} />
        </>
      ))}
      <View className="h-36" />
    </ScrollView>
  );
}

function Feed() {
  return (
    <AppPage>
      <View className="flex h-full flex-col">
        <View className="h-full bg-[#00000055] px-4">
          <View className="mt-6">
            <CreatePostButton />
          </View>
          <View className="mt-6 h-full">
            <Posts />
          </View>
        </View>
      </View>
    </AppPage>
  );
}

export default function FeedWrapper() {
  return (
    <FeedProvider>
      <Feed />
    </FeedProvider>
  );
}
