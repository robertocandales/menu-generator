import admin from 'firebase-admin';
//var serviceAccount = require('./serviceAccountKey.json');

console.log(process.env.FIREBASE_DATABASE_URL);
try {
  if (!admin.apps.length) {
    admin.initializeApp({
      //   And access the credential with this
      // credential: admin.credential.applicationDefault(),
      credential: admin.credential.cert(JSON.parse(process.end.NEXT_PUBLIC_SERVICE_ACCOUNT_JSON)),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
  }
} catch (error) {
  console.log('Error in intializing firebase is: ', error);
}

export default admin;
