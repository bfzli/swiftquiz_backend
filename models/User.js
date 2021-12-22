const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin', 'superadmin'],
    },
    username: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    coins: {
      type: Number,
      default: 100,
    },
    score: {
      type: Number,
      default: 0,
    },
    quizzes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'quiz',
      },
    ],
    bio: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      default: 'daecd7bf24999a246a2fdb44c62200c6.png',
      required: false,
    },
    cover: {
      type: String,
      default: 'daecd7bf24999a246a2fdb44c62200c6.png',
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = model('user', UserSchema);
