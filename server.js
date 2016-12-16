"use strict";
const express = require('express'),
      app = express(),
      morgan = require('morgan'),
      path = require('path'),
      portNumber = process.env.PORT || process.argv[2] || 8080;
const bodyParser = require('body-parser');
const request = require('request');
const config = require('./config');

app.use(express.static(__dirname));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/auth/facebook', function(req, res) {
  var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: config.FACEBOOK_SECRET,
    redirect_uri: req.body.redirectUri
  };

  request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
    if (response.statusCode !== 200) {
      return res.status(500).send({ message: accessToken.error.message });
    }
    console.log("accessToken: " + accessToken.access_token);
    return res.status(200).send({ access_token: accessToken.access_token });
  });
});
app.all('*', function (req, res) {
	res.status(200).sendFile(path.join(__dirname, '/index.html'));
});

app.listen(portNumber, function () {
  console.log("Listening on port " + portNumber);
});
