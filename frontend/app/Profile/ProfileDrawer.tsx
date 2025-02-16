import { Drawer } from 'react-native-drawer-layout';
import { useState } from 'react';
import { Text } from 'react-native-paper';
import { View } from 'react-native';
import Button from '../components/Button';
import { useLoginStateContext } from '../providers/LoginStateProvider';

export default function ProfileDrawer({
  open,
  setOpen,
  children,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
}) {
  const { logout, loggedInUser, updateUser } = useLoginStateContext();

  console.log(open);

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => {
        return (
          <View className="flex h-full flex-col items-center p-4 font-poppins text-black">
            <Text className="text-md text-md mt-1 text-xl font-bold text-black">
              {loggedInUser?.email}
            </Text>
            <View className="mt-4 w-full font-poppins">
              <Button onPress={() => setOpen(false)} size="small">
                Logout
              </Button>
            </View>
            <View className="mt-4 w-full font-poppins">
              <Button onPress={() => setOpen(false)} size="small">
                Change Username
              </Button>
            </View>
          </View>
        );
      }}
    >
      {children}
    </Drawer>
  );
}
