'use strict';

var express = require('express');
var admin = require("firebase-admin");
var serviceAccount = require('../../ticketmastertest-110a9-firebase-adminsdk-g3hru-c3393e383b.json');
var firebase = require('firebase'); 
var bodyParser = require('body-parser');



var config = {
	apiKey: " AIzaSyBAnXUSdhRfCRV8-fi0CTTeuqrZOg06u9M",
	authDomain: "ticketmastertest-110a9.firebaseapp.com",
	databaseURL: "https://ticketmastertest-110a9.firebaseio.com",
};

firebase.initializeApp(config);

var router = express.Router();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/register', urlencodedParser, function(req, res){
	var user = req.body;
	console.log(user);
	var name = user.firstName + " " + user.lastName;
	admin.auth().createUser({
		email: user.email,
		emailVerified: false,
		displayName: name,
		password: user.pass
	}).then(function(userRecord){
		console.log("Successfully created new user:", userRecord.uid);
		res.status(201).json(userRecord);
	}).catch(function( error ) {
		console.log("Error creating new user:", error);
		res.status(412).json(error);
	});
});

router.post('/login', urlencodedParser, function(req, res){

	// var temp = Object.create(firebase);

	var user = req.body;
	firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(function(firebaseUser){
		if(firebaseUser) {
			firebaseUser.getIdToken().then(function(token){
				res.json({error: null, token: token, firebaseUser: firebaseUser});
			});
		}
	}).catch(function(err){
		res.json({error: err, firebaseUser: null});
	});
});

router.get('/test', function(req, res) {
	var user = firebase.auth();
	user.signInWithEmailAndPassword("tester@test.nl", "test123");
	user.onAuthStateChanged(firebaseUser => {
		console.log(firebaseUser.uid);
	})
})

module.exports = router;