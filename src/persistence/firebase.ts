// Firebase
import { initializeApp } from 'firebase/app';
import {
  collection,
  doc,
  getFirestore,
  getDoc,
  getDocs,
  setDoc,
  writeBatch,
} from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";

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

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// const analytics = getAnalytics(app);

export default {
  setDoc: async (db: any, collection: string, id: string, payload: any) => {
    await setDoc(doc(db, collection, id), payload, { merge: true });
  },
  setDocs: async (db: any, collectionName: string, items: any) => {
    const batch = writeBatch(db);

    items.forEach((item: any) => {
      const docRef = doc(db, collectionName, item.id.toString());
      batch.set(docRef, item);
    });

    await batch.commit();
  },
  getDoc: async (db: any, collection: string, id: string) => {
    const snapshot = await getDoc(doc(db, collection, id));
    return snapshot.data();
  },
  getDocs: async (db: any, coll: string) => {
    const snapshot = await getDocs(collection(db, coll));
    const payload = snapshot.docs.map((doc) => doc.data());

    return payload;
  },
};
