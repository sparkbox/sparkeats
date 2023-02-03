import { createContext, useContext, useState } from 'react';
import { auth as firebaseuiAuth } from 'firebaseui';

const AuthContext = createContext({} as any);

export const AuthProvider = AuthContext.Provider;

function getSignedIn(): boolean {
  const signedIn = localStorage.getItem('signedIn');

  return signedIn ? JSON.parse(signedIn) : false;
}

export function useProvideAuth() {
  const [signedIn, setSignedIn] = useState(getSignedIn());

  const signIn = () => {
    setSignedIn(true);
    localStorage.setItem('signedIn', JSON.stringify(true));
  };

  const signOut = () => {
    setSignedIn(false);
    firebaseuiAuth.AuthUI.getInstance()?.reset();
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
