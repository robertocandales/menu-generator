import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);

let projectStorage = '';
if (typeof window !== 'undefined' && !firebase.apps.length) {
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebaseApp.firestore().enablePersistence();

  projectStorage = firebase.storage();
}

export { projectStorage, firebase as default };
