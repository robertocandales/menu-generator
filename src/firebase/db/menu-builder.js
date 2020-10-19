import firebase from './firebase-app';
import { getUserCollection } from './utils';

export const saveMenuConfig = async (item) => {
  const db = firebase.firestore();
  const user = JSON.parse(localStorage.getItem('user'));
  const docRef = db.collection('users').doc(user.uid);
  docRef.update({
    menuConfig: item,
  });
};
