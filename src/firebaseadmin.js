const admin = require('firebase-admin');

const serviceAccount = require('./serviceaccountkey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://sluggie-93a0d-default-rtdb.firebaseio.com' // Replace with your Firebase Realtime Database URL
  });

const db = admin.database();
module.exports = db;