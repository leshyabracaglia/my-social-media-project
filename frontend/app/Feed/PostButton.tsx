import React, { useState } from "react";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { usePostsContext } from "./PostsProvider";

function CreatePostDialog({open, onClose}: {open: boolean, onClose: () => void}) {
  const {createPost} = usePostsContext();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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
              value={content}
              onChangeText={setContent}
            />
          </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => {
                createPost({
                  title, subtitle: content,
                  id: "",
                  type: "",
                  image_src: "",
                  author: "",
                  time_submitted: ""
                });
                onClose();
              }}>Post</Button>
            </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

export default function PostButton() {
  const [postDialogOpen, setPostDialogOpen] = useState(false);

  return (
    <>
      <Button onPress={() => setPostDialogOpen(true)}>Create Post</Button>
      {/* <TouchableOpacity className="bg-[#6622CC] h-14 w-14 rounded-full flex items-center justify-center" onPress={() => setPostDialogOpen(true)}>
        <Text className="text-2xl text-white">+</Text>
      </TouchableOpacity> */}
      <CreatePostDialog open={postDialogOpen} onClose={() => setPostDialogOpen(false)} />
    </>
  )
} 