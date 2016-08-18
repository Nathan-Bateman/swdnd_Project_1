console.log('works');
console.log('works again');

//sign up field
var emailField = document.querySelector('#email-address');
var nameField = document.querySelector('#name');
var passWord = document.querySelector('#password');
var passWordConfirm = document.querySelector('#password-confirm');
var employer = document.querySelector('#employer');
var submitAccount = document.querySelector('#submit-account');

var steps = 0;
var startWidth = 0;

//error messages
var missMatch = 'the passwords do not match ';
var needSymbol = 'the passwords do not have one of the required symbols: !,@,#,$,%,^,&,*';
var needNumber = 'the passwords must contain a number ';
var needLower = 'the passwords must contain a lowercase letter ';
var needUpper = 'the passwords must contain a uppercase letter ';
var illegal = 'the passwords entered contains illegal characters ';
var tooMany = 'the passwords must not contain more than 100 characters ';
var tooFew = 'the passwords must contain at least 16 characters ';
var needsValue = 'The name field is required and must have 3 or more alphabetical characters.';

/*
You might find you want to use RegEx. As this quiz is about setCustomValidity
and not RegEx, here are some RegEx patterns you might find useful:

match one of the required symbols: /[\!\@\#\$\%\^\&\*]/g
match a number: /[0-9]/g or /\d/g
match a lowercase letter: /[a-z]/g
match an uppercase letter: /[A-Z]/g
match a character that isn't allowed in this password: /[^A-z0-9\!\@\#\$\%\^\&\*]/g
 */
//validate the name field - sign up
var error = [];
function checkName () {
	var field = document.querySelector('#name').value;
	if (field.length > 3 && isNaN(field) === true) {
		$('#name').tooltip('hide');
		console.log('good');
	} else {
		$('#name').tooltip('show');
		error.push(needsValue);
		console.log(needsValue);
	}
}
function checkPassword () {
	
	if (passWord.value.match(/[\!\@\#\$\%\^\&\*]/g) === null) {
		// firstPasswordInput.setCustomValidity('the passwords do not have the required symbol');
		error.push(needSymbol);
		console.log(needSymbol);
	}
	if (passWord.value.match(/[a-z]/g) === null) {
		error.push(needLower);
		// console.log(needLower);
	}
	if (passWord.value.match(/[A-Z]/g) === null) {
		error.push(needUpper);
		// console.log(needUpper);
	}
	if (passWord.value.match(/\d/g) === null) {
		error.push(needNumber);
		// console.log(needNumber);
	}
	if (error.length === 0) {
		return 'valid';
	}
}
function getLast (array) {
	for (i= 0; array.length; i++) {
		console.log(array[i]);
	}	
}

function checkMatch (p1, p2) {
	var firstPass = p1.value;
	var secondPass = p2.value;

	if (firstPass != secondPass) {
		error.push(missMatch);
		console.log(missMatch);
	} else {
		console.log('match');
	}
	if (error.length != 0) {
		p1.setCustomValidity(error[0]);
		p2.setCustomValidity(error[0]);
		// console.log('error[0]');
	} 
	//TODO: Debug SetCustom Validity
	if (error.length === 0) {
		p1.setCustomValidity('');
	  	p2.setCustomValidity('');
	    console.log(error[2]);
	}
}
//initialize tool tips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

$('#name').tooltip('show');
// Progress Bar Here