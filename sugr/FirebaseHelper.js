import * as firebase from 'firebase';

import { firebaseConfig } from './constants/ApiKeys';

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseDb = firebaseApp.database().ref();
export const firebaseAuth = firebaseApp.auth();