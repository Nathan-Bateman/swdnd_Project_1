//login status
var status = document.querySelector('#status');

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
var future = 'Time must be in the future';

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
	if (passWord.value === passWordConfirm.value && $('#password-errors').children().length === 0) {
		document.querySelector('#status').innerHTML= 'nameField';
	} else {
		return false;
	}
}
//Create Event Validation
function checkEventName () {
	var field = document.querySelector('#event-name').value;
	if (field.length >= 3 && isNaN(field) === true) {
		eventName.tooltip('hide');
	} else {
		eventName.tooltip('show');
	}
}
function checkEventHost () {
	var field = document.querySelector('#event-host').value;
	if (field.length >= 3 && isNaN(field) === true) {
		eventHost.tooltip('hide');
	} else {
		eventHost.tooltip('show');
	}
}
function checkStartDate () {
	var startField  = document.querySelector('#event-start').value;
	console.log(startField);
	var now = Date.now();
	// if(now >= startField) {
	// 	eventStart.tooltip('show');
	// } else {
	// 	eventStart.tooltip('hide');
	// }
}
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
// Progress Bar Here