import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

// RESOURCE IMPORTS
import env from './config/env.js'
import authRoute from './modules/auth/auth.route.js';
import healthRoute from './modules/health/health.route.js';
import reqLogger from './middlewares/reqLogger.js'
import errorHandler from './middlewares/errorHandler.js';

const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RNLabs API',
      version: '1.0.0',
      description: 'API documentation for RNLab',
    },
    servers: [
      {
        url: `http://localhost:${env.PORT || 5000}`,
      },
    ],
  },
  apis: ['./src/modules/**/*.js'],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);


// MIDDLEWARES
app.use(cors())
app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

// CUSTOM MIDDLEWARES
app.use(reqLogger)
app.use(errorHandler)

// DOCUENTATION ROUTE
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ROUTES
app.use('/health', healthRoute);
app.use('/api/v1/auth', authRoute);


export default app;
