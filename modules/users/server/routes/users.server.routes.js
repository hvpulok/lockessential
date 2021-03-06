'use strict';

module.exports = function (app) {
  // User Routes
  var users = require('../controllers/users.server.controller');
  var User = require('../models/user.server.model');
  var path = require('path');
  var myCrypto = require(path.resolve('./modules/middlewares/crypto.middleware'));

  // Setting up the users profile api
  app.route('/api/users/me').get(users.me);
  app.route('/api/users').put(users.update);
  app.route('/api/users/accounts').delete(users.removeOAuthProvider);
  app.route('/api/users/password').post(users.changePassword);
  app.route('/api/users/picture').post(users.changeProfilePicture);
  

  //my custom routes
  app.route('/api/users/userkey/email').post(users.emailUserKeyInfo);
  app.route('/api/users/userkey/email/token').get(users.ShowUserKeyInfo_FromEmailLink);


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
          var updatedData = [];
          if(foundUser.accounts){
            foundUser.accounts.forEach(function(eachAccount){
            var temp = JSON.parse(JSON.stringify(eachAccount));
            var data = myCrypto.decryptObject(temp.account, req.user._id.toString().substr(0,3));
            var obj = Object.assign({}, temp, { account:data });
            updatedData.push(obj);
          });
          }
          
          res.json(updatedData);
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
