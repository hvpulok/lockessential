'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Account Schema
 */
var AccountSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Account name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Account', AccountSchema);
