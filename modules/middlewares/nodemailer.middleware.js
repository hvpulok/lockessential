'use strict';
var nodemailer = require('nodemailer');
var MAIL_KEY = process.env.MAIL_KEY || '';
var MAIL_ADDR = process.env.MAIL_ADDR || '';
// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://mailAddr:mailKey@smtp.gmail.com');

// setup e-mail data with unicode symbols
var mailOptions = {
  from: '"My Manager App ?" <hvpulok@gmail.com>', // sender address
  to: 'hvpulok@gmail.com, hvpulok@hotmail.com', // list of receivers
  subject: 'Hello From MyMan ✔', // Subject line
  text: 'Hello world ?', // plaintext body
  html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
exports.sendEmail = function () {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
};
