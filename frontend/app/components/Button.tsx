import React from 'react';
import { Button as PaperButton } from 'react-native-paper';

export default function Button({
  children,
  onPress,
  icon,
  disabled,
  size = 'medium',
}: {
  children: React.ReactNode;
  onPress: () => void;
  icon?: string;
  disabled?: boolean;
  size?: 'small' | 'medium';
}) {
  return (
    <PaperButton
      onPress={onPress}
      buttonColor="#C1B8A6"
      icon={icon}
      style={{
        borderRadius: 10,
        padding: size === 'small' ? 5 : 8,
        borderWidth: 1,
        borderColor: '#4A4A4A',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 1.84,
        elevation: 3,
      }}
      labelStyle={{
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        fontFamily: 'Poppins',
      }}
      disabled={disabled}
      mode="contained"
    >
      {children}
    </PaperButton>
  );
}
