import { View } from 'react-native';

// #ACC3A6

export default function AppPage({ children }: { children: React.ReactNode }) {
  return <View className="font-mono h-full w-full bg-[#5F8773] px-6">{children}</View>;
}
