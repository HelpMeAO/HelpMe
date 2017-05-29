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
  tickets.orderByChild("teacher")
    .once("value")
    .then(function(snapshot) {
      res.json(snapshot.val());
    });
});

router.get('/tickets/:id', function(req, res) {
  res.json({message: "LIST"});
});

router.post('/tickets', urlencodedParser, function(req, res) {
  var ticket = req.body;
  tickets.push().set({
    "description": req.body.description,
    "tags": req.body.tags,
    "student": "99033279",
    "teacher": ""
  });
});

router.put('/tickets/:id', function(req, res) {
  var id = req.params.id;
  var todo = req.body;
  res.json({ 'todo': todo, message: 'Todo Updated' });
});

router.delete('/tickets/:id', function(req, res) {
  var id = req.params.id;
  res.json({ message: 'Todo Deleted' });
});

/******************/
/*** Tags Logic ***/
/******************/

router.get('/tags', function(req, res) {
  tags.orderByChild('name').once('value', function(tagSnapshot) {
    res.json(tagSnapshot.val());
  });
});

router.post('/tags', urlencodedParser, function(req, res) {
  var tag = req.body;
  tags.push().set({
    "description": req.body.tagdescription,
    "name": req.body.tagname
  });
  res.redirect(req.get('referer'));
});

router.put('/tags/:id', function(req, res) {
  var id = req.params.id;
  var todo = req.body;
  res.json({ 'tags': tags, message: 'Todo Updated' });
});

router.delete('/tags/:id', function(req, res) {
  var id = req.params.id;
  res.json({ message: 'tag Deleted' });
});

module.exports = router;