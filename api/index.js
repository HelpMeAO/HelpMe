'use strict';

var express = require('express');

var router = express.Router();

router.get('/todos', function(req, res) {
});

router.post('/todos', function(req, res) {
  var todo = req.body;
});

router.put('/todos/:id', function(req, res) {
  var id = req.params.id;
  var todo = req.body;
  res.json({ 'todo': todo, message: 'Todo Updated' });
});

router.delete('/todos/:id', function(req, res) {
  var id = req.params.id;
  res.json({ message: 'Todo Deleted' });
});

module.exports = router;
