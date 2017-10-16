'use strict';

const request = require('request');
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.set('port', process.env.PORT || 8080);

/********** GET, POST Request Handlers ***************/
app.get('/webhook', function (req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === 'doosan-baik-sandbox') {
    console.log('Validating Webhook');
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error('Failed validation');
    res.sendStatus(403);
  } 
});

app.post('/webhook', function (req, res) {
    console.log(req);
    res.sendStatus(200);
});

app.get('/referral', function (req, res) {
  let code = req.param('code');
  console.log(req.headers);
  console.log(code);
  fs.readFile(__dirname + '/referral.html', 'utf8', function(err, text) {
    res.send(text);
  });
});

app.get('/sample', function (req, res) {
  fs.readFile(__dirname + '/sample.html', 'utf8', function(err, text) {
    res.send(text);
  });
});


app.listen(app.get('port'), function() {
  console.log('listening at ', app.get('port'));
});

module.exports = app;
