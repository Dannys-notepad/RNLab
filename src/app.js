import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

// RESOURCE IMPORTS
import authRoute from './modules/auth/auth.route.js';
import reqLogger from './middlewares/reqLogger.js'
import errorHandler from './middlewares/errorHandler.js';

const app = express();

// MIDDLEWARES
app.use(cors())
app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

// CUSTOM MIDDLEWARES
app.use(reqLogger)
app.use(errorHandler)

// ROUTES
app.use('/auth', authRoute);


export default app;
