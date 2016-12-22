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
  title: { type: String, required: [true, 'Need to have valid title'] },
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

/**
 * Hook a pre remove method to delete related accounts/data/info in user Schema
 */
AccountSchema.post('remove', function(next){
  // Remove all the accounts docs that reference the removed user.
  // this.model('User').remove({ 'accounts': this._id }, next);
  this.model('User').update({ 'accounts': this._id }, 
                    { $pull: { 'accounts':this._id } }, 
                    function (err,val) {
                      console.log(val);
                    });
});

module.exports = mongoose.model('Account', AccountSchema);
