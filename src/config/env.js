import dotenv from 'dotenv/config';

const env = {
    PORT: process.env.PORT,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    FIREBASE_SERVICE_ACCOUNT: process.env.FIREBASE_SERVICE_ACCOUNT
}

export default env;