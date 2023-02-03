import { createContext, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import 'firebase/compat/auth';
import {
  collection,
  doc,
  getFirestore,
  getDoc,
  getDocs,
  setDoc,
  writeBatch,
  Firestore,
} from 'firebase/firestore';
import { Location, Review } from './types/sparkeats';

const {
  VITE_API_KEY: apiKey,
  VITE_AUTH_DOMAIN: authDomain,
  VITE_PROJECT_ID: projectId,
  VITE_STORAGE_BUCKET: storageBucket,
  VITE_MESSAGING_SENDER_ID: messagingSenderId,
  VITE_APP_ID: appId,
  VITE_MEASUREMENT_ID: measurementId,
} = import.meta.env;

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const FirestoreContext = createContext(db);

export const useFirestore = () => useContext(FirestoreContext);

export default {
  setDoc: async (
    db: Firestore,
    collection: string,
    id: string,
    payload: Location | { reviews: Review[] }
  ) => {
    await setDoc(doc(db, collection, id), payload, { merge: true });
  },
  setDocs: async (db: Firestore, collectionName: string, items: Location[]) => {
    const batch = writeBatch(db);

    items.forEach((item: Location) => {
      const docRef = doc(db, collectionName, item.id.toString());
      batch.set(docRef, item);
    });

    await batch.commit();
  },
  getDoc: async (db: Firestore, collection: string, id: string) => {
    const snapshot = await getDoc(doc(db, collection, id));
    return snapshot.data();
  },
  getDocs: async (db: Firestore, coll: string) => {
    const snapshot = await getDocs(collection(db, coll));
    const payload = snapshot.docs.map((doc) => doc.data());

    return payload;
  },
};
