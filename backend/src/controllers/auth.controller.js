import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import { expressjwt } from 'express-jwt';
import config from '../config';
export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    const isAuthenticated = user && user.authenticate(req.body.password);

    if (!isAuthenticated || !user) {
      return res
        .status(401)
        .json({ error: 'Sorry. The email or password not correct' });
    }
    const token = jwt.sign({ _id: user._id }, config.jwtSecret);
    res.cookie('t', token, { expire: new Date() + 9999 });
    return res.status(200).json({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    return res.status(401).json({ error: "Sorry couldn't login" });
  }
};
export const logout = (req, res) => {
  res.clearCookie('t');
  return res
    .status(200)
    .json({ message: 'Thank you. You successfully logged out' });
};

export const requireLogin = expressjwt({
  secret: config.jwtSecret,
  userProperty: 'auth',
  algorithms: ['HS256'],
});
export const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status(403).json({ error: "Sorry the user isn't authorized" });
  }
  next();
};
