import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDC-H2aUkr2vkWpbqm37Q-29Izuj_2UrBc',
  authDomain: 'restaurant-menu-3718c.firebaseapp.com',
  databaseURL: 'https://restaurant-menu-3718c.firebaseio.com',
  projectId: 'restaurant-menu-3718c',
  storageBucket: 'restaurant-menu-3718c.appspot.com',
  messagingSenderId: '712431405441',
  appId: '1:712431405441:web:9b00d80c03d163cba90080',
  measurementId: 'G-ESTMV2VZXS',
};
let projectStorage = '';
if (typeof window !== 'undefined' && !firebase.apps.length) {
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebaseApp.firestore().enablePersistence();
  //  firebase.analytics();
  projectStorage = firebase.storage();
}
//const projectFirestore = firebase.firestore();

const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export { projectStorage, timestamp, firebase as default };
//export default firebase;
