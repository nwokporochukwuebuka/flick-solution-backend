const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    passcode: {
      type: String,
      /* validate(value) {
        if (!value.match(/^(?=.*[0-9])(?=.{6,})/i)) {
          throw new Error('passcode must be 6 numbers');
        }
      }, */
      private: true,
    },
    pin: {
      type: String,
      /* minLength: 4,
      validate(value) {
        if (!value.match(/^(?=.*[0-9])(?=.{4,})/i)) {
          throw new Error('pin must be 4 numbers');
        }
      }, */
      private: true, // used by the toJSON plugin
    },
    hasPin: {
      type: Boolean,
      default: false,
    },
    hasPasscode: {
      type: Boolean,
      default: false,
    },
    deviceId: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i)) {
          throw new Error('Password must be at least 8 characters long and must contain at least one number and symbol.');
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

/**
 * Check if pin matches the user's pin
 * @param {string} pin
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPinMatch = async function (pin) {
  const user = this;
  return bcrypt.compare(pin, user.pin);
};

/**
 * Check if passcode matches the user's passcode
 * @param {string} passcode
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasscodeMatch = async function (passcode) {
  const user = this;
  return bcrypt.compare(passcode, user.passcode);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('pin')) {
    user.pin = await bcrypt.hash(user.pin, 8);
  }
  next();
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('passcode')) {
    user.passcode = await bcrypt.hash(user.passcode, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
