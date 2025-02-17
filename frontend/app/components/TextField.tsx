import { Text, TextInput } from 'react-native-paper';

export default function TextField({
  label,
  value,
  onChangeText,
  onBlur,
  placeholder,
  mode = 'flat',
  error = false,
}: {
  label: string;
  value: string;
  error?: boolean;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  placeholder: string;
  mode?: 'flat' | 'outlined';
}) {
  return (
    <TextInput
      label={<Text className="font-poppins text-black">{label}</Text>}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      error={error}
      onBlur={onBlur}
      mode={mode}
      className="mx-2 rounded-lg bg-[#ffffff] p-1 pb-2 text-lg"
    />
  );
}
