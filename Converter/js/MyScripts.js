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

toReversTextArea.addEventListener ('input', reverseText)

function reverseText ()  {
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
}

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

if (localStorage.inputValue == undefined) localStorage.inputValue = '3';
shiftInput.value = localStorage.inputValue;

document.querySelector ('.result-coded').hidden = true;

toCodeTextArea.addEventListener ('input', codeAndDecode);
shiftInput.addEventListener ('input', codeAndDecode);

function codeAndDecode () {
	if (+shiftInput.value > 26) shiftInput.value = 26;
	if (+shiftInput.value < -26) shiftInput.value = -26;

	localStorage.inputValue = shiftInput.value;

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

let iconsArray = document.querySelectorAll ('.counter-minus, .couter-plus');

for (let icon of iconsArray) {
	icon.addEventListener ('click', function () {
		icon.classList.add ('icon-small');
		setTimeout (() => icon.classList.remove ('icon-small'), 150)
	})
}

iconsArray [0].addEventListener ('click', function () {
	shiftInput.value = +shiftInput.value + 1;
	codeAndDecode ()
})

iconsArray [1].addEventListener ('click', function () {
	shiftInput.value = +shiftInput.value - 1;
	codeAndDecode ()
})

document.querySelector ('.reset-btn').addEventListener ('click', function () {
	shiftInput.value = 0;
	toCodeTextArea.value = '';
	codeAndDecode ()
})

let allCopyIcons = document.querySelectorAll ('.copy-btn');
let allResults = document.querySelectorAll ('div[class*="result"]');
let allPasteIcons = document.querySelectorAll ('.paste-btn');
let allTextAreas = document.querySelectorAll ('.main-text, textarea[class*="to-"]');

function copyOnButton (event) {
	let target = event.target.closest ('div');

	target.firstChild.classList.add ('small-icon');
	setTimeout (() => target.firstChild.classList.remove ('small-icon'), 150)

	createToast ({
		html: 'Copied!',
		removeDelay: 1000,
		toastRounding: '.3rem',
		inTime: 300,
		outTime: 300,
		callBack: function () {},
	})

	let toCopy = allResults [Array.from (allCopyIcons).indexOf (target)].innerHTML.slice (8);

	toCopy == '' ? navigator.clipboard.writeText ('') : navigator.clipboard.writeText (toCopy);
}

for (let copyIcon of allCopyIcons) {
	copyIcon.addEventListener ('click', copyOnButton);
}

function pasteOnButton (event) {
	let target = event.target.closest ('div');

	target.firstChild.classList.add ('small-icon');
	setTimeout (() => target.firstChild.classList.remove ('small-icon'), 150)

	createToast ({
		html: 'Pasted!',
		removeDelay: 1000,
		toastRounding: '.3rem',
		inTime: 300,
		outTime: 300,
		callBack: function () {},
	})

	navigator.clipboard.readText()
	  .then(text => {
	    allTextAreas [Array.from (allPasteIcons).indexOf (target)].innerHTML = text;
	    codeAndDecode ()
	    reverseText ()
	  })
	  .catch(err => {
	    console.error(err);
	  });

}

for (let pasteIcon of allPasteIcons) {
	pasteIcon.addEventListener ('click', pasteOnButton);
}

// Toasts part

var toasts = [];
var toastContainer;

function createToast (settings) {

	let toast = document.createElement ('div');
	toast.classList.add ('toast');

	toasts.push (toast);

		setTimeout (() => {
			toast.style.cssText += 'transition: ' + String (settings.outTime / 1000) + 's;' + 'margin-top: -' + toast.offsetHeight + 'px;';
			hideToastWithAnimation (toasts [0], settings.outTime, settings.callBack)
			toasts.shift ()
		}, settings.removeDelay);

	if (document.querySelectorAll ('.toast-container').length == 0) {
		toastContainer = document.createElement ('div');
		toastContainer.classList.add ('toast-container');
		document.body.append (toastContainer);
	}

	toast.style.cssText = 'transition: ' + String (settings.inTime / 1000) + 's;';

	showToastWithAnimation (toast, toastContainer, settings.inTime);

	if (settings.toastRounding != undefined) {
		toast.style.borderRadius = settings.toastRounding;
	} else {
		toast.style.borderRadius = '.5rem';
	}

	let toastTextSpan = document.createElement ('span');
	toastTextSpan.innerHTML = settings.html;
	toast.append (toastTextSpan);

	if (settings.adtionalButtonText != undefined) {
		let adtionalBtnElement = document.createElement ('div');
		adtionalBtnElement.innerHTML = settings.adtionalButtonText
		toast.append (adtionalBtnElement);
	}
}

function showToastWithAnimation (toastToShow, whereToAdd, animationInTime) {
	whereToAdd.append (toastToShow);
	toastToShow.classList.add ('toast-moved-down');
	setTimeout (() => toastToShow.classList.remove ('toast-moved-down'), 1)
}

function hideToastWithAnimation (toastToHide, animationOutTime, callBack) {
	toastToHide.classList.add ('toast-moved-up');
	setTimeout (() => {
		toastToHide.remove ()
		callBack ()
	}, animationOutTime);
}

// Toasts part