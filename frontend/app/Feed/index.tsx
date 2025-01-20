import React, { ScrollView, View } from "react-native";
import CreatePostButton from "./CreatePostButton";
import Post from "./Post";
import PostsProvider, { usePostsContext } from "./PostsProvider";
import AppPage from "../components/AppPage";
import { Text } from "react-native-paper";
import { ActivityIndicator } from "react-native-paper";

function Posts(){
  const { posts } = usePostsContext();

  const isLoading = !posts;
  if (isLoading) return <View className="flex flex-col justify-center items-center h-[50%]"><ActivityIndicator animating={true} color="#6622CC" size="large" /></View>;

  if(!posts?.length) return <Text>No posts</Text>;

  return (
    <ScrollView className="flex flex-col gap-6 mx-0 mt-6">
      {posts.map((post, index) => (
        <>
          {index !== 0 && <View className="mt-6" />}
          <Post post={post} key={post.id} /> 
        </>
      ))}
    </ScrollView>
  )
}

function Feed() {
  return (
    <AppPage>
      <View className="mt-6" />
      <CreatePostButton />
      <Posts />
    </AppPage>
  );
}

export default function FeedWrapper(){
  return (
    <PostsProvider>
      <Feed />
    </PostsProvider>
  )
}