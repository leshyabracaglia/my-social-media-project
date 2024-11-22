import React, { ScrollView, View } from "react-native";
import PostButton from "./PostButton";
import Post from "./Post";


const ALL_POSTS = [
  {
    id: '1',
    title: 'My First Day at Work',
    subtitle: 'I started my new job today! It was a bit overwhelming, but I think I did pretty well. I learned a lot and met some new people. I am looking forward to my first day tomorrow.',
    author: '@random_man',
    date: '2024-01-01',
    type: 'text',
  },
  {
    id: '2',
    title: 'I am so excited for the holidays!',
    subtitle: 'I am so excited for the holidays! I am going to spend time with my family and friends. I am also going to travel to some places I have never been before. I am looking forward to it.',
    author: '@random_woman',
    date: '2024-01-02',
    type: 'text',
  },
  {
    id: '3',
    title: 'Yoga is my favorite activity!',
    subtitle: 'Yoga is my favorite activity! I do it every day and it makes me feel so good. I recommend it to everyone. It is a great way to relax and clear your mind.',
    author: '@random_woman',
    imageSrc: 'https://picsum.photos/200/300',
    date: '2024-01-03',
    type: 'image',
  },
  {
    id: '4',
    title: 'I love to travel!',
    subtitle: 'I love to travel! I have been to many places and I have many more places to go. I love to explore new cultures and see new things. I am looking forward to my next trip.',
    author: '@random_man',
    date: '2024-01-04',
    type: 'text',
  },
  {
    id: '5',
    title: 'I love to cook!',
    subtitle: 'I love to cook! I am not very good at it, but I try my best. I like to cook simple things like pasta and pizza. I am not very good at it, but I try my best.',
    author: '@random_woman',
    date: '2024-01-05',
    type: 'text',
  }
]



export default function FeedScreen() {
  // const posts = usePosts();


  return (
    <View className="h-full w-full  bg-[#ACC3A6]">
      <ScrollView className="flex flex-col gap-6 mx-6 mt-6">
        {ALL_POSTS.map((post) => (
          <Post post={post} key={post.id} />
        ))}
        <View className="h-10 w-full " />
      </ScrollView>
      
      <View className="absolute top-4 right-4">
        <PostButton />
      </View>
    </View>
  );
}
