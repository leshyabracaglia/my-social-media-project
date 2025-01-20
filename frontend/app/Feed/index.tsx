import React, { ScrollView, View } from "react-native";
import CreatePostButton from "./CreatePostButton";
import Post from "./Post";
import PostsProvider, { usePostsContext } from "./PostsProvider";
import AppPage from "../components/AppPage";


function Feed() {
  const {posts} = usePostsContext();

  // TODO: loading state 
  if (!posts) return null;

  return (
    <AppPage>
      <View className="mt-6" />
      <CreatePostButton />
      <ScrollView className="flex flex-col gap-6 mx-0 mt-6">
        {posts.map((post, index) => (
          <>
            {index !== 0 && <View className="mt-6" />}
            <Post post={post} key={post.id} /> 
            </>
        ))}
      </ScrollView>
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