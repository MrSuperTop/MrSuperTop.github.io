let startBtn = document.getElementsByClassName ('convert-start-btn') [0];
let result = document.getElementsByClassName ('result') [0];

let engString = `qwertyuiop[]asdfghjkl;'zxcvbnm,./QWERTYUIOP{}ASDFGHJKL:"ZXCVBNM<>? 1234567890!#$%^&*()_-+=`;
let ruString =  `йцукенгшщзхъфывапролджэячсмитьбю.ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ, 1234567890!№;%:?*()_-+=`;

function resultCheckDisplay () {
	if (result.textContent == '') {
		result.style.display = 'none';
	}
	else {
		result.style.display = 'block';
	}
}

resultCheckDisplay ()

startBtn.addEventListener ('click', function () {
	let toWorkWith = document.getElementsByClassName ('main-text') [0].value;
	let lengOfToWorkWith = document.getElementsByClassName ('selecting-leng') [0].value;

	if (toWorkWith != null || lengOfToWorkWith != null) {
		let engArray = engString.split (',') + ['`'];
		let ruArray = ruString.split (',') + [`ё`];

		let splitedInput = toWorkWith.split ('');
		var res = [];

		if (lengOfToWorkWith == 'ru') {
			for (char of splitedInput) {
				res += [engArray [ruArray.indexOf (char)]]
			}
		} else if (lengOfToWorkWith == 'eng') {
			for (char of splitedInput) {
				res += [ruArray [engArray.indexOf (char)]]
			}
		}

		if (lengOfToWorkWith == '') {
			result.textContent = 'You didn`t select language!';
		} else if (res.length == 0 && res != undefined) {
			result.textContent = 'You didn`t write anything to input!';
		} else if (res != undefined) {
			result.textContent = 'Result: ' + res;
		}

		resultCheckDisplay ()
	}
})

var toReversTextArea = document.querySelector ('.to-revers-text');
document.querySelector ('.result-reversed').hidden = true;

toReversTextArea.addEventListener ('keyup', function () {
	splitedString = document.querySelector ('.to-revers-text').value.split ('');

	let reversed = '';
	for (let i = 0; i < splitedString.length; i++) {
		reversed += splitedString [splitedString.length - i - 1];
	}

	let reversedResElement = document.querySelector ('.result-reversed')

	if (reversed != 'undefined' && reversed.length != 0) {
		reversedResElement.hidden = false;
		reversedResElement.innerHTML = 'Result: ' + reversed;
	} else {
		reversedResElement.hidden = true;
	}
})

var toVariateTextArea = document.querySelector ('.to-variate-text');
document.querySelector ('.result-variated').hidden = true;

document.querySelector ('.variation-start-btn').addEventListener ('click', function () {

	let variatedString = '';
	for (let i = 0; i < toVariateTextArea.value.length; i++) {
		let chance = Math.random ().toFixed ();
		if (chance == 0) {
			variatedString += toVariateTextArea.value [i].toUpperCase ();
		} else {
			variatedString += toVariateTextArea.value [i].toLowerCase ();
		}
	}

	let variatedResElement = document.querySelector ('.result-variated')

	if (variatedString != 'undefined' && variatedString.length != 0) {
		variatedResElement.hidden = false;
		variatedResElement.innerHTML = 'Result: ' + variatedString;
	} else {
		variatedResElement.hidden = true;
	}
})