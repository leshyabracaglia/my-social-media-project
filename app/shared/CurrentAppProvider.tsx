import { Text, View } from "react-native";

import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { useRoute } from "@react-navigation/native";

export const AVAILABLE_APPS = {
  LESHYA_PAY: 'leshya_pay',
  SOCIAL_MEDIA_APP: 'social_media_app',
} as const;

// TODO: can we copy so we can use ObjectValues here?
type IAvailableApp = typeof AVAILABLE_APPS[keyof typeof AVAILABLE_APPS];

interface ICurrentAppContext {
  currentApp: IAvailableApp | null;
  setCurrentApp: (app: IAvailableApp) => void;
}

export const CurrentAppContext = createContext<ICurrentAppContext | null>(null);

export default function CurrentAppProvider({children}: PropsWithChildren) {
  const currentRoute = useRoute();
  const currentApp = currentRoute.name as IAvailableApp;
  console.log('currentApp', currentApp);

  return(
    <CurrentAppContext.Provider value={{
      currentApp,
      setCurrentApp: () => {},
    }}>
      {children}
    </CurrentAppContext.Provider>
  )
}

export function useCurrentAppContext() {
  const context = useContext(CurrentAppContext);
  if (!context) {
    throw new Error(
      'useCurrentAppContext must be used within a CurrentAppProvider',
    );
  }
  return context;
}