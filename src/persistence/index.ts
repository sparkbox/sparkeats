import { useContext } from 'react';
import firebase, { FirestoreContext } from './firebase';

export const usePersistence = () => useContext(FirestoreContext);

export async function write({
  db,
  collection,
  id,
  payload,
}: {
  db: any;
  collection: string;
  id: string;
  payload: any;
}): Promise<void> {
  await firebase.setDoc(db, collection, id, payload);
}

export async function read({
  db,
  collection,
  id,
}: {
  db: any;
  collection: string;
  id: string;
}) {
  return await firebase.getDoc(db, collection, id);
}

export async function readAll({
  db,
  collection,
}: {
  db: any;
  collection: string;
}) {
  return await firebase.getDocs(db, collection);
}
