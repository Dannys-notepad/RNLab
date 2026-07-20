import { ROLES, AUTH_PROVIDER, ACCOUNT_STATUS } from './enums/user.enum.js';
   
const createAdminUserModel = ({
    uid,
    fullName,
    email,
    authProvider,
    hashedPassword,
    googleId,
    accountStatus = ACCOUNT_STATUS[0], // Default account status is 'inactive'
    role = ROLES[0], // Default role is 'admin'
    company = null,
    isVerified = false,
    createdAt = new Date().toISOString(),
    lastActiveAt = new Date().toISOString()
} = {}) => {
    return {
        uid,
        fullName,
        email,
        authProvider,
        hashedPassword,
        googleId,
        accountStatus,
        role,
        company,
        isVerified,
        createdAt,
        lastActiveAt
    }
}

export { createAdminUserModel };