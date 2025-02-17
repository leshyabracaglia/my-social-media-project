import { Dialog as NativePaperDialog } from 'react-native-paper';

export default function Dialog({
  title,
  children,
  open,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <NativePaperDialog
      visible={open}
      onDismiss={onClose}
      style={{ borderRadius: 16, borderWidth: 1, borderColor: '#6622CC' }}
    >
      <NativePaperDialog.Title className="text-xl text-white font-poppins">
        {title}
      </NativePaperDialog.Title>
      {children}
    </NativePaperDialog>
  );
}
