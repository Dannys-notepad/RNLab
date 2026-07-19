import jwt from 'jsonwebtoken';
import env from '../../config/env.js';
import AppError from '../../errors/AppError.js';
import sendmail from '../../services/mail.service.js';
import { userId } from '../../utils/charGenerator.js';
import { registerSchema } from './auth.validator.js';
import { createAdminUserModel } from '../../models/User.js';
import { encrypt, decrypt } from '../../utils/encryption.js';
import { createUser, findUserById } from '../../db/repos/user.repo.js';


// USER REGISTRATION SERVICE
export const registerUser = async (data) => {
  try{
    // DATA VALIDATION 
    const result = await registerSchema.safeParseAsync(data.body);
    if(!result.success){
        return {
            status: 400,
            message: "Validation failed",
            errors: result.errors.issues,
        }
    }
    
    // DESTRUCTURING DATA
    const { protocol, host } = data;
    const { firstName, middleName, lastName, email, password } = result.data;

    // checking if user exist before continuing
    const userExists = await findUserById(result.data.email);

    if(userExists){
      return {
        status: 400,
        message: `user with email ${result.data.email} already exits`
      }
    }
    
    // structuring user data for account creation
    const uid = await userId();
    const fullName = [firstName, middleName, lastName].filter(Boolean).join(' ');
    const hashedPassword = await encrypt(password, env.PASSWORD_ENCRYPTION_KEY);
    const userPayload = {
      uid,
      fullName,
      email,
      authProvider: 'email',
      hashedPassword
    }

    // creating user account activation link
    const token = jwt.sign({ uid: userPayload.uid }, env.ENCRYPTION_KEY, { expiresIn: '2mins' })
    const link = `${protocol}://${host}/api/v1/auth/activate-account/${token}`
    const mailFormat = {
      email: userPayload.email,
      text: `Click this link to activate your account\n${link}`,
      subject: 'ACCOUNT ACTIVATION'
    }

    // creating user account and sending activation link email
    const newUser = createAdminUserModel(userPayload);
    await createUser(newUser);
    await sendmail(mailFormat);

    return {
      status: 200,
      message : 'User registered successfully and activation link sent to email'
    }

  }catch (error) {
    throw new AppError(error.message, 500, error.stack);
  }
};