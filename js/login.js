(function () {
//Login


//Get elements

var txtEmail = document.getElementById('txtEmail');
var txtPassword = document.getElementById('txtPassword');
var txtUser = document.getElementById('txtUser');
var btnLogin = document.getElementById('btnLogin');
var btnSignup = document.getElementById('btnSignup');
var btnLogout = document.getElementById('btnLogout'); 

var txtFirstname = document.getElementById("txtFirstname");
var txtLastname = document.getElementById("txtLastname");
var txtEmail = document.getElementById('txtEmailR');
var txtPassword = document.getElementById('txtPasswordR');


// Add login event

btnLogin.addEventListener('click', e=> {
	//Get email and pass
	var email = txtEmail.value;
	var pass = txtPassword.value;
	var auth = firebase.auth()
	//Sign in
	var promise = auth.signInWithEmailAndPassword(email,pass);
	promise.catch(e => console.log(e.message));

	
});

btnSignup.addEventListener('click', e=> {
	//Get email and pass
	var email = txtEmailR.value;
	var pass = txtPasswordR.value;
	var auth = firebase.auth()
	//Sign in
	var promise = auth.createUserWithEmailAndPassword(email,pass);
	promise.catch(e => console.log(e.message));

// 	function(error){
// 	switch (error.message){
//     	case "INVALID_PASSWORD":
//         	$scope.message = "Email of wachtwoord is onjuist"
//         	break;
//         case "USER_DOES_NOT_EXIST":
//         	$scope.message = "Deze gebruiker bestaat niet"
//         	break;
//         case "EMAIL_TAKEN":
//         	$scope.message = "Dit Email adres is al in gebruik"
//         	break;
//         case "INVALID_EMAIL":
//         	$scope.message = "Email of wachtwoord is onjuist"
//         	break;
//        // etc
//   	}
// }

	


});

// //Custom error


//Logout
btnLogout.addEventListener('click', e=> {
	firebase.auth().signOut();
	console.log("signed Out");
});

//Add a realtime listener
// remove or add hide class for logout button
firebase.auth().onAuthStateChanged(firebaseUser => {
	if (firebaseUser){
		console.log(firebaseUser);
		console.log("signed in");
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
    	console.log(firebaseUser);
  console.log(name);
  firebaseUser.displayname = name;

		console.log(firebaseUser.displayName);
		// window.location.replace("/tags");
	}else{
		console.log("not logged in");
		btnLogout.classList.add("hide");
	}
});

}());