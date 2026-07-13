import express from 'express';
import { testRoute } from './test.controller.js';

const router = express.Router();

router.get('/', testRoute)

export default router;