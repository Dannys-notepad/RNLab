import jwt from 'jsonwebtoken';
import env from '../../config/env.js';
import AppError from '../../errors/AppError.js';
import sendmail from '../../services/mail.service.js';
import { genUid } from '../../utils/charGenerator.js';
import { registerSchema } from './auth.validator.js';
import { createAdminUserModel } from '../../models/User.js';
import { encrypt, decrypt } from '../../utils/encryption.js';
import { createUser, findUserByEmail, findUserById, updateVerification } from '../../db/repos/user.repo.js';


// USER REGISTRATION SERVICE
export const registerUser = async (data) => {
  try{
    // DATA VALIDATION 
    const result = await registerSchema.safeParseAsync(data.body);
    //console.log('Validation result:', result);
    if(!result.success){
        return {
            status: 400,
            message: "Validation failed",
            errors: result.error.format()
        }
    }
    
    // DESTRUCTURING DATA
    const { protocol, host } = data;
    const { firstName, middleName, lastName, email, password } = result.data;

    // checking if user exist before continuing
    const userExists = await findUserByEmail(result.data.email);

    if(userExists){
      return {
        status: 400,
        message: `user with email ${result.data.email} already exits`
      }
    }
    
    // structuring user data for account creation
    const id = await genUid();
    const fullName = [firstName, middleName, lastName].filter(Boolean).join(' ');
    const hashedPassword = await encrypt(password, env.SECRET_KEY);
    const userPayload = {
      id,
      fullName,
      email,
      authProvider: 'email',
      hashedPassword,
      googleId: null,
    }

    // creating user account verification link
    const token = jwt.sign({ id: userPayload.id }, env.SECRET_KEY, { expiresIn: '2mins' })
    const link = `${protocol}://${host}/api/v1/auth/activate-account/${token}`
    const mailFormat = {
      email: userPayload.email,
      text: `Click this link to verify and activate your account\n${link}`,
      subject: 'EMAIL VERIFICATION'
    }

    // creating user account and sending activation link email
    const newUser = createAdminUserModel(userPayload);
    await createUser(newUser);
    const mailSent = await sendmail(mailFormat);

    if (!mailSent) {
      return {
        status: 200,
        message: 'User registered successfully.'
      }
    }

    return {
      status: 200,
      message : 'User registered successfully and verification link sent to email'
    }

  }catch (error) {
    //throw new AppError(error.message, 500, error.stack);
    throw error;
  }
};


// ACCOUNT VERIFICATION SERVICE
export const activateUserAccount = async (token) => {
  try {

    if(!token){
      return {
        status: 400,
        message: 'Token is required'
      }
    }

    jwt.verify(token, env.SECRET_KEY, async (error, payload) => {
      if(error){
        if(error instanceof jwt.JsonWebTokenError){
          const decode = jwt.decode(token);
          if(!decode){
            return {
              status: 400,
              message: 'This verification link is incorrect, check your email follow instructions and try again'
            }
          }

          return {
            status: 400,
            message: 'activation has expired, generate another activation link'
          }
        }
      } else {
        const user = await findUserById({ where: { id: payload.id } });

        if(!user){
          return {
            status: 404,
            message: 'no account with this email'
          }
        }

        /*const verifyUser = */ await saveIsVerified(payload.id);

        return {
          status: 200,
          message: 'account activated, proceed to login'
        }
      }
    })
  } catch (error) {
    console.log(error);
    if(error instanceof jwt.JsonWebTokenError){
      return {
        status: 400,
        error: 'Link as expired, generate another verification link'
      }
    }

    return {
      status: 500,
      message: 'Error verifying user'
    }
    throw error;
  }
}

// GENERATE ACTIVATION URL SERVICE
export const generateVerificationUrl = async (data) => {
  try {
    const {email, protocol, host} = await data;
    
    const user = await findUserByEmail({ where: { email } })
    if(!user){
      return{
        status: 404,
        message: `an account with email ${email} do not exist`
      }
    }

    const newToken = jwt.sign({ userId: user.id }, env.SECRET_KEY, { expiresIn: '2mins' });
    const link = `${protocol}://${host}/api/v1/auth/activate-account/${newToken}`;

    const mailFormat = {
      email: user.email,
      text: `Click this link to activate your account\n${link}`,
      subject: 'RESEND: ACCOUNT ACTIVATION'
    }

    await sendmail(mailFormat);
    return {
      status: 200,
      message: `Activate link has been sent to your email address ${user.email}`
    }

  } catch (error) {
    throw error
  }
}

