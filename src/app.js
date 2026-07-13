import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

// RESOURCE IMPORTS
import testRoute from './modules/test/test.route.js'

const app = express();

// MIDDLEWARES
app.use(cors())
app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

// ROUTES
app.use('/', testRoute)


export default app;
