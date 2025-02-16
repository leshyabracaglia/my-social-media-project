const BACKEND_URL = 'https://b082-2600-4808-5a32-7c00-eceb-ae35-3da5-2f2b.ngrok-free.app';

export function backendFetch<T>(path: string, options: RequestInit): Promise<T> {
  return fetch(`${BACKEND_URL}/${path}`, options)
    .then((response) => response.json())
    .then((data) => data as T);
}
