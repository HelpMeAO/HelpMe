'use strict';

var express = require('express');

var router = express.Router();

router.get("/", function(req,res) {
  res.sendFile(__dirname + "/queue.html");
});

// Redirect to default index page
router.get("/create", function(req,res) {
  res.sendFile(__dirname + "/create.html");
});

// Rederict to the tags page
router.get("/tags", function(req, res) {
	res.sendFile(__dirname + "/tags.html");
});

module.exports = router;
