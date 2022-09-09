import express from 'express';
const router = express.Router();
import { login, logout } from '../controllers/auth.controller';
router.route('/auth/login').post(login);
router.route('/auth/logout').get(logout);
export default router;
