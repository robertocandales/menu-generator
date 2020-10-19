import firebase from './firebase-app';
import { getUserCollection } from './utils';

export const saveCategory = async (item, itemSubcats, allTaxOptions) => {
  const db = firebase.firestore();
  const user = JSON.parse(localStorage.getItem('user'));

  const res = (await db.collection('users').doc(user.uid).get()).data();
  const detailedTaxes = allTaxOptions.filter((tax) =>
    item.salesTaxIDs.some((taxId) => tax.id === taxId),
  );
  const filteredSubcats = itemSubcats.map((subCat) => {
    return { title: subCat.title };
  });

  const data = {
    ...item,
    subCategories: filteredSubcats,
    saleTaxes: detailedTaxes,
    user: res.email,
  };

  const collectionLocation = getUserCollection('categories');
  console.log(collectionLocation);
  const docRef = db.collection(collectionLocation).doc();

  const updateTimestamp = docRef.set({
    ...data,
    timestamp: new Date(),
  });

  return docRef.id;
};
//export const saveCategory = async (item) => {
//  try {
//    const db = firebase.firestore();
//    const res = await db
//      .collection(getUserCollection('categories'))
//      .doc()
//      .set({ ...item, timestamp: new Date() });
//    return 'ok';
//  } catch (error) {
//    return error;
//  }
//};

export const updateCategory = async (item) => {
  const db = firebase.firestore();
  const docRef = db.collection(getUserCollection('categories')).doc(await item.id);

  // Not awaiting intentionally
  const updateTimestamp = docRef.update({
    ...item,
    lastUpdatedTimestamp: new Date(),
  });
  return docRef.id;
};

export const batchedUpdateCategory = async (items) => {
  const db = firebase.firestore();
  const batch = db.batch();

  items.forEach(async (item) => {
    const docRef = db.collection(getUserCollection('categories')).doc(await item.id);
    batch.update(docRef, item);
  });

  // Not awaiting intentionally
  batch.commit();
};

export const fetchCategories = async () => {
  const db = firebase.firestore();

  return db.collection(getUserCollection('categories')).get();
};

export const deleteCategory = async (id) => {
  const db = firebase.firestore();
  const res = await db.collection('categories').doc(id);
  const res1 = await res.delete();

  return res.id;
};
