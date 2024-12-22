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
  image_src: string;
  subtitle: string;
  author: string;
  time_submitted: string;
}

export interface IImagePost extends ITextPost {
  image_src: string;
}

export type IPost = ITextPost | IImagePost;

export const BACKEND_URL = "https://dfde-2600-4808-5a3d-8800-7804-13ef-751e-37d0.ngrok-free.app"

export function usePosts(): IPost[] {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch(`${BACKEND_URL}/api/get_posts`, {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      })
      const data = await response.json()
      setPosts(data.posts)
    }
    fetchPosts()
  }, []);

  return posts;
}
