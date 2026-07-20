import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import env from "../config/env.js";

let firestore;

try {
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT ?? env.FIREBASE_SERVICE_ACCOUNT;

    if (!serviceAccountJson) {
        throw new Error("FIREBASE_SERVICE_ACCOUNT environment variable is not set");
    }

    const serviceAccount = JSON.parse(serviceAccountJson);

    if (typeof serviceAccount.private_key === "string") {
        serviceAccount.private_key = serviceAccount.private_key
            .replace(/\\r\\n/g, "\n")
            .replace(/\\n/g, "\n");
    }

    const hasApp = Array.isArray(admin.apps) && admin.apps.length > 0;

    if (!hasApp) {
        admin.initializeApp({
            credential: admin.cert(serviceAccount),
        });
    }

    firestore = getFirestore();
} catch (error) {
    console.error("Firebase initialization error:", error.message);
    throw error;
}

if (!firestore) {
    throw new Error("Firestore instance could not be initialized");
}

export const db = firestore;
export { admin };