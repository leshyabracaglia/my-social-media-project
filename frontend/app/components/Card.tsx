import { View } from "react-native";

// [#6622cc]

export default function Card({children}: {children: React.ReactNode}){
  return (
    <View className="bg-gray-100 !p-4 px-4 rounded-lg border border-solid border-gray-500 shadow-md">
      {children}
    </View>
  )
}