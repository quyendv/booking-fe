'use client';

import { deleteCookie, setCookie } from 'cookies-next';
import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useTranslations } from 'next-intl';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthApi } from '~/apis/auth.api';
import { auth, googleProvider } from '~/configs/firebase.config';

interface AuthContextProps {
  isAuthenticated: boolean;
  isLoading: boolean; // both reload (refresh token) & sign in/up -> render loading screen
  user: User | null;
  signInWithGoogle: () => Promise<AuthFunctionType>;
  // eslint-disable-next-line no-unused-vars
  signInWithPassword: (email: string, password: string) => Promise<AuthFunctionType>;
  // eslint-disable-next-line no-unused-vars
  signUpWithPassword: (email: string, password: string) => Promise<AuthFunctionType>;
  signUpWithGoogle: () => Promise<AuthFunctionType>;
  signOut: () => Promise<void>;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

interface AuthFunctionType {
  isSuccess: boolean;
  type: 'toast' | 'form';
  message: string;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  isLoading: false,
  user: null,
  signInWithGoogle: async () => Promise.resolve({} as AuthFunctionType),
  signInWithPassword: async () => Promise.resolve({} as AuthFunctionType),
  signUpWithPassword: async () => Promise.resolve({} as AuthFunctionType),
  signUpWithGoogle: async () => Promise.resolve({} as AuthFunctionType),
  signOut: async () => Promise.resolve(),
});

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const t = useTranslations();

  /**
   * For auto refresh firebase token -> duplicate calling sign in api
   * Should add state to detect when user sign in or refresh token
   */
  useEffect(() => {
    setIsLoading(true);
    auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        setIsAuthenticated(false);
      } else {
        // Firebase
        const token = await user.getIdToken();
        setUser(user);

        const { error } = await AuthApi.signIn(token);
        if (error) {
          setIsAuthenticated(false);
          // throw new Error(error);
        } else {
          setIsAuthenticated(true);
          setCookie('token', token);
        }
      }
      setIsLoading(false);
    });
  }, []);

  const signInWithGoogle = useCallback(async (): Promise<AuthFunctionType> => {
    try {
      setIsLoading(true);
      // Firebase
      const data = await signInWithPopup(auth, googleProvider);

      // Server
      const { error } = await AuthApi.signIn(await data.user.getIdToken());
      if (error) {
        setIsAuthenticated(false);
        return { isSuccess: false, type: 'toast', message: error?.message }; // TODO: localize error msg from server
      } else {
        setIsAuthenticated(true);
        // setUser(...dataWithRole)
      }

      return { isSuccess: true, type: 'toast', message: t('SignIn.success') };
    } catch (error: any) {
      setIsAuthenticated(false);
      return { isSuccess: false, type: 'form', message: error?.message ?? t('SignIn.unknownError') };
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  const signInWithPassword = useCallback(
    async (email: string, password: string): Promise<AuthFunctionType> => {
      try {
        setIsLoading(true);
        // Firebase
        const data = await signInWithEmailAndPassword(auth, email, password);

        // Server
        const { error } = await AuthApi.signIn(await data.user.getIdToken());
        if (error) {
          setIsAuthenticated(false);
          return { isSuccess: false, type: 'toast', message: error?.message };
        } else {
          setIsAuthenticated(true);
          // setUser(...dataWithRole)
        }

        return { isSuccess: true, type: 'toast', message: t('SignIn.success') };
      } catch (error: any) {
        setIsAuthenticated(false);
        const { code, message } = error;
        if (code === 'auth/invalid-credential') {
          // Firebase error: invalid provider, or correct provider but wrong email/password. If signUpWithPassword and signInWithGoogle before, can't signInWithPassword (wrong credentials with this provider)
          return { isSuccess: false, type: 'form', message: t('SignIn.invalidCredentials') };
        } else {
          return { isSuccess: false, type: 'form', message: message ?? t('SignIn.unknownError') };
        }
      } finally {
        setIsLoading(false);
      }
    },
    [t],
  );

  const signUpWithPassword = useCallback(
    async (email: string, password: string): Promise<AuthFunctionType> => {
      try {
        setIsLoading(true);
        // Firebase
        const data = await createUserWithEmailAndPassword(auth, email, password);

        const { error } = await AuthApi.signUp(await data.user.getIdToken());
        if (error) {
          // setIsAuthenticated(false);
          return { isSuccess: false, type: 'toast', message: error?.message };
        } else {
          // setIsAuthenticated(true);
          // setUser(...dataWithRole)
        }

        return {
          isSuccess: true,
          type: 'toast',
          // message: signUpResponse.message, // TODO: localize
          message: t('SignUp.verifyEmail'),
        };
      } catch (error: any) {
        // setIsAuthenticated(false);
        const { code, message } = error;
        if (code === 'auth/email-already-in-use') {
          // Firebase error: email already exists
          return { isSuccess: false, type: 'form', message: t('SignUp.existingMessage') };
        } else {
          return { isSuccess: false, type: 'form', message: message ?? t('unknownError') };
        }
      } finally {
        setIsLoading(false);
      }
    },
    [t],
  );

  const signUpWithGoogle = useCallback(async (): Promise<AuthFunctionType> => {
    try {
      setIsLoading(true);
      // Firebase
      const data = await signInWithPopup(auth, googleProvider);

      const { error } = await AuthApi.signUp(await data.user.getIdToken());
      if (error) {
        // setIsAuthenticated(false);
        return { isSuccess: false, type: 'toast', message: error?.message };
      } else {
        // setIsAuthenticated(true);
        // setUser(...dataWithRole)
      }

      return {
        isSuccess: true,
        type: 'toast',
        // message: signUpResponse.message, // TODO: localize
        message: t('SignUp.verifyEmail'),
      };
    } catch (error: any) {
      // setIsAuthenticated(false);
      return { isSuccess: false, type: 'form', message: error?.message ?? t('unknownError') };
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  const signOut = useCallback(async () => {
    await auth.signOut();
    setUser(null);
    deleteCookie('token'); // if not use deleteCookie, expired token still in browser & get 401 error
  }, []);

  const authProviderValue: AuthContextProps = useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      user,
      signInWithGoogle,
      signInWithPassword,
      signUpWithPassword,
      signUpWithGoogle,
      signOut,
    }),
    [
      isAuthenticated,
      isLoading,
      user,
      signInWithGoogle,
      signInWithPassword,
      signUpWithPassword,
      signUpWithGoogle,
      signOut,
    ],
  );

  return <AuthContext.Provider value={authProviderValue}>{children}</AuthContext.Provider>;
};

const useAuth = (): AuthContextProps => useContext(AuthContext);

export { AuthContextProvider, useAuth };
