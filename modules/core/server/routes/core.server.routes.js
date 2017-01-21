'use strict';

module.exports = function (app) {
  // Root routing
  var core = require('../controllers/core.server.controller');

  // Define error pages
  app.route('/server-error').get(core.renderServerError);

  // Return a 404 for all undefined api, module or lib routes
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  app.route('/.well-known/acme-challenge/0iwrO09jcHbhf52_jjCDyR9ChqDDBrJDiZ-35krxIrs')
  .get(function(req, res){
    res.send('0iwrO09jcHbhf52_jjCDyR9ChqDDBrJDiZ-35krxIrs.xteYNW1_EC0EmpyojfYxdzEHJ_y_XP7nD-6Pe6SiEPc');
  });

  // Define application route
  app.route('/*').get(core.renderIndex);
};
