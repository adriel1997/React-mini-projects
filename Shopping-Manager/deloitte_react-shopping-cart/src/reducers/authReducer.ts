import { number, string } from 'yup';

export type User = {
  id: number;
  gender: string;
  name: string;
  email: string;
};

export const authInitialState = {
  user: undefined,
  accessToken: undefined,
  isAuthenticated: !!localStorage.getItem('@tsc/token'),
};

export type AuthStateType = {
  user?: User;
  accessToken?: string;
  isAuthenticated: boolean;
};

export type AuthResponseType = {
  accessToken: string;
  user: User;
};

type AuthRequestType = {
  type: 'AUTH_REQUEST';
  payload?: null;
};

type AuthSuccessType = {
  type: 'AUTH_SUCCESS';
  payload: AuthResponseType;
};

type AuthFailType = {
  type: 'AUTH_FAIL';
  payload?: null;
};

type LOGOUT = {
  type: 'LOGOUT';
  payload?: null;
};

type AuthReducerType =
  | AuthRequestType
  | AuthSuccessType
  | AuthFailType
  | LOGOUT;

export default (
  state: AuthStateType = authInitialState,
  { type, payload }: AuthReducerType,
): AuthStateType => {
  switch (type) {
    case 'AUTH_SUCCESS': {
      return {
        user: payload.user,
        accessToken: payload.accessToken,
        isAuthenticated: true,
      };
    }

    case 'LOGOUT': {
      return { ...authInitialState, isAuthenticated: false };
    }

    default:
      return state;
  }
};
