import dotenv from 'dotenv/config';

const env = {
    PORT: process.env.PORT,
    SMTP_USERNAME: process.env.SMTP_USERNAME,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SECRET_KEY: process.env.SECRET_KEY,
    FIREBASE_SERVICE_ACCOUNT: process.env.FIREBASE_SERVICE_ACCOUNT
}

export default env;