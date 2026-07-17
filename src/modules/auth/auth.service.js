import { registerSchema } from './auth.validator.js';
import AppError from '../../errors/AppError.js';

// USER REGISTRATION SERVICE
export const registerUser = async (data) => {
  try{
    const { protocol, host } = data;

    const result = await registerSchema.safeParseAsync(data.body);
    if(!result.success){
        return {
            status: 400,
            message: "Validation failed",
            errors: result.errors.issues,
        }
    }
    
    //const { firstName, middleName, lastName, email, password } = result.data;
    return {
        status: 200,
        message: "Validation successful",
        data: result.data
    }

  }catch (error) {
    throw new AppError(error.message, 500, error.stack);
  }
};