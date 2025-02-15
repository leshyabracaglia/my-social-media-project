import { Drawer } from 'react-native-drawer-layout';
import { useState } from 'react';
import {  Text } from 'react-native-paper';
import { View } from 'react-native';
import Button from '../components/Button';
import { useLoginStateContext } from '../providers/LoginStateProvider';


export default function ProfileDrawer({open, setOpen, children}: {open: boolean, setOpen: (open: boolean) => void, children: React.ReactNode}) {
  const { logout, loggedInUser, updateUser } = useLoginStateContext();

  console.log(open);

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => {
        return <View className="flex flex-col items-center h-full font-poppins text-black p-4">
          <Text className="text-md font-bold mt-1 text-md text-black text-xl">{loggedInUser?.email}</Text>
          <View className="w-full font-poppins mt-4">
            <Button onPress={() => setOpen(false)} size="small">Logout</Button>
          </View>
          <View className="w-full font-poppins mt-4">
            <Button onPress={() => setOpen(false)} size="small">Change Username</Button>
          </View>
        </View>;
      }}
    >
      {children}
      </Drawer>
  );
}