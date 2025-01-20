import { Text } from "react-native";

import AppPage from "../components/AppPage";
import Button from "../components/Button";
import { useLoginStateContext } from "../providers/LoginStateProvider";

export default function ProfileScreen() {
  const { logout } = useLoginStateContext();

  return (
    <AppPage>
        <Text>Profile</Text>
        <Button onPress={logout}>Logout</Button>
    </AppPage>
  );
}
