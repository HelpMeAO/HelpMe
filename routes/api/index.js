'use strict';

var express = require('express');

var router = express.Router();

/*** Tickets Logic ***/

router.get('/tickets', function(req, res) {
  res.json({message: "LIST"});
});

router.post('/tickets', function(req, res) {
  var todo = req.body;
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

/*** Tags Logic ***/

router.get('/tags', function(req, res) {
  res.json({tags: ["Node.js", "JavaScript", "HTML", "CSS"]});
});

router.post('/tags', function(req, res) {
  res.json({message: "tag successfully added"});
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
