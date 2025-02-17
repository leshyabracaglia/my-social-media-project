import React, { useState } from 'react';
import TextField from './TextField';
import validator from 'validator';
import { Text } from 'react-native-paper';

export default function EmailInput({
  email,
  setEmail,
  setError,
}: {
  email: string;
  setEmail: (email: string) => void;
  setError: (hasError: boolean) => void;
}) {
  const [emailError, setEmailError] = useState<boolean>(false);

  return (
    <>
      <TextField
        value={email}
        onChangeText={setEmail}
        onBlur={() => {
          const isValid = validator.isEmail(email);
          setEmailError(!isValid);
          setError(!isValid);
        }}
        placeholder="Email"
        label="Email"
      />
      {!!emailError && <Text className="ml-4 mt-2 text-red-500">Email is invalid</Text>}
    </>
  );
}
