'use strict';

var express = require('express');

var router = express.Router();

router.get("/", function(req,res) {
  res.sendFile(__dirname + "/index.html");
});

// Redirect to default index page
router.get("/wachtrij", function(req,res) {
  res.sendFile(__dirname + "/Queue.html");
});

// Rederict to the tags page
router.get("/tags", function(req, res) {
	res.sendFile(__dirname + "/tags.html");
});

module.exports = router;
