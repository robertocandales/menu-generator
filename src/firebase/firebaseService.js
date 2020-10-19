import admin from 'firebase-admin';
var serviceAccount = require('./serviceAccountKey.json');

// For production we will add this file to the env with the following
// For Linux:
// export GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/service-account-file.json"
// For Windows:
// $env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\username\Downloads\service-account-file.json"

try {
  if (!admin.apps.length) {
    admin.initializeApp({
      //   And access the credential with this
      // credential: admin.credential.applicationDefault(),
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://restaurant-menu-3718c',
    });
  }
} catch (error) {
  console.log('Error in intializing firebase is: ', error);
}

export default admin;
