import {Href, Link, usePathname} from "expo-router";
import React from "react";
import { View } from "react-native";
import { Icon } from 'react-native-elements';

const NAV_ITEMS = [
  { name: 'Home', icon: 'home', route: '/Feed' },
  { name: 'Profile', icon: 'user', route: '/Profile' },
] as const;

function NavItem({ icon, isSelected, route }: { icon: string, isSelected: boolean, route: Href }) {
  return (
    <Link href={route}>
    <View className={`flex-1 flex items-center justify-center rounded-[30px] w-16 h-16 ${isSelected ? 'bg-[#6622CC]' : 'bg-white'}`}>
      <Icon name={icon} type="feather" color={isSelected ? 'white' : '#6622CC'} className={`${isSelected ? 'shadow-inner' : ''}`} size={32} />
      </View>
    </Link>
  )
}

export default function NavBar() {
  const pathname = usePathname();
  const selected = `/${pathname.split('/')[1]}`;

  return (
    <View className="absolute bottom-0 w-full flex items-center justify-center shadow-md">
    <View className="bg-white absolute bottom-6 w-[35%] flex flex-row rounded-[30px] transition-all duration-500 p-1">
      {NAV_ITEMS.map((item) => (
          <NavItem key={item.name} icon={item.icon} isSelected={selected === item.route} route={item.route} />
      ))}
    </View>
    </View>
  )
}