'use client';

import { deleteCookie, setCookie } from 'cookies-next';
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth, googleProvider } from '~/configs/firebase.config';

interface AuthContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  signInWithGoogle: () => Promise<UserCredential>;
  // eslint-disable-next-line no-unused-vars
  signInWithPassword: (email: string, password: string) => Promise<UserCredential>;
  // eslint-disable-next-line no-unused-vars
  signUpWithPassword: (email: string, password: string) => Promise<UserCredential>;
  signOut: () => Promise<void>;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  isLoading: false,
  user: null,
  signInWithGoogle: async () => Promise.resolve({} as UserCredential),
  signInWithPassword: async () => Promise.resolve({} as UserCredential),
  signUpWithPassword: async () => Promise.resolve({} as UserCredential),
  signOut: async () => Promise.resolve(),
});

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // const router = useIRouter();
  // const pathname = useIPathname();

  useEffect(() => {
    setIsLoading(true);

    auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        setIsAuthenticated(false);
      } else {
        const token = await user.getIdToken();
        setUser(user);
        // if (pathname === RoutePath.INDEX) {
        //   router.push(RoutePath.HOME);
        // }

        // Check user in database: Handle data & error (try-catch). Here is moke
        // const response = await new Promise((resolve, reject) => resolve('ok'));
        // const response = await new Promise((resolve, reject) => reject('error'));
        const { data, error } = { data: 'ok', error: null };
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

  async function signInWithGoogle() {
    const data = await signInWithPopup(auth, googleProvider);
    setIsLoading(true); // Loading to check user in database
    // router.push(RoutePath.HOME);
    return data;
  }

  async function signInWithPassword(email: string, password: string) {
    const data = await signInWithEmailAndPassword(auth, email, password);
    setIsLoading(true); // Loading to check user in database
    return data;

    // try {
    // } catch (error: any) {
    //   console.log(error?.message); // Firebase: Error (auth/invalid-credential).
    //   console.log(error?.code); // auth/invalid-credential
    //   throw new Error(error);
    // }
  }

  async function signUpWithPassword(email: string, password: string) {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    setIsLoading(true); // Loading to create user in database
    return data;

    // try {
    // } catch (error: any) {
    //   console.log(error?.message); // Firebase: Error (auth/email-already-in-use).
    //   console.log(error?.code); // auth/email-already-in-use
    //   throw new Error(error);
    // }
  }

  async function signOut() {
    await auth.signOut();
    setUser(null);
    deleteCookie('token'); // if not use deleteCookie, expired token still in browser & get 401 error
    // router.push(RoutePath.INDEX);
  }

  const authProviderValue = useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      user,
      signInWithGoogle,
      signInWithPassword,
      signUpWithPassword,
      signOut,
    }),
    [isAuthenticated, isLoading, user],
  );

  return <AuthContext.Provider value={authProviderValue}>{children}</AuthContext.Provider>;
};

const useAuth = (): AuthContextProps => useContext(AuthContext);

export { AuthContextProvider, useAuth };
