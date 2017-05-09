'use strict';

var express = require('express');

var router = express.Router();

router.get("/", function(req,res) {
  res.sendFile(__dirname + "/index.html");
})

// Redirect to default index page
router.get("/wachtrij", function(req,res) {
  res.sendFile(__dirname + "/Queue.html");
})

module.exports = router;
