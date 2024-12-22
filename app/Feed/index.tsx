import React, { ScrollView, View } from "react-native";
import PostButton from "./PostButton";
import Post from "./Post";
import { BACKEND_URL, usePosts } from "../hooks/useBackend";
import { useEffect } from "react";




export default function FeedScreen() {
  const posts = usePosts();

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/test_db`, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }, []);

  console.log("posts", posts)

  return (
    <View className="h-full w-full  bg-[#ACC3A6]">
      <ScrollView className="flex flex-col gap-6 mx-6 mt-6">
        {posts.map((post, index) => (
          <Post post={post} key={`${post.id}-${post.type}-${index}`} />
        ))}
        <View className="h-10 w-full " />
      </ScrollView>
      
      <View className="absolute top-4 right-4">
        <PostButton />
      </View>
    </View>
  );
}
