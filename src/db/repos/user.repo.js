import { db, admin } from '../firebase.js';

/**
 * Get a Firestore document reference for the specified user ID.
 *
 * @param {string|number} userId - The user identifier to use as the document key.
 * @returns {FirebaseFirestore.DocumentReference} Firestore document reference.
 * @throws {Error} When userId is empty or invalid.
 */
const getUserDocRef = (userId) => {
    const normalizedId = String(userId || '').trim();
    if (!normalizedId) {
        throw new Error('userId is required');
    }

    return db.collection('users').doc(normalizedId);
}

/**
 * Create a new user document in Firestore.
 *
 * Appends server-generated timestamps to the user data before saving.
 *
 * @param {Object} userData - The user object to store.
 * @param {string|number} userData.id - The user identifier.
 * @returns {Promise<void>} Resolves once the document is created.
 * @throws {Error} When userData is missing or Firestore write fails.
 */
export const createUser = async (userData) => {
    if(!userData){
        throw new Error('User object with id is required');
    }

    try {
        const ref = getUserDocRef(userData.id);
        const modifiedUserData = {
            ...userData,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            lastActiveAt: admin.firestore.FieldValue.serverTimestamp(),
        };
    } catch (error) {
        console.error(`Error creating user:`, error.message);
        throw error;
    }
}

/**
 * Find a user document by ID and return its data.
 *
 * @param {string|number} userId - The identifier of the user to retrieve.
 * @returns {Promise<Object|null>} User data if found, otherwise null.
 * @throws {Error} When userId is missing or Firestore read fails.
 */
export const findUserById = async (userId) => {
    if (!userId) {
        throw new Error('userId is required');
    }

    try {
        const doc = await getUserDocRef(userId).get();
        return doc.exists ? doc.data() : null;
    } catch (error) {
        console.error(`Error finding user ${userId}:`, error.message);
        throw error;
    }
}