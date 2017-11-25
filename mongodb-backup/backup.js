'use strict';
var backup = require('mongodb-backup');

/*
 * https://www.npmjs.com/package/mongodb-backup
 */
backup({
    uri: 'mongodb://dumper:ILoveDenver65@ds159767.mlab.com:59767/my_manager', // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
    root: __dirname, // write files into this dir
    tar: 'dump.tar',
    callback: function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log('finish');
        }
    }
    // collections: ['accounts', 'articles', 'articles',], // save this collection only
});