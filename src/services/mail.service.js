import nodemailer from 'nodemailer';
import env from '../config/env.js';

//MAILER V2
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.SMTP_USERNAME,
    pass: env.SMTP_PASSWORD // must be app password (not normal Gmail password)
  }
});

const mail = async (recipient) => {
  try {
    if(!recipient?.email){
      throw new Error('Recipient email is required');
    }

    const info = await transporter.sendMail({
      from: `"RNLabs" <${env.SMTP_USERNAME}>`,
      to: recipient.email,
      subject: recipient.subject || 'No subject',
      text: recipient.text || ''
    })

    console.log('Email sent', info.messageId);
    return info;
  } catch (error) {
    console.error(`Email failed:`, recipient?.email, error.message);
    return
  }
}

export default mail;

// MAILER V1
// const mail = async (recipient) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       service: 'gmail',
//       port: 587,
//       secure: false,
//       auth: {
//         user: env.SMTP_USERNAME,
//         pass: env.SMTP_PASSWORD,
//       },
//     });

//     const info = await transporter.sendMail({
//       from: `RNLabs <${env.SMTP_USERNAME}>`,
//       to: recipient.email,
//       subject: recipient.subject,
//       text: recipient.text,
//       //html: recipient.html,
//     });

//     console.log('Email sent to:', recipient.email);
//     //return info;
//   } catch (error) {
//     console.log('Email failed:', recipient.email, error.message);
//     return false; 
//   }
// };

// export default mail;