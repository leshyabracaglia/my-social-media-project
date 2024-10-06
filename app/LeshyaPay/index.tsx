import { Button, Keyboard, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';

import LoginScreen from '../shared/LoginScreen';
import { useState } from 'react';

// no login quick send me money using apple pay and I could send like an invite link to someone
// public page like how we do store


const DismissKeyboardHOC = (Comp: any) => {
  return ({ children, ...props }: any) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Comp {...props}>
        {children}
      </Comp>
    </TouchableWithoutFeedback>
  );
};
const DismissKeyboardView = DismissKeyboardHOC(View)

function NumberInput({value, onChange}: {value: number, onChange: (value: number) => void}) {
  return (
    <View className='flex flex-row gap-2 items-center w-full'>
      <Text className='text-7xl'>
        $
      </Text>
      <TextInput
        className='bg-gray-100 p-4 pt-12 rounded-lg text-8xl'
        placeholder='5'
        value={value.toString()}
        onChangeText={(text) => onChange(Number(text))}
        keyboardType='numeric'
      />
    </View>
  );
}

export default function LeshyaPay() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [amount, setAmount] = useState(0);
  
  if(!isLoggedIn){
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />
  }

  return (
    <DismissKeyboardView>
      <View className='bg-white h-full flex flex-col justify-center items-center p-12 gap-3'>
        <View className='w-full'>
          <NumberInput value={amount} onChange={(value) => setAmount(value)} />
        </View>

        <View className='bg-blue-300 rounded-lg p-4 w-full'>
          <Button title='Send' onPress={() => {}} />
        </View>
      </View>
    </DismissKeyboardView>
  );
}
