'use strict';
var backup = require('mongodb-backup');
try {
    var env = require('./local-production');
} catch (error) {
}

/*
 * https://www.npmjs.com/package/mongodb-backup
 */
backup({
    uri: process.env.mongodbURI || '', // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
    root: __dirname, // write files into this dir
    tar: 'dump_' + new Date().toDateString() + '_.tar',
    callback: function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log('Backup finished');
        }
    }
});