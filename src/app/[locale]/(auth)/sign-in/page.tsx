'use client';

import { UserCredential, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth, googleProvider } from '~/configs/firebase.config';

export default function App() {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [toast, setToast] = useState<string>('');

  const login = () => {
    signInWithEmailAndPassword(auth, loginForm.email, loginForm.password).then((fbUser: UserCredential) => {
      console.log(fbUser);
    });
  };

  const accessToken = async () => {
    const token = await auth.currentUser?.getIdToken();
    console.log(token);

    // Copy token
    if (token) {
      const textArea = document.createElement('textarea');
      textArea.value = token;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      showToast('Copied token to clipboard');
    }
  };

  const showToast = (message: string) => {
    document.querySelector('.toast')?.classList.add('active');
    setToast(message);
  };

  const clearToast = () => {
    document.querySelector('.toast')?.classList.remove('active');
    setToast('');
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (result: UserCredential) => {
        const token = await result.user.getIdToken();
        console.log('Google access token:', token);

        const user = result.user;
        console.log(user.refreshToken);
        console.log('Google user:', user);
      })
      .catch((error) => {
        console.error('Error signing in with Google:', error);
      });
  };

  useEffect(() => {
    const id = setTimeout(clearToast, 1000);
    return () => clearTimeout(id);
  }, [toast]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-xs rounded-md bg-gray-100 p-6 shadow-md">
        <h2 className="mb-4 text-lg font-medium">Login</h2>

        <div className="mb-4">
          <input
            type="text"
            className="w-full rounded border border-gray-400 p-2"
            value={loginForm.email}
            onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
            placeholder="Email"
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            className="w-full rounded border border-gray-400 p-2"
            value={loginForm.password}
            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            placeholder="Password"
          />
        </div>

        <div className="mb-4 flex justify-between gap-2">
          <button className="flex-1 rounded-md bg-green-500 px-2 py-1.5 text-white" onClick={login}>
            Login
          </button>

          <button className="flex-1 rounded-md bg-green-500 px-2 py-1.5 text-white" onClick={accessToken}>
            Access Token
          </button>
        </div>

        <button
          className="flex w-full items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white"
          onClick={signInWithGoogle}
        >
          <span className="mr-2">
            <i className="fab fa-google"></i>
          </span>
          Sign in with Google
        </button>

        <div
          className={`fixed bottom-5 left-1/2 -translate-x-1/2 rounded-md bg-white p-2 text-red-500 shadow-md ${
            toast ? 'opacity-100' : 'opacity-0'
          } transition-all`}
        >
          {toast}
        </div>
      </div>
    </div>
  );
}
