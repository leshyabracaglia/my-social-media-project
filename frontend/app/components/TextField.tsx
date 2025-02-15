
import {  Text, TextInput } from 'react-native-paper';

export default function TextField({label, value, onChangeText, onBlur, placeholder}:
   {label: string, value: string, onChangeText: (text: string) => void, onBlur?: () => void, placeholder: string}) {
    return (
      <TextInput
        label={<Text className='font-poppins text-black text-md'>{label}</Text>}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        mode="flat"
        className='bg-[#ffffffda] p-1 pb-2 ml-2 rounded-t-lg font-mono text-lg text-black'
      />
  );
}
