import { LOGIN_ERROR_CODES } from '../providers/LoginStateProvider';

export const DEFAULT_EMAIL = 'leshyabracaglia+3@gmail.com';
export const DEFAULT_PASSWORD = '0rch1d12!';

export const LOGIN_ERROR_MESSAGES = {
  [LOGIN_ERROR_CODES.INVALID_CREDENTIAL]: 'Invalid email or password',
  [LOGIN_ERROR_CODES.INVALID_EMAIL]: 'Invalid email',
  [LOGIN_ERROR_CODES.USER_NOT_FOUND]: 'User not found',
  [LOGIN_ERROR_CODES.WRONG_PASSWORD]: 'Invalid password',
};
