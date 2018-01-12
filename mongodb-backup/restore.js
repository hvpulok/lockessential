'use strict';

var restore = require('mongodb-restore');

/**
 * https://github.com/hex7c0/mongodb-restore
 */

restore({
    uri: 'mongodb://localhost/my_manager', // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
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