$( document ).ready(function () {
//Get elements
var txtEmail = document.getElementById('txtEmail');
var txtPassword = document.getElementById('txtPassword');
var txtUser = document.getElementById('txtUser');
var btnLogin = document.getElementById('btnLogin');
var btnSignup = document.getElementById('btnSignup');
var btnLogout = document.getElementById('btnLogout');

var txtFirstname = document.getElementById("txtFirstname");
var txtLastname = document.getElementById("txtLastname");
var txtEmailR = document.getElementById('txtEmailR');
var txtPasswordR = document.getElementById('txtPasswordR');

var error_bar = document.getElementById("error_bar");
var error_bar_s = document.getElementById("error_bar_s");

/***************/
/** Functions **/
/***************/


// Set App Cookie
function setAppCookie() {
	console.log("setting cookie");
	firebase.auth().currentUser &&
		firebase.auth().currentUser.getIdToken().then(function(token) {
		    console.log(Cookies.set('token', token));
				console.log("getting cookies: " + Cookies.get("token"));
		});
}

// Remove App Cookie
function unsetAppCookie() {
	Cookies.remove('token', {
	    domain: window.location.hostname,
	    path: '/',
	});
}

// Add login event

btnLogin.addEventListener('click', e=> {
	//Get email and pass
	var email = txtEmail.value;
	var pass = txtPassword.value;
	var auth = firebase.auth();
	//Sign in
	var promise = auth.signInWithEmailAndPassword(email,pass).catch(function(error){
		// An error happened.
		console.log(error.code, e.code);
		if (error.code == "auth/wrong-password"){
  		// alert("Wachtwoord is onjuist");
  		error_bar.classList.remove("hide");
  		document.getElementById("error_text").innerHTML = "Wachtwoord is onjuist";
  	}else if (error.code == "auth/user-not-found"){
  		// alert("Deze gebruiker bestaat niet");
  		error_bar.classList.remove("hide");
  		document.getElementById("error_text").innerHTML = "Deze gebruiker bestaat niet";
  	}else if (error.code == "auth/invalid-email"){
  		// alert("Het email adres is onjuist");
  		error_bar.classList.remove("hide");
  		document.getElementById("error_text").innerHTML = "Het email adres is onjuist";
  	}
	});
});

btnSignup.addEventListener('click', e=> {
	//Get email and pass
	var email = txtEmailR.value;
	var pass = txtPasswordR.value;
	var auth = firebase.auth()

	//Sign in
	var promise = auth.createUserWithEmailAndPassword(email,pass).catch(function(error){
  	// An error happened.
  	console.log(error.code, e.code);
  	if (error.code == "auth/weak-password"){
  		error_bar_s.classList.remove("hide");
  		document.getElementById("error_text_s").innerHTML = "Wachtwoord is te zwak, Het moet uit minimaal 6 karakters bestaan";
  	}else if (error.code == "auth/user-not-found"){
  		error_bar_s.classList.remove("hide");
  		document.getElementById("error_text").innerHTML = "Deze gebruiker bestaat niet";
  	}else if (error.code == "auth/invalid-email"){
  		error_bar_s.classList.remove("hide");
  		document.getElementById("error_text").innerHTML = "Het email adres is onjuist";
  	}
	});
});

//Logout
btnLogout.addEventListener('click', e=> {
	unsetAppCookie();
	firebase.auth().signOut();
	console.log("signed Out");
});

//Add a realtime listener
// remove or add hide class for logout button
firebase.auth().onAuthStateChanged(firebaseUser => {
	if (firebaseUser){
    // user is logged in
		console.log("user is logged in");
    setAppCookie();
		btnLogout.classList.remove("hide");

		var Firstname = txtFirstname.value;
		var Lastname = txtLastname.value;
		var name = "";
		name += "" + Firstname + " " + Lastname + "";


		//set displayname

		firebaseUser.updateProfile({
      displayName: name
  	}).then(function() {
    	// Update successful.
  	}, function(error) {
    	// An error happened.
  	});

		firebaseUser.displayname = name;
		//window.location.replace("/");
	}else{
		console.log("not logged in");
		btnLogout.classList.add("hide");
		console.log("deleting cookie, if excists");
		unsetAppCookie();
	}
});

});
