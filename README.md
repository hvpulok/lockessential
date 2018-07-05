# Lock Essential - http://www.lockessential.com
* A simple but sophisticated enough encrypted personal information manager.
* A single page web application built with MEAN Stack (MongoDB, Express, AngularJS, Node.js)
* Beta Version Currently Hosted in: http://www.lockessential.com
* Opensource - Anybody can start to contribute

# Vision
* Giving an open source platform to the community for developing/testing POC of next generation password technology

## Following key software tools are used:
* UI: AngularJS 1.5.8, Javascript HTML, CSS
* Server: Express, Node.js
* DB: MongoDB, Mongoose
* Encryption Library: CryptoJS
* Authentication: PassportJS
* Build Tool: Gulp
* Unit Testing: Jasmine for UI side, Mocha for Server Side, Karma as test runner
* E2E Testing: Protractor
* Library manager: npm, bower
* Seed : meanjs.org
* SSL Certification: Let's Encrypt 
* Paas Hosting: Heroku
* Domain : Godaddy

## Setting up developer environment:
* cloning the repository: `git clone https://github.com/hvpulok/lockessential.git`
* install Node and MongoDB
* inside the local repository folder in terminal cmd : `npm install`
* inside terminal run mongo dB service: `mongod`
* running the app
    * in developement mode: `gulp`
    * in production mode: `gulp prod`
