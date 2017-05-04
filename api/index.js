'use strict';

var express = require('express');

var router = express.Router();

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

module.exports = router;
