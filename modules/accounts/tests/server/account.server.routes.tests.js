'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Account = mongoose.model('Account'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  account;

/**
 * Account routes tests
 */
describe('Account CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Account
    user.save(function () {
      account = {
        name: 'Account name'
      };

      done();
    });
  });

  it('should be able to save a Account if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Account
        agent.post('/api/accounts')
          .send(account)
          .expect(200)
          .end(function (accountSaveErr, accountSaveRes) {
            // Handle Account save error
            if (accountSaveErr) {
              return done(accountSaveErr);
            }

            // Get a list of Accounts
            agent.get('/api/accounts')
              .end(function (accountsGetErr, accountsGetRes) {
                // Handle Accounts save error
                if (accountsGetErr) {
                  return done(accountsGetErr);
                }

                // Get Accounts list
                var accounts = accountsGetRes.body;

                // Set assertions
                (accounts[0].user._id).should.equal(userId);
                (accounts[0].name).should.match('Account name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Account if not logged in', function (done) {
    agent.post('/api/accounts')
      .send(account)
      .expect(403)
      .end(function (accountSaveErr, accountSaveRes) {
        // Call the assertion callback
        done(accountSaveErr);
      });
  });

  it('should not be able to save an Account if no name is provided', function (done) {
    // Invalidate name field
    account.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Account
        agent.post('/api/accounts')
          .send(account)
          .expect(400)
          .end(function (accountSaveErr, accountSaveRes) {
            // Set message assertion
            (accountSaveRes.body.message).should.match('Please fill Account name');

            // Handle Account save error
            done(accountSaveErr);
          });
      });
  });

  it('should be able to update an Account if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Account
        agent.post('/api/accounts')
          .send(account)
          .expect(200)
          .end(function (accountSaveErr, accountSaveRes) {
            // Handle Account save error
            if (accountSaveErr) {
              return done(accountSaveErr);
            }

            // Update Account name
            account.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Account
            agent.put('/api/accounts/' + accountSaveRes.body._id)
              .send(account)
              .expect(200)
              .end(function (accountUpdateErr, accountUpdateRes) {
                // Handle Account update error
                if (accountUpdateErr) {
                  return done(accountUpdateErr);
                }

                // Set assertions
                (accountUpdateRes.body._id).should.equal(accountSaveRes.body._id);
                (accountUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Accounts if not signed in', function (done) {
    // Create new Account model instance
    var accountObj = new Account(account);

    // Save the account
    accountObj.save(function () {
      // Request Accounts
      request(app).get('/api/accounts')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Account if not signed in', function (done) {
    // Create new Account model instance
    var accountObj = new Account(account);

    // Save the Account
    accountObj.save(function () {
      request(app).get('/api/accounts/' + accountObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', account.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Account with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/accounts/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Account is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Account which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Account
    request(app).get('/api/accounts/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Account with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Account if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Account
        agent.post('/api/accounts')
          .send(account)
          .expect(200)
          .end(function (accountSaveErr, accountSaveRes) {
            // Handle Account save error
            if (accountSaveErr) {
              return done(accountSaveErr);
            }

            // Delete an existing Account
            agent.delete('/api/accounts/' + accountSaveRes.body._id)
              .send(account)
              .expect(200)
              .end(function (accountDeleteErr, accountDeleteRes) {
                // Handle account error error
                if (accountDeleteErr) {
                  return done(accountDeleteErr);
                }

                // Set assertions
                (accountDeleteRes.body._id).should.equal(accountSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Account if not signed in', function (done) {
    // Set Account user
    account.user = user;

    // Create new Account model instance
    var accountObj = new Account(account);

    // Save the Account
    accountObj.save(function () {
      // Try deleting Account
      request(app).delete('/api/accounts/' + accountObj._id)
        .expect(403)
        .end(function (accountDeleteErr, accountDeleteRes) {
          // Set message assertion
          (accountDeleteRes.body.message).should.match('User is not authorized');

          // Handle Account error error
          done(accountDeleteErr);
        });

    });
  });

  it('should be able to get a single Account that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Account
          agent.post('/api/accounts')
            .send(account)
            .expect(200)
            .end(function (accountSaveErr, accountSaveRes) {
              // Handle Account save error
              if (accountSaveErr) {
                return done(accountSaveErr);
              }

              // Set assertions on new Account
              (accountSaveRes.body.name).should.equal(account.name);
              should.exist(accountSaveRes.body.user);
              should.equal(accountSaveRes.body.user._id, orphanId);

              // force the Account to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Account
                    agent.get('/api/accounts/' + accountSaveRes.body._id)
                      .expect(200)
                      .end(function (accountInfoErr, accountInfoRes) {
                        // Handle Account error
                        if (accountInfoErr) {
                          return done(accountInfoErr);
                        }

                        // Set assertions
                        (accountInfoRes.body._id).should.equal(accountSaveRes.body._id);
                        (accountInfoRes.body.name).should.equal(account.name);
                        should.equal(accountInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Account.remove().exec(done);
    });
  });
});
