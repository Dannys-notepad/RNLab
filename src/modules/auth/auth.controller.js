import {
    registerUser,
    activateUserAccount,
    generateVerificationUrl
} from './auth.service.js';
import { success, error } from '../../utils/response.js';

// USER REGISTRATION CONTROLLER
// Receives incoming signup requests, forwards validated data to the auth service,
// and returns standardized JSON responses for success or failure.
export const registerUserController = async (req, res, next) => {
    try {
        const body = await req.body;
        const data = {
            body,
            protocol: req.protocol,
            host: req.get('host'),
        };

        const registerNewUser = await registerUser(data);

        if (registerNewUser.status !== 200) {
            return error(res, registerNewUser.message, registerNewUser.errors, registerNewUser.status);
        }
        success(res, 'User registered successfully', registerNewUser);
    } catch (error) {
        next(error); // Pass the error to the centralized error handler
    }
}

// ACCOUNT ACTIVATION CONTROLLER
export const activateUserAccountController = async (req, res) => {
    try {
        const { token } = await req.params;
        const activateAccount = await activateUserAccount(token);

        if(activateAccount.status !== 200){
            return error(res, activateAccount.message)
        }

        success(res, 'User email verified and account activated', activateAccount);
    } catch (error) {
        next(error)
    }
}

// GENERATE ACTIVATION URL CONTROLLER
export const generateVerificationUrlController = async (req, res) => {
    try {
        const body = await req.body;
        const data = {
            body,
            protocol: req.protocol,
            host: req.get('host'),
        }

        const genActUrl = await generateVerificationUrl(data);
        if(genActUrl.status !== 200){
            return error(res, genActUrl.message)
        }

        success(res, 'verification link sent to your email', activateAccount);
    } catch (error) {
        next(error)
    }
}