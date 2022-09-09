import {
  createUser,
  readUser,
  listUsers,
  removeUser,
  updateUser,
  userByID,
  photo,
  defaultPhoto,
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

router.route('/api/users/:userId/photo').get(photo, defaultPhoto);
router.route('/api/users/photos/defaultphoto').get(defaultPhoto);

export default router;
