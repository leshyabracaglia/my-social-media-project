import { View } from "react-native";

// #ACC3A6

export default function AppPage({children}: {children: React.ReactNode}){
  return (
    <View className="h-full w-full  px-6 font-mono bg-[#5F8773]">
      {children}
    </View>
  )
}