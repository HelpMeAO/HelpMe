'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var firebase = require("firebase-admin");
var Promise = require("promise");
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
var tickets = database.ref("tickets");
var tags = database.ref("tags");
var users = database.ref("users");

// Authentication
var auth = firebase.auth();
var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/****************************/
/** Verification Function(s) **/
/****************************/

function verifyRequest(req, res, callback) {
  /*********************/
  // Req = request header
  // Res = response
  // Location = where we want to send the user to
  /**********************/

  const token = req.cookies.token;

  // Check if token might be correct
  if (token !== undefined && Object.keys(token).length !== 0) {
    // Compare token with firebase
    firebase.auth().verifyIdToken(token)
      // Confirm user is verified and allow him trough
      .then(decodedToken => {
          callback(true);
      })
      // Throw error
      .catch(err => {
          callback(false);
      });
  } else {
      callback(false);
  }

  // Get the token from user's cookies
}

/***********************/
/*** Handle requests ***/
/***********************/


router.get('/tickets', function(req, res) {
  function getTickets(success) {
    if(success) {
      tickets.orderByChild("timeAdded")
      .once("value")
      .then(function(snapshot) {
        res.json(snapshot.val());
      });
    } else {
      res.json("Not authenticated");
    }
  }
  verifyRequest(req,res, getTickets);

});

router.get('/tickets/:id', function(req, res) {
  function getTicket(succes) {
    if(succes) {
      var specificTicket = firebase.database().ref("tickets/" + req.params.id);
      specificTicket.once("value")
      .then(function(snapshot) {
        res.json(snapshot.val());
      });
    } else {
      res.json("Not authenticated");
    }
  }
  verifyRequest(req,res, getTicket);
});

router.post('/tickets', urlencodedParser, function(req, res) {
  function postTickets(succes) {
    if(succes) {
      var ticket = req.body;
      var currentTime = Date.now();
      //Check if user hasn't selected more then 3 tags
      if (ticket.tags.length <= 3) {
        tickets.push().set({
          "description": ticket.description,
          "tags": ticket.tags,
          "student": "99033279",
          "teacher": "",
          "archived": false,
          "timeAdded": currentTime
        }).then(function() {
          res.redirect('../');
        });
      } else {
        console.log("Someone tried to select more then 3 tags");
        res.redirect('../');
      }
    } else {
      res.json("Not authenticated");
    }
  }
  verifyRequest(req,res, postTickets);
});

router.put('/tickets/:id', function(req, res) {
  function putTicket(succes) {
    if(succes) {
      var specificTicket = firebase.database().ref("tickets/" + req.params.id);
      var oldTime = req.body.timeAdded;
      specificTicket.update({
        "description": req.body.description,
        "tags": req.body.tags,
        "student": "99033279",
        "teacher": "",
        "status": true,
        "timeAdded": oldTime
      });
      res.json({ 'Ticket': req.params.id, message: 'Todo Updated' });
    } else {
      res.json("Not authenticated");
    }
  }
  verifyRequest(req,res, putTicket);
});

router.delete('/tickets/:id', function(req, res) {
  function deleteTicket(succes) {
    if(succes) {
      var specificTicket = firebase.database().ref("tickets/" + req.params.id);
      res.json({ message: 'Todo: ' + req.params.id + ' Deleted' });
    } else {
      res.json("Not authenticated");
    }
  }
  verifyRequest(req,res, deleteTicket);
});

/******************/
/*** Tags Logic ***/
/******************/

router.get('/tags', urlencodedParser, function(req, res) {
  function getTags(succes) {
    if(succes) {
      tags.orderByChild("name")
      .once('value')
      .then(function(tagSnapshot) {
        res.json(tagSnapshot.val());
      });
    } else {
      res.json("Not authenticated");
    }
  }
  verifyRequest(req,res, getTags);
});

router.get('/tags/:id', function(req, res) {
  function getTag(succes) {
    if(succes) {
      var specificTag = firebase.database().ref("tags/" + req.params.id);
      specificTag.once("value")
      .then(function(snapshot) {
        var response = {
          key: snapshot.key,
          data: snapshot.val()
        }
        res.json(response);
      });
    } else {
      res.json("Not authenticated");
    }
  }
  verifyRequest(req,res, getTag);
});

router.post('/tags', urlencodedParser, function(req, res) {
  function postTags(succes) {
    if(succes) {
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
    } else {
      res.json("Not authenticated");
    }
  }
  verifyRequest(req,res, postTags);
});

router.put('/tags/:id', urlencodedParser, function(req, res) {
  function postTag(succes) {
    if(succes) {
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
    } else {
      res.json("Not authenticated");
    }
  }
  verifyRequest(req,res, postTag);
});

router.move('/tags/:id', function(req, res) {
  function moveTag(succes) {
    if(succes) {
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
    } else {
      res.json("Not authenticated");
    }
  }
  verifyRequest(req,res, moveTag);
});
router.delete('/tags/:id', function(req, res) {
  function deleteTag(succes) {
    if(succes) {
      var specificTag = firebase.database().ref("tags/" + req.params.id);
      specificTag.remove();
      res.json({ message: 'tag Archieved' });
    } else {
      res.json("Not authenticated");
    }
  }
  verifyRequest(req,res, deleteTag);
});

/*  login   */
router.post('/users', urlencodedParser, function(req, res) {
  var user = req.body;
  console.log(user);
  if(Object.keys(user).length == 3){
    // if(user.email.length > 10){
    //   var nr = user.email.split("@");
    //   firebase.database().ref("users/"+nr[0]).remove();
    // }
  }
  if(Object.keys(user).length == 4){
    var email = user.email;
    var password = user.password;
    var nr = email.split("@");
    users.child(nr[0]).set({
      "name": user.user[0],
      "surname": user.user[1],
      "verified": false
    });
  }
  res.redirect('/');
});

module.exports = router;
