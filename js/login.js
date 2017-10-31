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
function setAppCookie(email, firstName, lastName, register) {
	console.log("setting cookie");
	firebase.auth().currentUser &&
		firebase.auth().currentUser.getIdToken().then(function(token) {
		    Cookies.set('token', token);
				if(email !== undefined && firstName !== undefined && lastName!== undefined && register == true) {
					var request = $.ajax({
					    url: "/api/users",
							datatype: "json",
					    type: "POST",
					    data: {
								"email": email,
								"firstName": firstName,
								"lastName": lastName,
								"teacher": false,
								"active": true
							}
					});
					request.done(function(data) {
						window.location.replace("/");
					});
					request.fail(function(jqXHR, textStatus) {
						alert(jqXHR);
						alert(textStatus);
					});
				} else {
					window.location.replace("/");
				}
		});
}

// Remove App Cookie
function unsetAppCookie() {
	Cookies.remove('token', {
	    domain: window.location.hostname,
	    path: '/'
	});
}

// Add login event

btnLogin.addEventListener('click', e=> {
	//Get email and pass
	var email = txtEmail.value;
	var pass = txtPassword.value;
	var auth = firebase.auth();
	//Sign in
	var promise = auth.signInWithEmailAndPassword(email,pass)
	.then(function(firebaseUser) {
	   // Success
	 	setAppCookie();
	})
  .catch(function(error) {
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
	btnSignup.disabled = true;
	//Get email and pass
	var auth = firebase.auth();
	var email = txtEmailR.value;
	var pass = txtPasswordR.value;
	var firstName = txtFirstname.value;
	var lastName = txtLastname.value;

	//Sign in
	var promise = auth.createUserWithEmailAndPassword(email,pass).then(function(firebaseUser) {
    var user = firebase.auth().currentUser;
		//set displayname
		firebaseUser.updateProfile({
			"email": email,
			"firstName": firstName,
			"lastName": lastName,
			"teacher": false,
			"active": true
		}).then(function() {
			setAppCookie(email, firstName, lastName, true);
		}), function(error) {
			// An error happened.
				if (error.code == "auth/weak-password") {
					error_bar_s.classList.remove("hide");
					document.getElementById("error_text_s").innerHTML = "Wachtwoord is te zwak, Het moet uit minimaal 6 karakters bestaan";
				} else if (error.code == "auth/user-not-found") {
					error_bar_s.classList.remove("hide");
					document.getElementById("error_text_s").innerHTML = "Deze gebruiker bestaat niet";
				} else if (error.code == "auth/invalid-email") {
					error_bar_s.classList.remove("hide");
					document.getElementById("error_text_s").innerHTML = "Het email adres is onjuist";
				}
			}
		});
});

//Logout
btnLogout.addEventListener('click', e=> {
	// Delete cookie, and log out from Firebase
	unsetAppCookie();
	firebase.auth().signOut();
});

});
