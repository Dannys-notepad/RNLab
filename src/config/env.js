import dotenv from 'dotenv/config';

const env = {
    PORT: process.env.PORT,
    SMTP_USERNAME: process.env.SMTP_USERNAME,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    FIREBASE_SERVICE_ACCOUNT: process.env.FIREBASE_SERVICE_ACCOUNT
}

export default env;