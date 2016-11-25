'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// define mongoose comment schema for MongoDB
var commentSchema = new mongoose.Schema({
  text: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  },
  commentDate: { type: Date, default: Date.now }
});


/**
 * Account Schema
 */
var AccountSchema = new Schema({
  account: String,
  username: String,
  password: String,
  category: String,
  email: String,
  url: String,
  description: String,
  isCurrentUserOwner: { type: Boolean, default: false },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

mongoose.model('Account', AccountSchema);
