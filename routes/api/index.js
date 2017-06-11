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
  authDomain: "ticketmastertest-110a9.firebaseapp.com",
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

router.get('/tags', urlencodedParser, function(req, res) {
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
  if(tag.tagTest){
    tags.push().set({
      "description": tag.tagDescription,
      "name": tag.tagName,
      "active": true,
      "test": tag.tagTest
    });
  }
  else{
    tags.push().set({
      "description": tag.tagDescription,
      "name": tag.tagName,
      "active": true,
    });
  }
  res.redirect(req.get('referer'));
});

router.post('/tags/:id', urlencodedParser, function(req, res) {
  var specificTag = firebase.database().ref("tags/" + req.params.id);
  var tag = req.body;
  specificTag.once("value")
  .then(function(snapshot) {
    var active = snapshot.val().active;
    if(active == true){
      if(tag.tagTest){
        specificTag.update({
          "description": tag.tagDescription,
          "name": tag.tagName,
          "test": tag.tagTest 
        });
      }
      else{
        specificTag.update({
          "description": tag.tagDescription,
          "name": tag.tagName
        });
        specificTag.child("test").remove();
      }
    }
  });
  res.redirect(req.get('referer'));
});

router.move('/tags/:id', function(req, res) {
  var specificTag = firebase.database().ref("tags/" + req.params.id);
  specificTag.once("value")
  .then(function(snapshot) {
    var name = snapshot.val().name;
    var description = snapshot.val().description;
    var active = snapshot.val().active;
    var test = snapshot.val().test;
    if(active == true){
      if(test){
        specificTag.update({
          "description": description,
          "name": name,
          "active": false,
          "test" : test
        });
      }
      else{
        specificTag.update({
          "description": description,
          "name": name,
          "active": false,
        });
      }
    }
    else{
      if(test){
        specificTag.update({
          "description": description,
          "name": name,
          "active": true,
          "test" : test
        });
      }
      else{
        specificTag.update({
          "description": description,
          "name": name,
          "active": true,
        });
      }
    }
  });
  res.json({ message: 'tag Archieved' });
});
router.delete('/tags/:id', function(req, res) {
  var specificTag = firebase.database().ref("tags/" + req.params.id);
  specificTag.remove();
 res.json({ message: 'tag Archieved' });
});

module.exports = router;
