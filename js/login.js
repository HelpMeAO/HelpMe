(function () {
//Login


//Get elements

var txtEmail = document.getElementById('txtEmail');
var txtPassword = document.getElementById('txtPassword');
var btnLogin = document.getElementById('btnLogin');
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
	}else{
		console.log("not logged in");
		btnLogout.classList.add("hide");
	}
});

}());