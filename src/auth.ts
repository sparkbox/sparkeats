import { createContext, useContext, useState } from 'react';
import { getAuth, signOut as firebaseAuthSignOut } from 'firebase/auth';

const AuthContext = createContext({} as any);

export const AuthProvider = AuthContext.Provider;

function getSignedIn(): boolean {
  const signedIn = localStorage.getItem('signedIn');

  return signedIn ? JSON.parse(signedIn) : false;
}

export function useProvideAuth() {
  const firebaseAuth = getAuth();
  const [signedIn, setSignedIn] = useState(getSignedIn());

  const signIn = () => {
    setSignedIn(true);
    localStorage.setItem('signedIn', JSON.stringify(true));
  };

  const signOut = () => {
    setSignedIn(false);
    firebaseAuthSignOut(firebaseAuth);
    localStorage.removeItem('signedIn');
  };

  return {
    signedIn,
    signIn,
    signOut,
  };
}

export const useAuth = () => {
  const auth = useContext(AuthContext);

  return auth;
};
