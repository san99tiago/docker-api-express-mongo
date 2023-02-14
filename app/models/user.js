const mongoose = require('mongoose');
let Schema = mongoose.Schema;

/**
 * User Schema
 */
let userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "fullName not provided "],
  },
  email: {
    type: String,
    unique: [true, "email already exists in database!"],
    lowercase: true,
    trim: true,
    required: [true, "email not provided"],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: '{VALUE} is not a valid email!'
    }
  },
  role: {
    type: String,
    enum: ["administrator", "teacher", "student"],
    required: [true, "Please specify user role"]
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
});

const collectionName = "users"

module.exports = mongoose.model('User', userSchema, collectionName);
