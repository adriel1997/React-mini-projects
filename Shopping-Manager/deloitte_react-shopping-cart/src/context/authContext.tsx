import { FormikHelpers } from 'formik';
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { LoginFormType } from '../pages/login';
import { RegisterFormType } from '../pages/register';
import authReducer, {
  authInitialState,
  AuthResponseType,
  AuthStateType,
  User,
} from '../reducers/authReducer';
import axiosInstance from '../utils/axiosInstance';

type AuthContextType = {
  user?: User;
  accessToken?: string;
  isAuthenticated: boolean;
  login: (
    values: LoginFormType,
    formikHelpers: FormikHelpers<LoginFormType>,
  ) => Promise<void>;
  register: (
    values: RegisterFormType,
    formikHelpers: FormikHelpers<RegisterFormType>,
  ) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  accessToken: undefined,
  isAuthenticated: false,
  login: async (
    values: LoginFormType,
    formikHelpers: FormikHelpers<LoginFormType>,
  ) => {},
  register: async (
    values: RegisterFormType,
    formikHelpers: FormikHelpers<RegisterFormType>,
  ) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    const token = localStorage.getItem('@tsc/token');

    if (token) {
      dispatch({ type: 'AUTH_SUCCESS', payload: JSON.parse(token) });
    }
  }, []);

  const register = useCallback(
    async (
      values: RegisterFormType,
      formikHelpers: FormikHelpers<RegisterFormType>,
    ) => {
      try {
        const { confirmPassword, ...rest } = values;
        const res = await axiosInstance.post<AuthResponseType>(
          'register',
          rest,
        );

        localStorage.setItem('@tsc/token', JSON.stringify(res.data));

        dispatch({ type: 'AUTH_SUCCESS', payload: res.data });
      } catch (error) {
        formikHelpers.setErrors({ serverError: error.response.data });
      }
    },
    [],
  );

  const login = useCallback(
    async (
      values: LoginFormType,
      formikHelpers: FormikHelpers<LoginFormType>,
    ) => {
      try {
        const { rememberMe, ...rest } = values;
        const res = await axiosInstance.post<AuthResponseType>('login', rest);

        localStorage.setItem('@tsc/token', JSON.stringify(res.data));

        dispatch({ type: 'AUTH_SUCCESS', payload: res.data });
      } catch (error) {
        formikHelpers.setErrors({ serverError: error.response.data });
      }
    },
    [],
  );

  const logout = useCallback(() => {
    localStorage.removeItem('@tsc/token');
    dispatch({ type: 'LOGOUT' });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      login,
      register,
      logout,
    }),
    [state],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
