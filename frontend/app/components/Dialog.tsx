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
      style={{ borderRadius: 16, borderWidth: 1, borderColor: '#5F8773' }}
    >
      <NativePaperDialog.Title className="text-lg text-white">
        {title}
      </NativePaperDialog.Title>
      {children}
    </NativePaperDialog>
  );
}
