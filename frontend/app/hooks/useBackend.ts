import { useState, useEffect } from 'react';

// export default function useBackend() {
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     fetch('http://127.0.0.1:5000/api/hello') // Replace with your Flask server's IP
//       .then(response => response.json())
//       .then(data => setMessage(data.message))
//       .catch(error => console.error(error));
//   }, []);

//   return message;

// }


const BACKEND_URL = "https://bcc5-24-185-173-21.ngrok-free.app"

export function backendFetch<T>(path: string, options: RequestInit): Promise<T> {
  return fetch(`${BACKEND_URL}/${path}`, options)
    .then(response => response.json())
    .then(data => data as T)
}


