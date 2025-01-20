import React from "react";
import { Button as PaperButton } from "react-native-paper";


export default function Button({children, onPress, icon, disabled}: {children: React.ReactNode, onPress: () => void, icon?: string, disabled?: boolean}) {
  return (
      <PaperButton onPress={onPress} buttonColor="#6622CC" icon={icon} style={{borderRadius:10, padding: 5}} labelStyle={{fontSize: 18, color: 'white'}} disabled={disabled}>{children}</PaperButton>
  )
} 