import { useCallback, useContext, useEffect } from "react";
import { PropsWithChildren, useState } from "react";
import { createContext } from "react";
import { backendFetch } from "../hooks/useBackend";

export const POST_TYPES = {
  TEXT: "text",
  IMAGE: "image",
  AUDIO: "audio",
}

type IPostType = typeof POST_TYPES[keyof typeof POST_TYPES];

export interface ITextPost {
  id: string;
  type: IPostType;
  title: string;
  image_src: string;
  subtitle: string;
  author: string;
  time_submitted: string;
}

export interface IImagePost extends ITextPost {
  image_src: string;
}

export type IPost = ITextPost | IImagePost;


export interface IPostsContext {
  posts: IPost[] | undefined;
  createPost: (post: IPost) => void;
}

export const PostsContext = createContext<IPostsContext>({
  posts: undefined,
  createPost: () => {},
});

export default function PostsProvider({ children }: PropsWithChildren<object>) {

  const [posts, setPosts] = useState<IPost[]>([]);

  const fetchPosts = useCallback(async () => {
    const response = await backendFetch<{posts: IPost[]}>('api/get_posts', {
      method: "get",
    })
    setPosts(response.posts)
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  async function createPost(post: IPost){
    const response = await backendFetch<{success: boolean}>('api/create_post', {
      method: "post",
      body: JSON.stringify({title: "hello", subtitle: "world"}),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (response.success) {
      setPosts([...posts, post]);
    }
  }

  return (
    <PostsContext.Provider
      value={{
        posts,
        createPost,
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
