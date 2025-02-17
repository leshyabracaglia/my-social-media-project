import { useState } from 'react';
import { Text } from 'react-native-paper';
import Button from '../components/Button';
import AppPage from '../components/AppPage';

import { View } from 'react-native';

import {
  ILoginErrorCode,
  LOGIN_ERROR_CODES,
  useLoginStateContext,
} from '../providers/LoginStateProvider';
import TextField from '../components/TextField';
import { Image } from 'react-native';
import { LOGIN_ERROR_MESSAGES } from './constants';
import EmailInput from '../components/EmailInput';
import { useUserProfileContext } from '../Profile/UserProfileProvider';

export default function CreateAccountScreen({ onLogin }: { onLogin: () => void }) {
  const { createUser } = useLoginStateContext();
  const { isUsernameTaken } = useUserProfileContext();

  const [emailError, setEmailError] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [firebaseErrorCode, setFirebaseErrorCode] = useState<ILoginErrorCode | null>(null);

  const createAccount = async () => {
    if (!email || !password || !username) {
      setFirebaseErrorCode(LOGIN_ERROR_CODES.INVALID_CREDENTIAL);
      return;
    }
    await createUser(email, password, username);
  };

  return (
    <AppPage>
      <View className="z-0 flex h-full flex-col px-4">
        <Image
          source={require('../../assets/images/icon.png')}
          className="mb-8 mt-24 h-48 w-48 self-center"
          resizeMode="contain"
        />
        <View className="rounded-lg bg-white p-3 pt-1">
          <TextField
            label="Username"
            value={username}
            onChangeText={setUsername}
            onBlur={async () => {
              const usernameTaken = await isUsernameTaken(username);
              setUsernameError(usernameTaken);
            }}
            placeholder="Username"
          />
          {!!usernameError && (
            <Text className="ml-4 mt-2 text-red-500">Username is taken</Text>
          )}
          <EmailInput email={email} setEmail={setEmail} setError={setEmailError} />
          <View className="h-3" />
          <TextField
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
          />
          {firebaseErrorCode && (
            <Text className="ml-4 mt-4 text-red-500">{LOGIN_ERROR_MESSAGES[firebaseErrorCode]}</Text>
          )}
          <View className="pl-1 pt-4">
            <Button
              onPress={createAccount}
              disabled={!email || !password || !!firebaseErrorCode || !!emailError}
            >
              Create Account
            </Button>
          </View>
        </View>
        <View className="absolute bottom-9 left-0 right-0 px-4">
          <Button onPress={onLogin}>Login</Button>
        </View>
      </View>
    </AppPage>
  );
}
