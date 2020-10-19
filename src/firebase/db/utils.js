import firebase from './firebase-app';

export const getUserCollection = (collectionName) => {
  return `${collectionName}`;
  // return `users/${user.uid}/${collectionName}`
};

export const getUserData = async () => {
  const db = firebase.firestore();
  const user = JSON.parse(localStorage.getItem('user'));
  const doc = db.collection('users');

  const res1 = await (await db.collection('users').doc(user.uid).get()).data();

  return res1;
};
