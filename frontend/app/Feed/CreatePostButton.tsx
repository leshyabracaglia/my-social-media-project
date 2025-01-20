import React, { useState } from "react";
import { Button, Dialog, IconButton, Portal, TextInput } from "react-native-paper";
import { usePostsContext } from "./PostsProvider";


function CreatePostDialog({open, onClose}: {open: boolean, onClose: () => void}) {
  const { createTextPost } = usePostsContext();
  
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  return (
    <Portal>
      <Dialog visible={open} onDismiss={onClose}>
        <Dialog.Title>New Post</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Title"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              label="content"
              value={subtitle}
              onChangeText={setSubtitle}
            />
          </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => {
                createTextPost({
                  title, 
                  subtitle,
                });
                onClose();
              }}>Post</Button>
            </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

export default function CreatePostButton() {
  const [postDialogOpen, setPostDialogOpen] = useState(false);

  return (
    <>
      <IconButton onPress={() => setPostDialogOpen(true)} className="bg-[#6622CC] h-14 w-14 rounded-full flex items-center justify-center" icon="plus" iconColor="white" />
      <CreatePostDialog open={postDialogOpen} onClose={() => setPostDialogOpen(false)} />
    </>
  )
} 