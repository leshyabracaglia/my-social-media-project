import { Href, Link, usePathname } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

const NAV_ITEMS = [
  { name: 'Home', icon: 'home', route: '/Feed' },
  { name: 'Profile', icon: 'user', route: '/Profile' },
] as const;

function NavItem({
  icon,
  isSelected,
  route,
}: {
  icon: string;
  isSelected: boolean;
  route: Href;
}) {
  return (
    <Link href={route}>
      <View
        className={`flex h-16 w-16 flex-1 items-center justify-center rounded-[30px] ${isSelected ? 'bg-[#6622CC]' : 'bg-white'}`}
      >
        <Icon
          name={icon}
          type="feather"
          color={isSelected ? 'white' : '#6622CC'}
          className={`${isSelected ? 'shadow-inner' : ''}`}
          size={32}
        />
      </View>
    </Link>
  );
}

export default function NavBar() {
  const pathname = usePathname();
  const selected = `/${pathname.split('/')[1]}`;

  return (
    <View className="absolute bottom-0 flex w-full items-center justify-center shadow-md">
      <View className="absolute bottom-6 flex w-[35%] flex-row rounded-[30px] bg-white p-1 transition-all duration-500">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.name}
            icon={item.icon}
            isSelected={selected === item.route}
            route={item.route}
          />
        ))}
      </View>
    </View>
  );
}
