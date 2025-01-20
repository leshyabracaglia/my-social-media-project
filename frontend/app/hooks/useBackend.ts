const BACKEND_URL = "https://bcc5-24-185-173-21.ngrok-free.app"

export function backendFetch<T>(path: string, options: RequestInit): Promise<T> {
  return fetch(`${BACKEND_URL}/${path}`, options)
    .then(response => response.json())
    .then(data => data as T)
}


