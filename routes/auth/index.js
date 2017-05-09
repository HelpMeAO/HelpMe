var express = require('express');
var daVinciAuth = require('../modules/daVinciAuth');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/account', daVinciAuth.middleware, function (req, res) {
  res.render('account', { user: req.daVinciAuthUser });
});

router.get('/loginCallback', function (req, res) {
  daVinciAuth.login(req, res);
});

router.get('/logout', function (req, res) {
  daVinciAuth.logout(req, res);
  res.redirect('/');
});

module.exports = router;