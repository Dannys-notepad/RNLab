import { ROLES, AUTH_PROVIDER } from './enums/user.enum.js';
   
const createAdminUserModel = async ({
    uid,
    fullname,
    email,
    authProvider,
    passwordHash,
    googleId,
    accountStatus = ACCOUNT_STATUS[0], // Default account status is 'inactive'
    role = role = ROLES[0], // Default role is 'admin'
    company = null,
    isVerified = false,
} = {}) => {
    return {
        uid,
        fullname,
        email,
        authProvider,
        passwordHash,
        googleId,
        accountStatus,
        role,
        company,
        isVerified,
    }
}

export { createAdminUserModel };