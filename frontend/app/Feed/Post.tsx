import React, { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { ITextPost } from "./PostsProvider";
import { IPost } from "./PostsProvider";
import Card from "../components/Card";

function PostHeader({post}: {post: IPost}){
  return (
    <View className="flex flex-col justify-between">
      <Text className="text-2xl font-bold">{post.title}</Text>
      <Text className="text-8 text-[#6622CC] pt-1">✪ {new Date(post.time_created)?.toLocaleString()}</Text>
    </View>
  );
}

function TextPost({post}: {post: ITextPost}){
  return (
    <Card>
      <PostHeader post={post} />
      <Text className="mt-3">{post.subtitle}</Text>
      <View className="flex flex-row justify-between mt-4">
        <Text className="text-[#6622CC]">{post.firebase_uid}</Text>
        <Icon name="heart" type="feather" color='#6622CC' size={20} />
      </View>
    </Card>
  );
}

// function ImagePost({post}: {post: IImagePost}){
//   return (
//     <View className="bg-gray-100 !p-5 px-6 rounded-lg border-2 border-solid border-[#6622CC] mt-4 shadow-sm">
//       <PostHeader post={post} />
//       <Image source={{ uri: post.image_src }} className="w-full h-40 rounded-lg mt-3 border border-solid border-gray-300 shadow-sm" />
//       <Text className="mt-2">{post.subtitle}</Text>
//       <View className="flex flex-row justify-between mt-4">
//         <Text className="text-[#6622CC]">{post.author}</Text>
//         <Icon name="heart" type="feather" color='#6622CC' size={20} />
//       </View>
//     </View>
//   );
// }

export default function Post({ post }: { post: IPost }) {
  // if (post.type === POST_TYPES.TEXT) {
  //   return <TextPost post={post} />;
  // } else if (post.type === POST_TYPES.IMAGE) {
  //   return <ImagePost post={post as IImagePost} />;
  // }
  return <TextPost post={post as ITextPost} />;
}