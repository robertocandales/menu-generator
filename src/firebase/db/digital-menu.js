import firebase from './firebase-app';

//export const getMenuConfig = async (id) => {
export const getMenuConfig = async () => {
  //  const db = firebase.firestore();
  //  const doc = (await db.collection('users').doc(id).get()).data();

  //made by me
  const db = firebase.firestore();
  const user = JSON.parse(localStorage.getItem('user'));
  const doc = db.collection('users');

  const res1 = await (await db.collection('users').doc(user.uid).get()).data();

  return res1.menuConfig;
};
