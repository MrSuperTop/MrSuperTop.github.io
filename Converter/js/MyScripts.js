let startBtn = document.getElementsByClassName ('convert-start-btn') [0];
let result = document.querySelector ('.result');

let engString = `qwertyuiop[]asdfghjkl;'zxcvbnm,./QWERTYUIOP{}ASDFGHJKL:"ZXCVBNM<>? 1234567890!#$%^&*()_-+=`;
let ruString =  `йцукенгшщзхъфывапролджэячсмитьбю.ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ, 1234567890!№;%:?*()_-+=`;

let bodyiesHeights;

function cssVar (name, value) {
  if (name [0] != '-') name = '--' +name;
  if (value) document.documentElement.style.setProperty (name, value);
  return getComputedStyle (document.documentElement).getPropertyValue (name);
}

function resultCheckDisplay () {
	result = document.querySelector ('.result')
	if (result.textContent == '') {
		result.style.display = 'none';
	}
	else {
		result.style.display = 'block';
	}
}

resultCheckDisplay ()

startBtn.addEventListener ('click', function () {
	bodyiesHeights = updateBodyHeights ();

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
			result.innerHTML = 'Result: ' + res;
		}

		resultCheckDisplay ()
	}
})

var toReversTextArea = document.querySelector ('.to-revers-text');
document.querySelector ('.result-reversed').hidden = true;

toReversTextArea.addEventListener ('input', reverseText)

function reverseText ()  {
	bodyiesHeights = updateBodyHeights ();

	bodyiesHeights = updateBodyHeights ();

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
	bodyiesHeights = updateBodyHeights ();

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
	bodyiesHeights = updateBodyHeights ();

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

let allHeaders = document.querySelectorAll ('.collabsible-header');
let allBodies = document.querySelectorAll ('.collabsible-body');
let allLies = document.querySelectorAll ('.collabsible > li');
bodyiesHeights = updateBodyHeights ();


function updateBodyHeights () {
	toReturn = []
	cssVar ('transition-primary', '0s')
	for (let body of allBodies) {
		body.style.height = 'auto';
		toReturn.push (body.clientHeight)
		body.style.cssText = '';
	}
	setTimeout (() => cssVar ('transition-primary', '.3s'))

	allActiveCollabsibles = document.querySelectorAll ('.collabsible-body-show');

	for (let collabsible of allActiveCollabsibles) {
		collabsible.style.height = toReturn [Array.from (allActiveCollabsibles).indexOf (collabsible)] + 'px';
	}

	return toReturn
}

for (let header of allHeaders) {
	header.addEventListener ('click', function () {
		let prevLi = '';
		let target = event.target.closest ('div');
		target.parentNode.classList.add ('activated');
		let collabsibleBody = target.nextSibling.nextSibling
		collabsibleBody.classList.toggle ('collabsible-body-show')
		let indexOfHeaderInList = Array.prototype.slice.call (allHeaders).indexOf (header);
		if (collabsibleBody.classList.contains ('collabsible-body-show')) {
			collabsibleBody.style.height = bodyiesHeights [indexOfHeaderInList] + 'px'
		} else {
			collabsibleBody.style.cssText = '';
		}
		for (li of allLies) {
			if (li.classList.contains ('activated') && li != target.parentNode) {
				prevLi = li;
				let target = li.children [0];
				target.parentNode.classList.remove ('activated');
				let collabsibleBody = target.nextSibling.nextSibling
				collabsibleBody.classList.toggle ('collabsible-body-show')
				let indexOfHeaderInList = Array.prototype.slice.call (allHeaders).indexOf (header);
				if (collabsibleBody.classList.contains ('collabsible-body-show')) {
					collabsibleBody.style.height = bodyiesHeights [indexOfHeaderInList] + 'px'
				} else {
					collabsibleBody.style.cssText = '';
				}
			} else if (li == target.parentNode && !target.parentNode.children [1].classList.contains ('collabsible-body-show')) {
				li.classList.remove ('activated');
			}
		}
	})
}

//

function generateCharsArray (start, howManyChars) {
	let result = [];
	for (let i = 0; i < howManyChars; i++) {
		result.push (String.fromCharCode (i + start))
	}
	return result
}

let charsObjc = {
	lowercase: generateCharsArray (97, 26),
	uppercase: generateCharsArray (65, 26),
	numbers: generateCharsArray (48, 10),
	ruUppercase: [...generateCharsArray (1040, 32), 'Ё'],
	ruLowercase: [...generateCharsArray (1072, 32), 'ё'],
	specialSymbols: ` !"#$%&'()*+,-./:;<=>?@[\]^_` + '`' + `{|}~`.split (''),
};

charsObjc.ruLowercaseAndSS = [...charsObjc.ruLowercase, ...charsObjc.specialSymbols]
charsObjc.engLowercaseAndSS = [...charsObjc.lowercase, ...charsObjc.specialSymbols]

//

let resultFieldObjct = document.querySelector ('.result-halfcaps')

document.querySelector ('.to-halfcaps-text').addEventListener ('input', (event) => {
	updateBodyHeights ()
	toInnerHTML = []
	hasToBeUppercase = true
	for (let char of event.target.value) {
		if (hasToBeUppercase) toInnerHTML.push (char.toUpperCase ());
		else toInnerHTML.push (char.toLowerCase ());

		if (!charsObjc.specialSymbols.includes (char)) hasToBeUppercase = !hasToBeUppercase
	}

	if (toInnerHTML.join ('') != '') {
		resultFieldObjct.style.display = 'block';
		resultFieldObjct.innerHTML = 'Result: ' + toInnerHTML.join ("");
	} else {
		resultFieldObjct.style.display = 'none';
	}
})

//

function getAllByIndexesArray (getFrom, indexes) {
	let result = []
	for (let i = 0; i < getFrom.length; i++) {
		if (indexes.includes (i)) result.push (getFrom [i])
	}
	return result
}

function allArrrayToUpper (array) {
	result = [];
	for (let item of array) {
		if (item.length == 1 || item == '') result.push (item.toUpperCase ());
		else if (item != '') result.push (item [0].toUpperCase () + item.slice (1));
	}
	return result;
}

function chunkString (str, length) {
  return str.match (new RegExp ('.{1,' + length + '}', 'g'));
}

toTranslitEng = [...'abvgde'.split (''), 'zh', ...'zijklmnoprstuf'.split (''), ...'khtschsh'.match(/.{1,2}/g), 'shch', 'ie', 'y', '', 'e', 'yu', 'ya', 'e']
toTranslitRu = [...charsObjc.ruLowercase, ...charsObjc.ruUppercase, ...charsObjc.specialSymbols]

toTranslitEng = [...toTranslitEng, ...allArrrayToUpper (toTranslitEng), ...charsObjc.specialSymbols]

let inputField = document.querySelector ('.to-translit-text');
let exportField = document.querySelector ('.result-translit');

inputField.addEventListener ('input', (event) => {
	updateBodyHeights ()

	result = [];
	for (let char of inputField.value) {
		if (charsObjc.ruLowercaseAndSS.includes (char.toLowerCase ())) {
			result.push (toTranslitEng [toTranslitRu.indexOf (char)])
		}
	}

	// for (let i = 4; i > 0 && inputField.value != ''; i--) {
	// 	allIndexes = []
	// 	if (i == 3) i -= 1
	// 	filtredTranslitEng = toTranslitEng.filter (function (item, index, array) {
	// 		if (item.length == i) {
	// 			allIndexes.push (index)
	// 			return true;
	// 		}
	// 	})

	// 	filteredTranslitRu = getAllByIndexesArray (toTranslitRu, allIndexes)

	// 	for (let item of chunkString (inputField.value, i)) {
	// 		if (charsObjc.lowercase.includes (item [0].toLowerCase ()) && filtredTranslitEng.includes (item)) {
	// 			result.push (filteredTranslitRu [filtredTranslitEng.lastIndexOf (item)])
	// 		}
	// 	}
	// }

	// Переделать ^

	if (result.join ('') != '') {
		exportField.style.display = 'block';
		exportField.innerHTML = 'Result: ' + result.join ('');
	} else {
		exportField.style.display = 'none';
	}
});