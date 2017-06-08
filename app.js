'use strict';

const request = require('request');
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const app = express();

const ACCESS_TOKEN='EAAZAqLBXCXpgBABxbnT96lc7iZBV4PLg2KJF8eyHZAsUeXJ6ZAUG9YgushGHsoze6XtWhJJGApw4T5RTew1bWZCLBIfgw6wsKh0OPIPZCJMes0R7n6I6ZBe9gnkncmV5lpmxx8pxlGd3BrpIeaM543ITyDymJJ2lHJSuH0Ta9oAPGJJ9aZCH64dBtHN9GOirX2kZD';
const PAGE_ACCESS_TOKEN='EAAZAqLBXCXpgBAOI43j6Ft5SRvLO79sHWQATgzg5e5Izo71cp3nL5Xu3uWbTRq8Y0nX9ASVZCxAJrX0usHu1gk6ZBCJ0pHgqf4UbQUiiVspetJXSjhvAqqlqsd1MC9AuX3fZC9lSULym04ZCtXe7kj8NTOk9UEziD73J3M6CcWXA5xo8xLGRwFWURF9xICaoZD';

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
  res.sendFile('referral.html');
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
