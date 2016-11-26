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
  account: { type: String, required: [true, 'Need to have valid account data'] },
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
}, { timestamps : true });

mongoose.model('Account', AccountSchema);
