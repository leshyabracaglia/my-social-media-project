import { useCallback, useContext, useEffect } from "react";
import { PropsWithChildren, useState } from "react";
import { createContext } from "react";
import { backendFetch } from "../hooks/useBackend";
import uuid from 'react-native-uuid';

export const POST_TYPES = {
  TEXT: "text",
}

// image, audio, idk?, poll, rating
// lol rating could have rating, image, text,

type IPostType = typeof POST_TYPES[keyof typeof POST_TYPES];

export interface ITextPost {
  id: string;
  type: IPostType;
  title: string;
  subtitle: string;
  author: string;
  time_submitted: Date;
}

export type IPost = ITextPost
//  | IImagePost;


export interface IPostsContext {
  posts: IPost[] | undefined;
  createTextPost: ({title, subtitle}: {title: string, subtitle: string}) => void;
}

export const PostsContext = createContext<IPostsContext>({
  posts: undefined,
  createTextPost: () => {},
});

export default function PostsProvider({ children }: PropsWithChildren<object>) {

  const [posts, setPosts] = useState<IPost[]>([]);

  const fetchPosts = useCallback(async () => {
    const response = await backendFetch<{all_posts: IPost[]}>('api/get_posts', {
      method: "get",
    })
    setPosts(response.all_posts)
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  async function createPost(post: IPost){
    const response = await backendFetch<{success: boolean}>('api/create_post', {
      method: "post",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (response.success) {
      setPosts([...posts, post]);
    }
  }

  async function createTextPost({title, subtitle}: {title: string, subtitle: string}){
    await createPost({
      id: uuid.v4(),
      type: POST_TYPES.TEXT,
      title,
      subtitle,
      author: "leshya",
      time_submitted: new Date(),
    })
  }

  return (
    <PostsContext.Provider
      value={{
        posts,
        createTextPost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export function usePostsContext() {
  const context = useContext(PostsContext);

  if (!context) {
    throw new Error(
      'usePostsContext must be used within a PostsProvider',
    );
  }

  return context;
}
