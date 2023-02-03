import { MutableRefObject, useEffect, useRef } from 'react';
import { getAuth, EmailAuthProvider } from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

export const FirebaseAuthUI = ({ className }: { className: string }) => {
  const firebaseAuth = getAuth();
  const uiConfig = {
    signInOptions: [
      {
        provider: EmailAuthProvider.PROVIDER_ID,
        signInMethod: EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
      },
    ],
  };

  const elementRef = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    const firebaseAuthUI =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebaseAuth);

    firebaseAuthUI.start(elementRef.current, uiConfig);
  }, [firebaseui, uiConfig]);

  return <div className={className} ref={elementRef} />;
};
