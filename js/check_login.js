var config = {
    apiKey: " AIzaSyBAnXUSdhRfCRV8-fi0CTTeuqrZOg06u9M",
    authDomain: "ticketmastertest-110a9.firebaseapp.com",
    databaseURL: "https://ticketmastertest-110a9.firebaseio.com",
  };
firebase.initializeApp(config);
(function () {

//Get Elements
var btnLogout = document.getElementById('btnLogout');

var auth = firebase.auth()
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