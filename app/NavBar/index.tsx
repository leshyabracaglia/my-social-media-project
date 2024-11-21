import React from "react";
import { View, Text } from "react-native";

export default function NavBar() {
  return (
    <View className="absolute bottom-0 w-full flex items-center justify-center">
    <View className="bg-white absolute bottom-3 w-[80%] flex flex-row rounded-[30px]">
      <Text className="text-2xl text-[#6622CC] bg-gray-200 flex-1 text-center px-6 py-4 rounded-[30px]">Home</Text>
      <Text className="text-2xl text-[#6622CC] flex-1 text-center px-6 py-4">Profile</Text>
    </View>
    </View>
  )
}