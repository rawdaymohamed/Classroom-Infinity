import mongoose from 'mongoose';
import crypto from 'crypto';
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter your name',
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+@.+\..+/, 'Please enter a correct email address'],
    required: 'Please enter your email address',
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
  hashedPassword: {
    type: String,
    required: 'Please enter a password',
  },
  salt: String,
  about: { type: String, trim: true },
  photo: {
    data: Buffer,
    contentType: String,
  },
  instructor: {
    type: Boolean,
    default: false,
  },
});

UserSchema.virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });
UserSchema.path('hashedPassword').validate(function (v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Please enter a password with 6 characters');
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Please enter a password');
  }
}, null);

UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },
  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return 'Error encrypting the password';
    }
  },
  // Todo update salt algorithm
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  },
};

export default mongoose.model('User', UserSchema);
