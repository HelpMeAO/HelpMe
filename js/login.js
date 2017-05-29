(function () {
//Login


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
	var promise = auth.signInWithEmailAndPassword(email,pass);
	promise.catch(e => console.log(e.message));
});

//Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
	if (firebaseUser){
		console.log(firebaseUser);
		console.log("signed in");
	}else{
		console.log("not logged in");
	}
});

}());