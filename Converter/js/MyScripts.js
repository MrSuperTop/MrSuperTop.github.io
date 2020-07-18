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

toReversTextArea.addEventListener ('input', function () {
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

function charInfo (char) {
	let charCode = char.charCodeAt (0);

	if (charCode >= 97 && charCode <= 122) {
		return ['lowerCase', charCode];
	} else if (charCode >= 65 && charCode <= 90) {
		return ['upperCase', charCode];
	} else {
		return ['notALetter', charCode];
	}
}

function isItANumber (char) {
	let charCode = char.charCodeAt (0);
	if (charCode >= 47 && charCode <= 57) return true;
	else return false;
}

let toCodeTextArea = document.querySelector ('.to-code-text');
let shiftInput = document.querySelector ('.shift');
document.querySelector ('.result-coded').hidden = true;

toCodeTextArea.addEventListener ('input', codeAndDecode);
shiftInput.addEventListener ('input', codeAndDecode);

function codeAndDecode () {
	let toWorkWith = toCodeTextArea.value.split ('');
	let numberToDecode = [];

	for (let char of toWorkWith.slice (0, 3)) {
		if (isItANumber (char) || char == '-') numberToDecode.push (char)
	}

	if (numberToDecode.length != 0) numberToDecode = +numberToDecode.join ('');


	let result = [];
	let toPushCode;
	let infoResult;
	let shift;

	for (let char of toWorkWith) {
		infoResult = charInfo (char)

		if (infoResult [0] != 'notALetter') {
			numberToDecode.length == 0 ? shift = +shiftInput.value : shift = numberToDecode * -1;
			toPushCode = char.charCodeAt (0) + shift;
			infoResult [1] += shift;

			if (infoResult [0] == 'lowerCase' && infoResult [1] < 97) toPushCode += 26;
			if (infoResult [0] == 'lowerCase' && infoResult [1] > 122) toPushCode -= 26;
			if (infoResult [0] == 'upperCase' && infoResult [1] < 65) toPushCode += 26;
			if (infoResult [0] == 'upperCase' && infoResult [1] > 90) toPushCode -= 26;

			result.push (String.fromCharCode (toPushCode));
		} else {
			result.push (char)
		}
	}

	let codedResElement = document.querySelector ('.result-coded');

	if (result.join != 'undefined' && result.join ('').length != 0) {
		codedResElement.hidden = false;
		if (numberToDecode.length == 0) codedResElement.innerHTML = 'Result: ' + +shiftInput.value + result.join ('');
		else {
			for (let item of result.slice (0, 3)) {
				if (isItANumber (item) || item == '-') delete result [result.indexOf (item)]
			}
			codedResElement.innerHTML = 'Result: ' + result.join ('');
		}
	} else {
		codedResElement.hidden = true;
	}
}