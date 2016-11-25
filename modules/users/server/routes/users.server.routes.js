'use strict';

module.exports = function (app) {
  // User Routes
  var users = require('../controllers/users.server.controller');
  var User = require('../models/user.server.model');

  // Setting up the users profile api
  app.route('/api/users/me').get(users.me);
  app.route('/api/users').put(users.update);
  app.route('/api/users/accounts').delete(users.removeOAuthProvider);
  app.route('/api/users/password').post(users.changePassword);
  app.route('/api/users/picture').post(users.changeProfilePicture);
  //my custom routes

  //api route to get all current users owned accounts
  app.route('/api/users/current/accounts').get(function(req, res){
    if(req.user){
      User.findById(req.user._id).populate('accounts').exec(function(err, foundUser){
        if(err){
          console.log(err);
          res.status(403).json({
            title: 'Unauthorized',
            message: 'Please Login',
            error: err
          });
        }else {
          console.log('found user');
          console.log(foundUser);
          res.jsonp(foundUser);
        }
      });
    }else{
      res.status(403).json({
        title: 'Unauthorized',
        message: 'Please Login'
      });
    }
  });

  // Finish by binding the user middleware
  app.param('userId', users.userByID);
};
