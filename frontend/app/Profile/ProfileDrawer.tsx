import { Drawer } from 'react-native-drawer-layout';
import { useState } from 'react';
import { Text } from 'react-native-paper';
import { TextInput, View } from 'react-native';
import Button from '../components/Button';
import { useLoginStateContext } from '../providers/LoginStateProvider';
import Dialog from '../components/Dialog';
import { useUserProfileContext } from './UserProfileProvider';

function ChangeUsernameDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { isUsernameTaken } = useUserProfileContext();
  const { loggedInUser, updateUser } = useLoginStateContext();

  const [newUsername, setNewUsername] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | undefined>(
    undefined,
  );

  const checkUsername = async () => {
    if (!newUsername) return;
    const isTaken = await isUsernameTaken(newUsername);
    setUsernameAvailable(!isTaken);
  };

  const updateUsername = async () => {
    if (!newUsername) return;
    const isTaken = await isUsernameTaken(newUsername);
    if (isTaken) return;
    await updateUser(newUsername, loggedInUser?.photoURL ?? '');
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} title="Change Username">
      <TextInput
        placeholder="New Username"
        value={newUsername}
        onChangeText={setNewUsername}
        onEndEditing={checkUsername}
      />
      <Button onPress={updateUsername} disabled={!usernameAvailable}>
        Update
      </Button>
      <Text>
        {usernameAvailable === false ? 'Username is taken' : 'Username is available'}
      </Text>
    </Dialog>
  );
}

function ChangeUsernameButton() {
  const [changeUsernameDialogOpen, setChangeUsernameDialogOpen] = useState(false);

  return (
    <>
      <Button onPress={() => setChangeUsernameDialogOpen(true)}>Change Username</Button>
      <ChangeUsernameDialog
        open={changeUsernameDialogOpen}
        setOpen={setChangeUsernameDialogOpen}
      />
    </>
  );
}

export default function ProfileDrawer({
  open,
  setOpen,
  children,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
}) {
  const { loggedInUser } = useLoginStateContext();

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
              <Button onPress={() => setOpen(false)}>Logout</Button>
            </View>
            <View className="mt-4 w-full font-poppins">
              <ChangeUsernameButton />
            </View>
          </View>
        );
      }}
    >
      {children}
    </Drawer>
  );
}
