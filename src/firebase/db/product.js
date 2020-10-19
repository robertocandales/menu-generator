import firebase from './firebase-app';
import { getUserCollection } from './utils';

export const saveProduct = async (item) => {
  const db = firebase.firestore();
  const user = JSON.parse(localStorage.getItem('user'));

  const res = (await db.collection('users').doc(user.uid).get()).data();

  const docRef = db.collection(getUserCollection('products')).doc();

  // Not awaiting intentionally
  const updateTimestamp = docRef.set({
    ...item,
    user: res.email,
    timestamp: new Date(),
  });

  return docRef.id;
};

export const updateProduct = async (item) => {
  const db = firebase.firestore();

  const docRef = db.collection(getUserCollection('products')).doc(item.id);

  // Not awaiting intentionally
  const updateTimestamp = docRef.update({
    ...item,
    lastUpdatedTimestamp: new Date(),
  });
};

export const batchedUpdate = async (items) => {
  const db = firebase.firestore();
  const batch = db.batch();

  items.forEach((item) => {
    const docRef = db.collection(getUserCollection('products')).doc(item.id);
    batch.update(docRef, item);
  });

  // Not awaiting intentionally
  batch.commit();
};

export const fetchProducts = async () => {
  const db = firebase.firestore();

  return db.collection(getUserCollection('products')).get();
};
export const deleteProduct = async (id) => {
  const db = firebase.firestore();
  const res = await db.collection('products').doc(id);
  const res1 = await res.delete();

  return res.id;
};

export const deleteProducts = async (products) => {
  const db = firebase.firestore();

  const res = await db.collection('products').doc(products.id);

  const res1 = await res.delete();

  return res.id;
};
