import User from '../models/user.model';
import extend from 'lodash/extend';
import formidable from 'formidable';
import fs from 'fs';

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
    return res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: 'Cannot get users',
    });
  }
};
export const userByID = async (req, res, next, userId) => {
  try {
    const user = await User.findById(userId);
    if (!user)
      return res.status(400).json({
        error: "Sorry this user doesn't exist",
      });
    user.hashedPassword = undefined;
    user.salt = undefined;
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
  return res.status(200).json(req.profile);
};

export const updateUser = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Photo could not be uploaded',
      });
    }
    let user = req.profile;
    user = extend(user, fields);

    if (files.photo) {
      user.photo.data = fs.readFileSync(files.photo.filepath);
      user.photo.contentType = files.photo.type;
    }
    try {
      await user.save();

      user.hashedPassword = undefined;
      user.email = undefined;
      user.salt = undefined;
      user.updated = Date.now();
      return res.json(user);
    } catch (error) {
      return res.status(400).json({
        error: "Sorry couldn't update user",
      });
    }
  });
};
export const removeUser = async (req, res) => {
  try {
    const user = req.profile;
    const deletedUser = await user.remove();
    deletedUser.hashedPassword = undefined;
    deletedUser.salt = undefined;
    return res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: "Sorry couldn't remove user",
    });
  }
};
export const photo = (req, res, next) => {
  if (req.profile.photo.data) {
    res.set('Content-Type', req.profile.photo.contentType);
    return res.send(req.profile.photo.data);
  }
  next();
};

export const defaultPhoto = (req, res) => {
  return res.sendFile('profile-pic.png', { root: 'public' });
};
