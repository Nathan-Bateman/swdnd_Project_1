//login status and constants for authentication
var status = document.querySelector('#status');
var emailExistDataBase = false;
const existingEmail = document.getElementById('email-address-existing');
const existingPassword = document.getElementById('password-existing');
const userEmail = document.getElementById('email-address');
const userPassword = document.getElementById('password');
const createUser = document.getElementById('submit-account');
const signOut = document.getElementById('log-out');
const signIn = document.getElementById('log-in');
//
$( document ).ready(function() {
//authentication
	const authenticate = firebase.auth();

	firebase.auth().onAuthStateChanged (function(user) {
		if (user) {
			console.log(user.displayName);
			document.querySelector('#status').innerHTML= 'Welcome ' + user.email;
			$('#log-out').removeClass('hide');
			$('#sign-up').addClass('hide');
			document.getElementById('submit-event').disabled = false;

		} else {
			console.log('user not logged in');
			document.querySelector('#status').innerHTML= 'Sign In';
			$('#log-out').addClass('hide');
			$('#sign-up').removeClass('hide');
		}
	});
  //Sign in
	  signIn.addEventListener('click', function () {
	  	var email = existingEmail.value;
	  	var pass = existingPassword.value;
	  	const promise = authenticate.signInWithEmailAndPassword(email,pass);

	  	promise.then(function(user) {
	  		console.log(user);
	  		$('#signIn').modal('hide');
	  		
	  	})
	  	promise.catch(function(e) {
	  		console.log(e.message);
	  		$('#error-space').removeClass('hide');
	  		document.querySelector('.custom-error').innerHTML = '<p>'+ e.message +'</p>';
	  	});

	  });
 //Create an account - Firebase
	createUser.addEventListener("click", function(event) {
		var email = userEmail.value;
		var pass = userPassword.value;
		if (passWord.value === passWordConfirm.value && $('#password-errors').children().length === 0 && document.querySelector('#name').value.length >= 3 ) {
				//get the promise then hide the UI if there is not errors or else show the error if there is
				 const promise = authenticate.createUserWithEmailAndPassword (email,pass);
				 promise.then(function(user){
					$('#signUp').modal('hide');
				 });
				 promise.catch(function(e) {
				 	document.getElementById('create-account-custom-error').innerHTML = '<p>'+ e.message +'</p>';
				 });
		}else {
				//check the fields to show their errors that must be corrected
				checkName();
				checkEmail();
				checkPassword();
				checkMatch();
				///use this to show errors for individual fields	
		}
	});
  //Sign out
	signOut.addEventListener('click', function () {
		authenticate.signOut();
		document.getElementById('submit-event').disabled = true;
	});
  /////
  //beginning the section for validating the sign up existing user interface
  //////
	document.getElementById('create-account-signin').addEventListener('click', function () {
		 $('#signIn').modal('hide');
		 $('#signUp').modal('show');
	});

});

/////
//beginning the section for writing events to firebase DB
//////

const database = firebase.database().ref().child('events');
database.on('value',function(snap){
	var user = firebase.auth().currentUser;
	var events = snap.val();
	if (user != null) {
		var userID = firebase.auth().currentUser.uid;
		for(var i in events) {
			 var event = events[i];
				 var eventName = event.name;
				 var start = event.start;
				 var end = event.end;
				 var eventType = event.eventtype;
				 var host = event.host;
				 var guests = event.guests;
				 var location = events.location;
				 var details = event.details;
				 var userIdPost = event.user;

			if (userID === userIdPost) {
				var eventMarkup = "<div class='event-post'>" +
				"<h5 class='event-title'>" + eventName  + "</h5>" +
				"<h5 class='event-host'>" + host + "</h5>" +
				"<h1 class='event-type'>" + eventType +  "</h1>" +
				"<h2 class='event-location>'" + location + "</h2>" +
				"<h4 class='start'>" + start  +"</h4>" +
				"<h4 class='end'>" + end  + "</h4>" +
				"<p class='details'>" + details  + "</p>" +
				"<p class='guests'>" +   guests   + "</p>" +
				"</div>";
				
				$("#object").append(eventMarkup);
			}
		}
	} else {
//TODO: Break out of this look after the first three posts are posted to DOM
		for (var i in events) {
		  var count = 0
		  count++;
		  console.log(count);
		  if (count === 3) {
		  	break;
		  }
		  var event = events[i];
		  	 var eventName = event.name;
			 var start = event.start;
			 var end = event.end;
			 var eventType = event.eventtype;
			 var host = event.host;
			 var guests = event.guests;
			 var location = events.location;
			 var details = event.details;
		  var eventMarkup = "<div class='event-post'>" +
				"<h5 class='event-title'>" + eventName  + "</h5>" +
				"<h5 class='event-host'>" + host + "</h5>" +
				"<h1 class='event-type'>" + eventType +  "</h1>" +
				"<h2 class='event-location>'" + location + "</h2>" +
				"<h4 class='start'>" + start  +"</h4>" +
				"<h4 class='end'>" + end  + "</h4>" +
				"<p class='details'>" + details  + "</p>" +
				"<p class='guests'>" +   guests   + "</p>" +
				"</div>";
				
			$("#object").append(eventMarkup);
			
		}
	}

});
//write to database
function writeNewPost(name, type, host, start, end, location, guests, details) {
	if (error.length !=0 ) {
		return false;
	} else {
		  var user = firebase.auth().currentUser.uid;
		  console.log(user);
		  // A post entry.
		  var postData = {
		    name: name,
		    eventtype: type,
		    host: host,
		    start: start,
		    end: end,
		    location: location,
		    guests: guests,
		    details: details,
		    user: user
		  };
		//console.log(user);
		  // Get a key for a new Post.
		  var newPostKey = firebase.database().ref().child('events').push().key;

		  // Write the new post's data in the event list
		  var updates = {};
		  updates['/events/' + newPostKey] = postData;
		  return firebase.database().ref().update(updates);
		}
}
/////
//beginning the section for validating the create account interface
//////

//sign up fields
var emailField = $('#email-address');
var nameField = $('#name');
var passWord = document.querySelector('#password');
var passWordConfirm = document.querySelector('#password-confirm');
var employer = $('#employer');
var submitAccount = document.querySelector('#submit-account');
var signUp = $('#signUp');
//create event fields
var eventName = $('#event-name');
var eventType = $('#event-type');
var eventHost = $('#event-host');
var eventStart = $('#event-start');
var eventEnd = $('#event-end');
var eventGuest = $('#event-guest');
var eventLocation = $('#event-location');
var eventInfo = $('#event-info');
var submitEvent = document.querySelector('#submit-event');
var createEvent = $('#create-event');
//progress bar
var steps = 0;
var startWidth = 0;

//error messages
var passWordErrors = $('#password-errors');
var missMatch = '<li>the passwords do not match</li>';
var needSymbol = '<li id="symbols">needs on of these: !,@,#,$,%,^,&,*</li>';
var needNumber = '<li id="number">needs a number</li>';
var needLower = '<li id="lowercase">needs a lowercase letter</li>';
var needUpper = '<li id="uppercase">need an uppercase letter</li>';
var tooFew = '<li id="numchar">need a least 8 characters</li>';
var needsValue = 'This field is required and must have 3 or more alphabetical characters.';
var future = 'Date must be in the future';
var afterStart = 'Date must be after the start date';

//validate the name field - sign up
var error = [];

//array to log the # of times the password field
var active = [];
//check the number of times a field has been active
function countFocus () {
	active.push('count');
}
//Validate the name field
function checkName () {
	var field = document.querySelector('#name').value;
	if (field.length >= 3 && isNaN(field) === true) {
		nameField.tooltip('hide');
	} else {
		nameField.tooltip('show');
	}
}
//Validate the email field
function checkEmail () {
	var field = document.querySelector('#email-address').value;
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(field))
	 {
		emailField.tooltip('hide');
	} else {
		emailField.tooltip('show');
	}
}
//Validate the password
function checkPassword () {
	if (active.length > 0) {
		passWordErrors.append(needUpper);
		$('#password').tooltip('show');
	}
	if ($('#password-errors').children().length >0) {
			$('#password').tooltip('show');

    	if (passWord.value.match(/[\!\@\#\$\%\^\&\*]/g)) {
			$('#password-errors').children('#symbols').remove();
		}
		if (passWord.value.match(/[a-z]/g)) {
			$('#password-errors').children('#lowercase').remove();
		}
		if (passWord.value.match(/[A-Z]/g)) {
	  	 	$('#password-errors').children('#uppercase').remove();
	 	}
	 	if (passWord.value.match(/\d/g)) {
			$('#password-errors').children('#number').remove();
		}
		if (passWord.value.length >7) {
			$('#password-errors').children('#numchar').remove();
		}
		if ($('#password-errors').children().length === 0) {
				$('#password').tooltip('hide');
				return true;
		}
	}  
}
//Make sure the password is the same in the two input fields
function checkMatch (p1, p2) {
	var firstPass = p1.value;
	var secondPass = p2.value;
	if (firstPass != secondPass) {
		$('#password-confirm').tooltip('show');
	} else {
		$('#password-confirm').tooltip('hide');
	}
}
//Test validation and create an account
//TODO: make status ID retain name value after submission and make sign up button disappear
function createAccount() {
	if (passWord.value === passWordConfirm.value && $('#password-errors').children().length === 0 && document.querySelector('#name').value.length >= 3 ) {
		// document.querySelector('#status').innerHTML= 'Welcome ' + nameField.val() + '!';
		// $('#signUp').modal('hide');
	} else {
		return false;	
	}
}
/////
//beginning the section for validating the create event interface
//////
//Create Event Validation
function removeError (errormessage) {
	var index = error.indexOf(errormessage);
	console.log(index);
	if (index != -1) {
		error.splice(index,1);
	}
}

function addError (errormessage) {
	if (error.indexOf(errormessage) === -1) {
		error.push(errormessage);
	}
}

function checkEventName () {
	var field = document.querySelector('#event-name').value;
	var errorMessage = 'eventname';
	if (field.length >= 3 && isNaN(field) === true) {
		eventName.tooltip('hide');
		removeError(errorMessage);
	} else {
		eventName.tooltip('show');
		addError(errorMessage);
		
	}
}
function checkEventHost () {
	var field = document.querySelector('#event-host').value;
	var errorMessage = 'eventhost';
	if (field.length >= 3 && isNaN(field) === true) {
		eventHost.tooltip('hide');
		removeError(errorMessage);
	} else {
		eventHost.tooltip('show');
		addError(errorMessage);
	}
}
//check that the start date is in the future
function checkDate () {
	var startField = document.querySelector('#event-start').value;
	var errorMessage = 'date1';
	var startDate  = new Date(startField);
	var localTime = startDate.getTimezoneOffset() * 60000;
	var startDate = Date.parse(startDate) + localTime;
	var now = Date.now();
	if(now >= startDate) {
		eventStart.tooltip('show');
		addError(errorMessage);
	} else {
		eventStart.tooltip('hide');
		removeError(errorMessage);
	}
}
//Compare the end and start dates to confirm the end date is after the start date
function compareDates () {
	var startDate = new Date(document.querySelector('#event-start').value);
	var errorMessage = 'date2';
	var endDate = new Date(document.querySelector('#event-end').value);
		if (startDate >= endDate) {
			eventEnd.tooltip('show');
			addError(errorMessage);
		} else {
			eventEnd.tooltip('hide');
			removeError(errorMessage);
		}
}

function checkGuests () {
	var field = document.querySelector('#event-guest').value;
	var errorMessage = 'eventguests';
	if (field.length >= 3 && isNaN(field) === true) {
		eventGuest.tooltip('hide');
		removeError(errorMessage);
	} else {
		eventGuest.tooltip('show');
		addError(errorMessage);
	}
}
function initAutocomplete() {
	autocomplete = new google.maps.places.Autocomplete(
	    /** @type {!HTMLInputElement} */(document.getElementById('event-location')),
	    {types: ['geocode']});
}
function geolocate() {
	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(function(position) {
	    var geolocation = {
	      lat: position.coords.latitude,
	      lng: position.coords.longitude
	    };
	    var circle = new google.maps.Circle({
	      center: geolocation,
	      radius: position.coords.accuracy
	    });
	    autocomplete.setBounds(circle.getBounds());
	  });
	}
}
//event not able to be created without the requirements - if there are any errors in the array
 function createMeeting() {
	if (error.length !=0 ) {
		return false;
	} else {

	}
}
/////
//beginning the section for setting up the tooltips
//////

//Tooltips section - initialize tool tips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
//create account tooltips options
nameField.tooltip({
    title: needsValue,
    effect: 'toggle'
});

emailField.tooltip({
    title: 'must be a valid email'
});

$('#password').tooltip({
	html: true,
    title: '<ul id="password-errors">'+ needSymbol + needUpper + needLower + needNumber + tooFew +'</ul>'
});

$('#password-confirm').tooltip({
	html: true,
    title: missMatch
});
//create event tooltips
eventName.tooltip({
	title: needsValue,
	effect: 'toggle'
});
eventHost.tooltip({
	title: needsValue,
	effect: 'toggle'
});
eventStart.tooltip({
	title: future,
	effect: 'toggle'
});
eventEnd.tooltip({
	title: afterStart,
	effect: 'toggle'
});
eventGuest.tooltip({
	title: needsValue,
	effect: 'toggle'
});
//Stop tooltips from showing on modal close
signUp.on('hidden.bs.modal', function () {
    $('[data-toggle="tooltip"]').tooltip('hide');
})
signUp.on('show.bs.modal', function () {
    $('[data-toggle="tooltip"]').tooltip('show');
})
createEvent.on('hidden.bs.modal', function () {
    $('[data-toggle="tooltip"]').tooltip('hide');
})
createEvent.on('show.bs.modal', function () {
    $('[data-toggle="tooltip"]').tooltip('show');
})




