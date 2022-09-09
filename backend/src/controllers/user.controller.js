import User from '../models/user.model';
import extend from 'lodash/extend';

export const createUser = async (req, res) => {
  try {
    const { email } = req.body;
    const checkUserExists = await User.findOne({ email: email });
    if (checkUserExists) {
      return res
        .status(400)
        .json({ error: 'Sorry the email you entered already exists' });
    }
    const newUser = new User(req.body);
    await newUser.save();
    return res
      .status(200)
      .json({ message: 'Thanks. You signed up successfully' });
  } catch (err) {
    return res.status(400).json({ error: "Sorry can't signup" });
  }
};
export const listUsers = async (req, res) => {
  try {
    const users = await User.find().select('name updated created');
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: 'Cannot get users',
    });
  }
};
export const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user)
      return res.status(400).json({
        error: "Sorry this user doesn't exist",
      });
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({
      error: 'Could not retrieve user',
    });
  }
};
export const readUser = (req, res) => {
  req.profile.hashedPassword = undefined;
  req.profile.salt = undefined;
  req.profile.email = undefined;
  return res.status(200).json(req.profile);
};
export const updateUser = async (req, res) => {
  try {
    let user = req.profile;
    user.updated = Date().now;
    user = extend(user, req.body);
    await user.save();
    user.hashedPassword = undefined;
    user.salt = undefined;
    user.email = undefined;
    res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({
      error: "Sorry there's an error updating profile",
    });
  }
};
export const removeUser = async (req, res) => {
  try {
    const user = req.profile;
    const deletedUser = await user.remove();
    deletedUser.hashedPassword = undefined;
    deletedUser.salt = undefined;
    deletedUser.email = undefined;
    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: "Sorry can't delete user",
    });
  }
};
