import React, { ScrollView, View } from "react-native";
import CreatePostButton from "./CreatePostButton";
import Post from "./Post";
import PostsProvider, { usePostsContext } from "./PostsProvider";


function Feed() {
  const {posts} = usePostsContext();

  // TODO: loading state 
  if (!posts) return null;

  return (
    <View className="h-full w-full  bg-[#ACC3A6]">
      <ScrollView className="flex flex-col gap-6 mx-6 mt-6">
        {posts.map((post, index) => (
          <Post post={post} key={`${post.id}-${post.type}-${index}`} />
        ))}
        <View className="h-10 w-full " />
      </ScrollView>
      
      <View className="absolute top-4 right-4">
        <CreatePostButton />
      </View>
    </View>
  );
}

export default function FeedWrapper(){
  return (
    <PostsProvider>
      <Feed />
    </PostsProvider>
  )
}