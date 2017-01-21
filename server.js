"use strict";
const express = require('express'),
      app = express(),
      morgan = require('morgan'),
      path = require('path'),
      portNumber = process.env.PORT || process.argv[2] || 8080;
const bodyParser = require('body-parser');
const request = require('request');
const config = require('./config');
const mockedData = require("./mocked-data");

var i = 16;

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

    return res.status(200).send({ access_token: accessToken.access_token });
  });
});

app.get('/user/facebook', function(req, res) {
  const fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
  const graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
  const accessToken = req.header("Authorization").split(' ')[1];

  var params = {
    fields: "id,email,name,picture",
    access_token: accessToken,
    token_type: "bearer",
    expires_in: "5178000.0"
  };

  request.get({ url: graphApiUrl, qs: params, json: true }, function(err, response, profile) {
    if (response.statusCode !== 200) {
      return res.status(500).send({ message: profile.error.message });
    }

    var user = {
      facebook: profile.id,
      picture: 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=normal',
      displayName: profile.name
    };

    return res.status(200).send(user);
  });
  // End request
});

app.get('/bottles', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json(mockedData.BOTTLES);
});

app.post('/bottle', (req, res) => {
  var bottle = save(req.body);

  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json(bottle);
});

function save(bottle) {
  let bottleToSave = {
    id: i++,
    title: bottle.title,
    description: bottle.description,
    lat: bottle.lat,
    lng: bottle.lng
  };
  mockedData.BOTTLES.push(bottleToSave);

  return bottleToSave;
}

app.put('/bottle', (req, res) => {
  var bottle = update(req.body);

  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json(bottle);
});

function update(bottle) {
  let bottleToUpdate = findBottle(bottle.id);
  bottleToUpdate.title = bottle.title;
  bottleToUpdate.description = bottle.description;
  bottleToUpdate.lat = bottle.lat;
  bottleToUpdate.lng = bottle.lng;

  return bottleToUpdate;
}

app.get('/markers', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json(toMarkers(mockedData.BOTTLES));
});

app.get('/marker/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json(toMarker(findBottle(req.params.id)));
});

function toMarker(bottle) {
  return {
    id: bottle.id,
    lat: bottle.lat,
    lng: bottle.lng,
    label: bottle.title,
    draggable: false
  };
}

function toMarkers(bottles) {
  var markers = [];
  for (var i = 0; i < bottles.length; i++) {
    if (i == 2) {
      break;
    }

    markers.push(toMarker(bottles[i]));
  }

  return markers;
}

function findBottle(id) {
  var bottles = mockedData.BOTTLES;
  for (var i = 0; i < bottles.length; i++) {
    if (bottles[i].id == id) {
      return bottles[i];
    }
  }
  return null;
}

app.all('*', function (req, res) {
	res.status(200).sendFile(path.join(__dirname, '/index.html'));
});

app.listen(portNumber, function () {
  console.log("Listening on port " + portNumber);
});
