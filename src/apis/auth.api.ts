import useSWRImmutable from 'swr/immutable';
import { FetchInstance } from './instances/fetch.instance';
import { UserRole } from '~/configs/role.config';

const AuthApiEndPoint = {
  SIGN_IN: '/auth/sign-in',
  SIGN_UP: '/auth/sign-up',
  VERIFY_EMAIL: '/auth/verify-email',
};

type VerifyEmailResponse = {
  data: any;
  isLoading: boolean;
  isError: boolean;
  error: any;
};

export type SignInResponse = {
  // id: string; // email
  // isVerified: boolean;
  // roleName: UserRole;

  // id: string | number;
  email: string;
  isVerified: boolean;
  role: UserRole;
  name: string;
  avatar?: string;
};

export const AuthApi = {
  async signIn(token: string) {
    return await new FetchInstance<SignInResponse>().post(AuthApiEndPoint.SIGN_IN, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: false },
    });
  },

  async signUp(token: string) {
    return await new FetchInstance().post(AuthApiEndPoint.SIGN_UP, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: false },
    });
  },

  useVerifyEmail(verifyToken: string): VerifyEmailResponse {
    const fetcher = (url: string) =>
      new FetchInstance().fetcher(url, 'POST', {
        body: JSON.stringify({ verifyToken }),
        next: { revalidate: false },
      });
    const { data, isLoading, error } = useSWRImmutable(AuthApiEndPoint.VERIFY_EMAIL, fetcher);
    return { data, isLoading, isError: !!error, error };
  },
};
