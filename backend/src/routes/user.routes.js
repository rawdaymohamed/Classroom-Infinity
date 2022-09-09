import {
  createUser,
  readUser,
  listUsers,
  removeUser,
  updateUser,
  userByID,
} from '../controllers/user.controller';
import { hasAuthorization, requireLogin } from '../controllers/auth.controller';
import express from 'express';
const router = express.Router();
router.route('/api/users').get(listUsers).post(createUser);
router.param('userId', userByID);
router
  .route('/api/users/:userId')
  .get(requireLogin, readUser)
  .put(requireLogin, hasAuthorization, updateUser)
  .delete(requireLogin, hasAuthorization, removeUser);
export default router;
