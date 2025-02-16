import React, { useState } from 'react';
import { Dialog, Portal, TextInput } from 'react-native-paper';
import { useFeedContext } from './FeedProvider';
import Button from '../components/Button';

function CreatePostDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { createTextPost } = useFeedContext();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  return (
    <Portal>
      <Dialog visible={open} onDismiss={onClose} style={{ borderRadius: 10 }}>
        <Dialog.Title>New Post</Dialog.Title>
        <Dialog.Content>
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
            // multiline={true}
            numberOfLines={4}
            className="mt-3"
            onChangeText={setSubtitle}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
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
        </Dialog.Actions>
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
