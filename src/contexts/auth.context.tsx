'use client';

import { deleteCookie, setCookie } from 'cookies-next';
import { User, UserCredential, signInWithPopup } from 'firebase/auth';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth, googleProvider } from '~/configs/firebase.config';
import { useIRouter } from '~/locales/i18nNavigation';

interface AuthContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  loginWithGoogle: () => Promise<UserCredential>;
  logout: () => Promise<void>;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  isLoading: false,
  user: null,
  loginWithGoogle: async () => Promise.resolve({} as UserCredential),
  logout: async () => Promise.resolve(),
});

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const router = useIRouter();
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
  }, [router]);

  async function loginWithGoogle() {
    const data = await signInWithPopup(auth, googleProvider);
    setIsLoading(true); // Loading to check user in database
    // router.push(RoutePath.HOME);
    return data;
  }

  async function logout() {
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
      loginWithGoogle,
      logout,
    }),
    [isAuthenticated, isLoading, user],
  );

  return <AuthContext.Provider value={authProviderValue}>{children}</AuthContext.Provider>;
};

const useAuth = (): AuthContextProps => useContext(AuthContext);

export { AuthContextProvider, useAuth };
