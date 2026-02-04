import admin from "firebase-admin";
// const serviceAccount = require("./serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp();
}

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount as any),
// });

export const db = admin.firestore();
