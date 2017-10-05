'use strict';

var express = require('express');
var cookieParser = require('cookie-parser');
var firebase = require("firebase-admin");
var serviceAccount = require('../../ticketmastertest-110a9-firebase-adminsdk-g3hru-c3393e383b.json');
var router = express.Router();


/****************************/
/** Verification Functions **/
/****************************/

function verifyRequest(req, res, location) {
  const token = req.cookies.token;
  // Check if token excists
  if (Object.keys(token).length === 0 && req.path != "/login") {
    console.log("Token is undefined, going back to log-in page");
    res.redirect("/login");
  } else if (Object.keys(token).length === 0 && req.path == "/login") {
    console.log("Token undefined, Sending log-inpage");
    res.sendFile(__dirname + req.path + ".html");
  }
  if (Object.keys(token).length !== 0) {
    firebase.auth().verifyIdToken(token)
      .then(decodedToken => {
          const uid = decodedToken.sub;
          res.sendFile(__dirname + location);
      })
      .catch(err => {
          console.error('WARNING token invalid or user not found', err);
          res.clearCookie("token");
          res.redirect("/login");
      });
  }
}

/************************/
/** res.send functions **/
/************************/

// Redirect to
router.get("/", function(req,res) {
  verifyRequest(req,res,"/Queue.html");
});

// Redirect to create ticket page
router.get("/create", function(req,res) {
  verifyRequest(req,res,"/create.html");
});

// Rederict to the tags page
router.get("/tags", function(req, res) {
  verifyRequest(req,res,"/tags.html");
});

router.get("/addtag", function(req, res) {
  verifyRequest(req,res,"/addtag.html");
});

router.get("/login", function(req, res) {
  verifyRequest(req,res,"/login.html");
});

module.exports = router;
