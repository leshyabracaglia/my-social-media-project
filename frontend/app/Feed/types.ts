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

export type IPostType = (typeof POST_TYPES)[keyof typeof POST_TYPES];

interface IBasePost {
  id: string;
  firebase_uid: string;
  username: string;
  profile_image_url?: string;
  title: string;
  subtitle: string;
  time_created: Date;
}

export interface ITextPost extends IBasePost {
  type: typeof POST_TYPES.TEXT;
  subtitle: string;
}

export interface IRatingPost extends IBasePost {
  type: typeof POST_TYPES.RATING;
  rating_id: string;
}

export type IPost = ITextPost | IRatingPost;
