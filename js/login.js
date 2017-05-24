(function () {
//Login
var firebase = require("firebase-admin");
var serviceAccount = require('../../ticketmastertest-110a9-firebase-adminsdk-g3hru-c3393e383b.json');

// Add the single-sign-on Router
// var auth = require("./routes/auth");

/**********************/
/*** Firebase Logic ***/
/**********************/


// Initialize Firebase
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  authDomain: "ticketmastertest-110a9.firebaseapp.com",
  databaseURL: "https://ticketmastertest-110a9.firebaseio.com"
});

//Get elements

var txtEmail = document.getElementById('txtEmail');
var txtPassword = document.getElementById('txtPassword');
var btnLogin = document.getElementById('btnLogin');
var btnSignUp = document.getElementById('btnSignUp');
var btnLogout = document.getElementById('btnLogout');


// Add login event

btnLogin.addEventListener('click', e=> {
	//Get email and pass
	var email = txtEmail.value;
	var pass = txtPassword.value;
	var auth = firebase.auth()
	//Sign in
	var promise = auth.signIWithEmailAndPassword(email,pass);
	promise.catch(e => console.log(e.message));
});

//Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
	if (firebaseUser){
		console.log(firebaseUser);
	}else{
		console.log("not logged in");
	}
});

}());