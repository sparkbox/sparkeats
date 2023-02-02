import React from 'react';
import { db } from './firebase';

export const FirestoreContext = React.createContext(db);
