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
      buttonColor="white"
      // "#C6A9F4"
      icon={icon}
      style={{
        borderRadius: 10,
        padding: size === 'small' ? 1 : 4,
        borderWidth: 2,
        borderColor: '#9900FF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 1.84,
        elevation: 3,
      }}
      labelStyle={{
        fontSize: size === 'small' ? 17 : 20,
        lineHeight: size === 'small' ? 20 : 25,
        color: 'black',
        fontWeight: 'bold',
        fontFamily: 'PoppinsSemiBold',
      }}
      disabled={disabled}
      mode="contained"
    >
      {children}
    </PaperButton>
  );
}
