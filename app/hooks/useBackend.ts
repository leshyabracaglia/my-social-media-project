import { useState, useEffect } from 'react';

export default function useBackend() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/hello') // Replace with your Flask server's IP
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error(error));
  }, []);

  return message;

}

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
  subtitle: string;
  author: string;
  date: string;
}

export interface IImagePost extends ITextPost {
  imageSrc: string;
}

export type IPost = ITextPost | IImagePost;

export function usePosts(): IPost[] {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/get_posts')
      .then(response => response.json())
      .then(data => setPosts(data.posts))
      .catch(error => console.error(error));
  }, []);

  return posts;
}
