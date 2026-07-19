import express from 'express';
import {
    registerUserController
} from './auth.controller.js';

const router = express.Router();

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              firstName:
 *                 type: string
 *              middleName:
 *                 type: 
 *              lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 */

router.post('/register', registerUserController);

export default router;