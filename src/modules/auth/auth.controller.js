import {
    registerUser
} from './auth.service.js';
import { success, error } from '../../utils/response.js';

// USER REGISTRATION CONTROLLER
export const registerUserController = async (req, res, next) => {
    try {
        const body = await req.body;
        const data = {
            body,
            protocol: req.protocol,
            host: req.get('host'), 
        };

        const result = await registerUser(data);
        if (result.status && result.status !== 200) {
            return error(res, result.message, result.errors, result.status);
        }
        success(res, "User registered successfully", result);
    } catch (err) {
        next(err); // Pass the error to the error handling middleware
    }
}