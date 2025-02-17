import { useCallback, useContext, useEffect } from 'react';
import { PropsWithChildren, useState } from 'react';
import { createContext } from 'react';
import { backendFetch } from '../hooks/useBackend';
import uuid from 'react-native-uuid';
import { useLoginStateContext } from '../providers/LoginStateProvider';

export const POST_TYPES = {
  TEXT: 'text',
  RATING: 'rating',
};

// image, audio, idk?, poll, rating
// lol rating could have rating, image, text,

type IPostType = (typeof POST_TYPES)[keyof typeof POST_TYPES];

interface IBasePost {
  id: string;
  firebase_uid: string;
  username: string;
  profile_image_url?: string;
  title: string;
  subtitle: string;
  time_created: Date;
  likes_count: number;
}

export interface ITextPost extends IBasePost {
  type: typeof POST_TYPES.TEXT;
  subtitle: string;
}

export interface IRatingPost extends IBasePost {
  type: typeof POST_TYPES.RATING;
  rating: number;
}

export type IPost = ITextPost | IRatingPost;

export interface IFeedContext {
  posts: IPost[] | undefined;
  createTextPost: ({ title, subtitle }: { title: string; subtitle: string }) => void;
}

export const FeedContext = createContext<IFeedContext>({
  posts: undefined,
  createTextPost: () => {},
});

export default function FeedProvider({ children }: PropsWithChildren<object>) {
  const { loggedInUser } = useLoginStateContext();

  const [posts, setPosts] = useState<IPost[]>();

  const fetchPosts = useCallback(async () => {
    const response = await backendFetch<{ all_posts: IPost[] }>('api/get_posts', {
      method: 'get',
    });
    setPosts(response.all_posts);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  async function createPost(post: IPost) {
    const response = await backendFetch<{ success: boolean }>('api/create_post', {
      method: 'post',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.success) {
      setPosts([...(posts || []), post]);
    }
  }

  async function createTextPost({
    title,
    subtitle,
  }: {
    title: string;
    subtitle: string;
  }) {
    if (!loggedInUser?.uid) return;

    await createPost({
      id: uuid.v4(),
      firebase_uid: loggedInUser?.uid,
      username: loggedInUser?.displayName || '',
      profile_image_url: loggedInUser?.photoURL || undefined,
      title,
      subtitle,
      time_created: new Date(),
      type: POST_TYPES.TEXT,
      likes_count: 0,
    });
  }

  return (
    <FeedContext.Provider
      value={{
        posts,
        createTextPost,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
}

export function useFeedContext() {
  const context = useContext(FeedContext);

  if (!context) {
    throw new Error('useFeedContext must be used within a FeedProvider');
  }

  return context;
}
