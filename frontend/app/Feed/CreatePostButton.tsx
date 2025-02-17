import React, { useState } from 'react';
import { useFeedContext } from './FeedProvider';
import Button from '../components/Button';
import Dialog from '../components/Dialog';
import { Dialog as NativePaperDialog, Portal, TextInput } from 'react-native-paper';

function CreatePostDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { createTextPost } = useFeedContext();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  return (
    <Portal>
      <Dialog title="New Post" open={open} onClose={onClose}>
        <NativePaperDialog.Content>
          <TextInput
            label="Title"
            value={title}
            mode="outlined"
            onChangeText={setTitle}
          />
          <TextInput
            label="Content"
            value={subtitle}
            mode="outlined"
            className="mt-3"
            onChangeText={setSubtitle}
          />
        </NativePaperDialog.Content>
        <NativePaperDialog.Actions>
          <Button
            size="small"
            onPress={() => {
              createTextPost({
                title,
                subtitle,
              });
              onClose();
            }}
          >
            Post
          </Button>
        </NativePaperDialog.Actions>
      </Dialog>
    </Portal>
  );
}

export default function CreatePostButton() {
  const [postDialogOpen, setPostDialogOpen] = useState(false);

  return (
    <>
      <Button onPress={() => setPostDialogOpen(true)} icon="plus">
        Create Post
      </Button>
      <CreatePostDialog open={postDialogOpen} onClose={() => setPostDialogOpen(false)} />
    </>
  );
}
