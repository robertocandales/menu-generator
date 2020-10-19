import firebase from './firebase-app';
import { getUserCollection } from './utils';

export const saveTax = async (item) => {
  const db = firebase.firestore();
  const user = JSON.parse(localStorage.getItem('user'));

  const res = (await db.collection('users').doc(user.uid).get()).data();

  const docRef = db.collection(getUserCollection('taxes')).doc();

  // // Not awaiting intentionally
  const updateTimestamp = docRef.set({
    ...item,
    user: res.email,
    timestamp: new Date(),
  });

  return {
    id: docRef.id,
    docRef: db.collection(getUserCollection('taxes')).doc(`${docRef.id}`),
  };
};

export const fetchTaxes = async () => {
  const db = firebase.firestore();

  return db.collection(getUserCollection('taxes')).get();
};
