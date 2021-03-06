var config = {
  apiKey: " AIzaSyBAnXUSdhRfCRV8-fi0CTTeuqrZOg06u9M",
  authDomain: "ticketmastertest-110a9.firebaseapp.com",
  databaseURL: "https://ticketmastertest-110a9.firebaseio.com"
};
firebase.initializeApp(config);
(function () {

//Get Elements
var btnLogout = document.getElementById('btnLogout');

var auth = firebase.auth()
btnLogout.addEventListener('click', e=> {
  unsetAppCookie();
	firebase.auth().signOut();
	console.log("signed Out");
});

//Add a realtime listener
// remove or add hide class for logout button
firebase.auth().onAuthStateChanged(firebaseUser => {
	if (firebaseUser){
		console.log("signed in");
		btnLogout.classList.remove("hide");
    // user is logged in
    setAppCookie();
    // Reset cookie before hour expires, fb token only lasts an hour
    setInterval(setAppCookie, 3500);
	} else {
		console.log("not logged in");
		btnLogout.classList.add("hide");
    unsetAppCookie();
		window.location.replace("/login");
	}
});

const setAppCookie = () => firebase.auth().currentUser &&
    firebase.auth().currentUser.getIdToken().then(token => {
        Cookies.set('token', token, {
            domain: window.location.hostname,
            expire: 1 / 24, // One hour
            path: '/',
            secure: false // If served over HTTPS
        });
    });

const unsetAppCookie = () =>
    Cookies.remove('token', {
        domain: window.location.hostname,
        path: '/',
    });

}());
