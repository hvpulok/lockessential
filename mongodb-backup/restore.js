'use strict';

var restore = require('mongodb-restore');

/**
 * https://github.com/hex7c0/mongodb-restore
 */

restore({
<<<<<<< HEAD
    uri: 'mongodb://localhost/my_manager', // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
=======
    uri: 'mongodb://localhost:27017/mean-dev', // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
>>>>>>> 38fbe542a661ff295e3e9888d7f2ed836b607c5f
    root: __dirname,
    tar: 'dump.tar',
    callback: function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log('finish');
        }
    }
});