'use strict';

var express = require('express');
var cookieParser = require('cookie-parser');
var firebase = require("firebase-admin");
var serviceAccount = require('../../ticketmastertest-110a9-firebase-adminsdk-g3hru-c3393e383b.json');
var router = express.Router();
var app = express();


/****************************/
/** Verification Functions **/
/****************************/

function verifyTeacher(req, res, location) {
  /*********************/
  // Req = request header
  // Res = response
  // Location = where we want to send the user to
  /**********************/

  // Get the token from user's cookies
  const token = req.cookies.token;

  // Check if token excist but isn't setup correctly
  if ((token == undefined || Object.keys(token).length === 0) && (req.path != "/login")) {
    res.redirect("/login");
  // Check if token doesn't excist and we're already on the login page.
  } else if (token == undefined && req.path == "/login") {
    res.sendFile(__dirname + req.path + ".html");
  }
  // Check if token might be correct
  if (token !== undefined && Object.keys(token).length !== 0) {
    // Compare token with firebase
    firebase.auth().verifyIdToken(token)
      // Confirm user is verified and allow him trough
      .then(decodedToken => {
        var user = firebase.database().ref('users/' + decodedToken.uid);
        user.once('value').then(function(snapshot){
          if(snapshot.val() == null) {
            var teacher = false;
          } else {
            var teacher = snapshot.val().teacher;
          }

          if(teacher == true || teacher == "true") {
            const uid = decodedToken.sub;
            res.sendFile(__dirname + location);
          } else {
            res.redirect("/");
          }
        });
      })
      // Throw error
      .catch(err => {
          console.error('WARNING token invalid or user not found', err);
          res.clearCookie("token");
          res.redirect("/login");
      });
  }
}

function verifyRequest(req, res, location) {
  /*********************/
  // Req = request header
  // Res = response
  // Location = where we want to send the user to
  /**********************/

  // Get the token from user's cookies
  const token = req.cookies.token;

  // Check if token excist but isn't setup correctly
  if ((token == undefined || Object.keys(token).length === 0) && (req.path != "/login")) {
    res.redirect("/login");
  // Check if token doesn't excist and we're already on the login page.
  } else if (token == undefined && req.path == "/login") {
    res.sendFile(__dirname + req.path + ".html");
  }
  // Check if token might be correct
  if (token !== undefined && Object.keys(token).length !== 0) {
    // Compare token with firebase
    firebase.auth().verifyIdToken(token)
      // Confirm user is verified and allow him trough
      .then(decodedToken => {
          const uid = decodedToken.sub;
          var user = firebase.database().ref('users/' + decodedToken.uid);
          user.once('value').then(function(snapshot){
            var active = snapshot.val().active;
            if(active == true || active == "true" ) {
              res.sendFile(__dirname + location);
            } else {
              res.clearCookie("token");
              res.redirect("/login");
            }
          });
      })
      // Throw error
      .catch(err => {
          console.error('WARNING token invalid or user not found', err);
          res.clearCookie("token");
          res.redirect("/login");
      });
  }
}

/*************************/
/** Handle get requests **/
/*************************/

router.get("/", function(req,res) {
  verifyRequest(req,res,"/Queue.html");
});

router.get("/create", function(req,res) {
  verifyRequest(req,res,"/create.html");
});

router.get("/tags", function(req, res) {
  verifyTeacher(req,res,"/tags.html");
});

router.get("/users", function(req, res) {
  verifyTeacher(req,res,"/users.html");
});

router.get("/addtag", function(req, res) {
  verifyRequest(req,res,"/addtag.html");
});

router.get("/login", function(req, res) {
  verifyRequest(req,res,"/login.html");
});

// Export the router
module.exports = router;
