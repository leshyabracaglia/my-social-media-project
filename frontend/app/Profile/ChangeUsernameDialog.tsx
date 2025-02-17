import { useState } from 'react';
import { Text } from 'react-native-paper';
import Button from '../components/Button';
import { useLoginStateContext } from '../providers/LoginStateProvider';
import Dialog from '../components/Dialog';
import { useUserProfileContext } from './UserProfileProvider';
import { View } from 'react-native';
import TextField from '../components/TextField';

export default function ChangeUsernameDialog({
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
      <View className="flex flex-col p-4 pt-0">
        <TextField
          label="New Username"
          placeholder="New Username"
          value={newUsername}
          onChangeText={setNewUsername}
          onBlur={async () => {
            await checkUsername();
          }}
        />
        <Text className="ml-3 mt-2 text-white">
          {usernameAvailable === false ? 'Username is taken' : 'Username is available'}
        </Text>
        <View className="mt-3 px-1">
          <Button onPress={updateUsername} disabled={!usernameAvailable || !newUsername}>
            Update
          </Button>
        </View>
      </View>
    </Dialog>
  );
}
