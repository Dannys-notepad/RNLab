import admin from "firebase-admin";
import env from "../config/env.js";

const initFirebase = () => {
  const serviceAccountJson = env.FIREBASE_SERVICE_ACCOUNT;
  if (!serviceAccountJson) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT environment variable is not set");
  }

  const serviceAccount = JSON.parse(serviceAccountJson);

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  const firestore = admin.firestore();
  if (!firestore) {
    throw new Error("Firestore instance could not be initialized");
  }

  return firestore;
};

export const db = initFirebase();
export { admin };