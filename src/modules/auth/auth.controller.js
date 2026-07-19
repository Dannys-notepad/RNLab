import {
    registerUser
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
        success(res, "User registered successfully", registerNewUser);
    } catch (err) {
        next(err); // Pass the error to the centralized error handler
    }
}