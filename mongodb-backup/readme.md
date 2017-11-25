# Backup
- Create following file in following folder `./mongodb-backup/local-production.js`

    Add following contents
    ```
    process.env.mongodbURI = 'mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>'

    module.exports = {};
    ```
- in root folder run cmd : `npm run dbBackup`
- it will create dump_todaysdate.tar in same folder (`./mongodb-backup/`)

# Restore to local host or specified uri
- update URI in restore.js
- run cmd: `node restore.js`