import { View } from "react-native";

export default function AppPage({children}: {children: React.ReactNode}){
  return (
    <View className="h-full w-full bg-[#ACC3A6] px-6">
      {children}
    </View>
  )
}