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
  app.route('/api/users/:id/accounts').get(function(req, res){
    User.findById(req.user._id).populate("accounts").exec(function(err, foundUser){
      if(err){
        console.log(err);
      }else {
        console.log("found user");
        console.log(foundUser);
        res.jsonp(foundUser);
      }
    });
  });

  // Finish by binding the user middleware
  app.param('userId', users.userByID);
};
