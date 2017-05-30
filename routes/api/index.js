'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var firebase = require("firebase-admin");
var serviceAccount = require('../../ticketmastertest-110a9-firebase-adminsdk-g3hru-c3393e383b.json');

// Add the single-sign-on Router
// var auth = require("./routes/auth");

/**********************/
/*** Firebase Logic ***/
/**********************/


// Initialize Firebase
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://ticketmastertest-110a9.firebaseio.com"
});

// Create reference(s) to the database
var database = firebase.database();
var tickets = firebase.database().ref("tickets");
var tags = firebase.database().ref("tags");

var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/*********************/
/*** Tickets Logic ***/
/*********************/


router.get('/tickets', function(req, res) {
  tickets.orderByChild("timeAdded")
    .once("value")
    .then(function(snapshot) {
      res.json(snapshot.val());
    });
});

router.get('/tickets/:id', function(req, res) {
  var specificTicket = firebase.database().ref("tickets/" + req.params.id);
  specificTicket.once("value")
  .then(function(snapshot) {
    res.json(snapshot.val());
  });
});

router.post('/tickets', urlencodedParser, function(req, res) {
  var ticket = req.body;
  var currentTime = Date.now();
  tickets.push().set({
    "description": req.body.description,
    "tags": req.body.tags,
    "student": "99033279",
    "teacher": "",
    "timeAdded": currentTime
  });
});

router.put('/tickets/:id', function(req, res) {
  var specificTicket = firebase.database().ref("tickets/" + req.params.id);
  var oldTime = req.body.timeAdded;
  specificTicket.set({
    "description": req.body.description,
    "tags": req.body.tags,
    "student": "99033279",
    "teacher": "",
    "timeAdded": oldTime
  });
  res.json({ 'Ticket': req.params.id, message: 'Todo Updated' });
});

router.delete('/tickets/:id', function(req, res) {
  var specificTicket = firebase.database().ref("tickets/" + req.params.id);
  res.json({ message: 'Todo: ' + req.params.id + ' Deleted' });
});

/******************/
/*** Tags Logic ***/
/******************/

router.get('/tags', function(req, res) {
    tags.orderByChild("name")
    .once('value')
    .then(function(tagSnapshot) {
      res.json(tagSnapshot.val());
    });
});

router.get('/tags/:id', function(req, res) {
    var specificTag = firebase.database().ref("tags/" + req.params.id);
    specificTag.once("value")
    .then(function(snapshot) {
      res.json(snapshot.val());
    });
});

router.post('/tags', urlencodedParser, function(req, res) {
  var tag = req.body;
  tags.push().set({
    "description": tag.tagdescription,
    "name": tag.tagname,
    "active": true
  });
  res.json({ message: 'tag toegevoegt' });
});

router.put('/tags/:id', function(req, res) {
  var specificTag = firebase.database().ref("tags/" + req.params.id);
  specificTag.set({
    "description": tag.tagdescription,
    "name": tag.tagname
  });
  res.json({ 'tags': tags, message: 'Todo Updated' });
});

router.delete('/tags/:id', function(req, res) {
  var specificTag = firebase.database().ref("tags/" + req.params.id);
  specificTag.set({
    "active": false
  })
  res.json({ message: 'tag Deleted' });
});

module.exports = router;
