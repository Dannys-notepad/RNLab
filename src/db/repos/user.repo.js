import { db, admin } from '../firebase.js';

const isPlainObject = (value) => {
    return value !== null && typeof value === 'object' && value.constructor === Object;
};

/**
 * Get a Firestore document reference for the specified user email.
 *
 * @param {string} userEmail - The user email to use as the document key.
 * @returns {FirebaseFirestore.DocumentReference} Firestore document reference.
 * @throws {Error} When userEmail is empty or invalid.
 */
const getUserDocRef = (email) => {
    const normalizedEmail = String(email).trim();
    if (!normalizedEmail) {
        throw new Error('email is required');
    }

    return db.collection('users').doc(normalizedEmail);
}

/**
 * Create a new user document in Firestore.
 *
 * Appends server-generated timestamps to the user data before saving.
 *
 * @param {Object} userData - The user object to store.
 * @param {string|number} userData.email - The user's email address.
 * @returns {Promise<void>} Resolves once the document is created.
 * @throws {Error} When userData is missing or Firestore write fails.
 */
export const createUser = async (userData) => {
    if (!userData) {
        throw new Error('User object is required');
    }

    if (!isPlainObject(userData)) {
        throw new Error('User data must be a plain JavaScript object');
    }

    try {
        const ref = getUserDocRef(userData.email);
        await ref.set(userData);
        return ref;
    } catch (error) {
        console.error(`Error creating user:`, error.message);
        throw error;
    }
}

/**
 * Find a user document by email and return its data.
 *
 * @param {string} userEmail - The email of the user to retrieve.
 * @returns {Promise<Object|null>} User data if found, otherwise null.
 * @throws {Error} When userEmail is missing or Firestore read fails.
 */
export const findUserById = async (userEmail) => {
    if (!userEmail) {
        throw new Error('userEmail is required');
    }

    try {
        const doc = await getUserDocRef(userEmail).get();
        return doc.exists ? doc.data() : null;
    } catch (error) {
        console.error(`Error finding user ${userEmail}:`, error.message);
        throw error;
    }
}