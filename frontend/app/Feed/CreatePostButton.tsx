import React, { useState } from 'react';
import { useFeedContext } from './FeedProvider';
import Button from '../components/Button';
import Dialog from '../components/Dialog';
import { Switch, Text } from 'react-native-paper';
import { Dialog as NativePaperDialog, Portal, TextInput } from 'react-native-paper';
import { View } from 'react-native';

function CreatePostDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { createTextPost, createRatingPost } = useFeedContext();

  const [createRatingPostType, setCreateRatingPostType] = useState(false);

  const onToggleSwitch = () => setCreateRatingPostType(!createRatingPostType);

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  return (
    <Portal>
      <Dialog title={!!createRatingPostType ? 'New Rating' : 'New Post'} open={open} onClose={onClose}>
        <NativePaperDialog.Content>
          <View className="flex flex-row items-center justify-center mb-4">
            <Text
              className="text-lg font-poppins"
              style={{ fontWeight: !createRatingPostType ? 'bold' : 'normal' }}
            >
              Text Post
            </Text>
            <Switch
              value={createRatingPostType}
              onValueChange={onToggleSwitch}
              style={{ marginLeft: 8, marginRight: 8 }}
            />
            <Text className="text-lg font-poppins" style={{ fontWeight: !!createRatingPostType ? 'bold' : 'normal' }}>
              Rating Post
            </Text>
          </View>
          <TextInput
            label={!!createRatingPostType ? 'Topic' : 'Title'}
            value={title}
            mode="flat"
            onChangeText={setTitle}
          />
          <TextInput
            label={!!createRatingPostType ? 'Review' : 'Content'}
            value={subtitle}
            mode="flat"
            className="mt-3"
            onChangeText={setSubtitle}
          />
          
        </NativePaperDialog.Content>
        <NativePaperDialog.Actions>
          <Button
            size="small"
            onPress={() => {
              if (!!createRatingPostType) {
                createRatingPost({
                  title,
                  subtitle,
                  rating: 0,
                });
              } else {
                createTextPost({
                  title,
                  subtitle,
                });
              }
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
