import admin from "firebase-admin";

admin.initializeApp({
  // credential: admin.credential.cert(serviceAccount as any),
});

export const db = admin.firestore();
