console.log('works');
console.log('agian');
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
var missMatch = '<li>the passwords do not match</li>';
var needSymbol = '<li id="symbols">needs on of these: !,@,#,$,%,^,&,*</li>';
var needNumber = '<li id="number">needs a number</li>';
var needLower = '<li id="lowercase">needs a lowercase letter</li>';
var needUpper = '<li id="uppercase">need an uppercase letter</li>';
var tooFew = '<li id="numchar">need a least 8 characters</li>';
var needsValue = 'The name field is required and must have 3 or more alphabetical characters.';

//validate the name field - sign up


var error = [];
var active = [];
function countFocus () {
	active.push('count');
}
function checkName () {
	var field = document.querySelector('#name').value;
	if (field.length >= 3 && isNaN(field) === true) {
		$('#name').tooltip('hide');
		console.log('good');
	} else {
		$('#name').tooltip('show');
		error.push(needsValue);
		console.log(needsValue);
	}
}
//TODO: Get email form validation to work
function checkEmail () {
	var field = document.querySelector('#email-address').value;
	var emailPattern = document.querySelector('#email-address').getAttribute('pattern');
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(field))
	 {
		$('#email-address').tooltip('hide');
		console.log('good');
	} else {
		$('#email-address').tooltip('show');
		error.push(needsValue);
		console.log(needsValue);
	}
}
//TODO: Fix logic for password validation
function checkPassword () {
	if (active.length > 0) {
		$('#password-errors').append(needUpper);
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
		}
	}  
}

//stop tooltips from showing on modal close
$('#signUp').on('hidden.bs.modal', function () {
    $('[data-toggle="tooltip"]').tooltip('hide');
})
$('#signUp').on('show.bs.modal', function () {
    $('[data-toggle="tooltip"]').tooltip('show');
})

function checkMatch (p1, p2) {

	var firstPass = p1.value;
	var secondPass = p2.value;

	if (firstPass != secondPass) {
		error.push(missMatch);
		$('#password-confirm').tooltip('show');
		console.log(missMatch);
	} else {
		$('#password-confirm').tooltip('hide');
		console.log('match');
	}
	// if (error.length != 0) {
	// 	p1.setCustomValidity(error[0]);
	// 	p2.setCustomValidity(error[0]);
	// 	// console.log('error[0]');
	// } 
	// //TODO: Debug SetCustom Validity
	// if (error.length === 0) {
	// 	p1.setCustomValidity('');
	//   	p2.setCustomValidity('');
	//     console.log(error[2]);
	// }
}
//initialize tool tips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

$('#name').tooltip({
    title: needsValue,
    effect: 'toggle'
});
$('#email-address').tooltip({
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