import { useCallback, useContext } from "react";
import { PropsWithChildren, useState } from "react";
import { createContext } from "react";
import { backendFetch } from "../hooks/useBackend";
import { useLoginStateContext } from "../providers/LoginStateProvider";
import { IPost } from "../Feed/PostsProvider";


export interface IUserProfileContext {
  userPosts: IPost[] | undefined;
  fetchUserPosts: () => void;
  isUsernameTaken: (username: string) => Promise<boolean>;
}

export const UserProfileContext = createContext<IUserProfileContext>({
  userPosts: undefined,
  fetchUserPosts: () => {},
  isUsernameTaken: () => Promise.resolve(false),
});

export default function UserProfileProvider({ children }: PropsWithChildren<object>) {
  const { loggedInUser } = useLoginStateContext();

  const [userPosts, setUserPosts] = useState<IPost[]>();

  const fetchUserPosts = async () => {
    console.log('fetching posts');
    const response = await backendFetch<{all_posts: IPost[]}>('api/get_posts_by_user', {
      method: "post",
      body: JSON.stringify({firebase_uid: loggedInUser?.uid}),
      headers: {
        "Content-Type": "application/json",
      },
    })
    console.log(response);
    setUserPosts(response.all_posts)
  };

  const isUsernameTaken = async (username: string) => {
    const response = await backendFetch<{ is_taken: boolean }>(`/api/is_username_taken`, {
      method: "POST",
      body: JSON.stringify({ username }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response.is_taken;
  }

  return (
    <UserProfileContext.Provider
      value={{
        userPosts,
        fetchUserPosts,
        isUsernameTaken,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfileContext() {
  const context = useContext(UserProfileContext);

  if (!context) {
    throw new Error(
      'useUserProfileContext must be used within a UserProfileProvider',
    );
  }

  return context;
}
