import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FirebaseAuthUI } from './FirebaseAuthUI';
import { useAuth } from '../auth';

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const SiteHeader = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const auth = useAuth();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const firebaseAuth = getAuth();
    onAuthStateChanged(firebaseAuth, (user) => {
      user ? auth.signIn() : auth.signOut();
    });
  }, [auth]);

  return (
    <header className="site-header">
      <h1 className="site-header__title">Sparkeats by Sparkbox</h1>
      <a
        className="site-header__logo"
        href={import.meta.env['BASE_URL']}
        aria-label="Return to the Sparkeats Home page."
      />

      <div className="signin" id="signin">
        {auth.signedIn ? (
          <button className="button__secondary" onClick={auth.signOut}>
            Sign out
          </button>
        ) : (
          <button className="button__secondary" onClick={openModal}>
            Sign in
          </button>
        )}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Sign in with email"
      >
        <button
          className="button--close mdl-button mdl-button--primary"
          onClick={closeModal}
        >
          Close
        </button>
        <FirebaseAuthUI className="firebase-auth-ui" />
      </Modal>
    </header>
  );
};
