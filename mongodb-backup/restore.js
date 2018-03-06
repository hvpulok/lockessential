'use strict';
var backup = require('mongodb-backup');
try {
    var env = require('./local-production');
} catch (error) {
}
var restore = require('mongodb-restore');

/**
 * https://github.com/hex7c0/mongodb-restore
 */

restore({
    uri: process.env.LOCAL_MONGODB_URI, // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
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