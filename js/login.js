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
function setAppCookie(token) {
	Cookies.set('token', token, {
      domain: window.location.hostname,
      expire: 1 / 24, // One hour
      path: '/',
      secure: false // If served over HTTPS
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

  //Sign in
  $.ajax({
    url: "auth/login",
    method: "post",
    data: {email: email, password: pass},
    dataType: "JSON"
  }).done(function(data) {
    var error = data.error;
    var token = data.token;
    var firebaseUser = data.firebaseUser;

    if(error) {
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
    } else {
      console.log(token);
      setAppCookie(token);
      localStorage.setItem('firebase:authUser: AIzaSyBAnXUSdhRfCRV8-fi0CTTeuqrZOg06u9M:[DEFAULT]', JSON.stringify(firebaseUser));
      btnLogout.classList.remove("hide");
      window.location.replace("/");
    }
  });
});

btnSignup.addEventListener('click', e=> {
  var email = txtEmailR.value;
  var pass = txtPasswordR.value;
  var firstName = txtFirstname.value;
  var lastName = txtLastname.value;

  $.ajax({
    method: "POST",
    url: "auth/register",
    data: {email: email, pass: pass, firstName: firstName, lastName: lastName },
    dataType: "JSON",
    success: function() {
      window.location.replace("/login");
    },
    error: function(data) {
      var error = data.responseJSON;
      console.log(error.code);
      if (error.code == "auth/weak-password"){
            error_bar_s.classList.remove("hide");
            document.getElementById("error_text_s").innerHTML = "Wachtwoord is te zwak, Het moet uit minimaal 6 karakters bestaan";
          }else if (error.code == "auth/invalid-email"){
            error_bar_s.classList.remove("hide");
            document.getElementById("error_text_s").innerHTML = "Het email adres is onjuist";
          }else if (error.code == "auth/email-already-exists"){
                error_bar_s.classList.remove("hide");
                document.getElementById("error_text_s").innerHTML = "Het email adres is al in gebruik";
            } else {
              error_bar_s.classList.remove("hide");
              document.getElementById("error_text_s").innerHTML = error.message
            }
    }
  });
});

//Logout
btnLogout.addEventListener('click', e=> {
	unsetAppCookie();
	firebase.auth().signOut();
	console.log("signed Out");
});
function createSignInCookie(firebaseUser) {
  if (firebaseUser){
    // user is logged in
    console.log("user is logged in");
    // set the cookie to the id token
    Cookies.set('token', token);
    // set the local storage to the firebaseUser
    localStorage.setItem('firebase:authUser: AIzaSyBAnXUSdhRfCRV8-fi0CTTeuqrZOg06u9M:[DEFAULT]', JSON.stringify(firebaseUser));
    btnLogout.classList.remove("hide");
    window.location.replace("/");
    
 }else{
    console.log("not logged in");
    btnLogout.classList.add("hide");
    console.log("deleting cookie, if excists");
    unsetAppCookie();
 }
}

});
