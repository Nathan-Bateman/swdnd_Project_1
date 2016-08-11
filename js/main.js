console.log('works');
console.log('works again');
console.log('works thrice');
console.log('test');
console.log('test2');
console.log('test2');



//sign in a user with email and password
firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

//sign out a user
firebase.auth().signOut().then(function() {
  // Sign-out successful. - change the UI
}, function(error) {
  // An error happened.
});

//get currently signed in user
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
  } else {
    // No user is signed in.
  }
});

// function createUser () {
// 	var email = document.getElementById('email-address').value;
//     var password = document.getElementById('password').value;

// 	if (email.length < 1) {
// 		console.log('error');
// 	} 
// 	if (password.length < 1) {
// 		console.log('error');
// 	}
// 	console.log(email);
// 	console.log(password);
// 	//sign in a user with email and password
// 	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
// 	  // Handle Errors here.
// 	  var errorCode = error.code;
// 	  var errorMessage = error.message;
//   	// ...
// 	});
// }

/**
     * Handles the sign up button press.
     */
    function handleSignUp() {
      var email = document.getElementById('email-address').value;
      var password = document.getElementById('password').value;
     
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END createwithemail]
    }