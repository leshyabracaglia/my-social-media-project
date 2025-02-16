import { Text, TextInput } from 'react-native-paper';

export default function TextField({
  label,
  value,
  onChangeText,
  onBlur,
  placeholder,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  placeholder: string;
}) {
  return (
    <TextInput
      label={<Text className="text-md font-poppins text-black">{label}</Text>}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      mode="flat"
      className="font-mono ml-2 rounded-t-lg bg-[#ffffffda] p-1 pb-2 text-lg text-black"
    />
  );
}
