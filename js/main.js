//sign up field
var emailField = $('#email-address');
var nameField = $('#name');
var passWord = document.querySelector('#password');
var passWordConfirm = document.querySelector('#password-confirm');
var employer = $('#employer');
var submitAccount = $('#submit-account');
var signUp = $('#signUp');

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
var needsValue = 'The name field is required and must have 3 or more alphabetical characters.';

//validate the name field - sign up
var error = [];
//array to log the # of times the password field
var active = [];
function countFocus () {
	active.push('count');
}
function checkName () {
	var field = document.querySelector('#name').value;
	if (field.length >= 3 && isNaN(field) === true) {
		nameField.tooltip('hide');
	} else {
		nameField.tooltip('show');
	}
}
//TODO: Get email form validation to work
function checkEmail () {
	var field = document.querySelector('#email-address').value;
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(field))
	 {
		emailField.tooltip('hide');
	} else {
		emailField.tooltip('show');
	}
}
//TODO: Fix logic for password validation
function checkPassword () {
	if (active.length > 0) {
		passWordErrors.append(needUpper);
		$('#password').tooltip('show');
	}
	if (passWordErrors.children().length >0) {
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
		}
	}  
}
//stop tooltips from showing on modal close
signUp.on('hidden.bs.modal', function () {
    $('[data-toggle="tooltip"]').tooltip('hide');
})
signUp.on('show.bs.modal', function () {
    $('[data-toggle="tooltip"]').tooltip('show');
})

function checkMatch (p1, p2) {

	var firstPass = p1.value;
	var secondPass = p2.value;

	if (firstPass != secondPass) {
		error.push(missMatch);
		passWordConfirm.tooltip('show');
		console.log(missMatch);
	} else {
		passWordConfirm.tooltip('hide');
		console.log('match');
	}
}
//initialize tool tips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

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
// Progress Bar Here