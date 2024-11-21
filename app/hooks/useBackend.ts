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

type IPostType = "text";

export interface IPost {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  author: string;
  date: string;
}

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
