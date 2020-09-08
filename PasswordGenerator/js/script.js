// Css vars func

function cssVar (name, value) {
  if (name [0] != '-') name = '--' +name
  if (value) document.documentElement.style.setProperty (name, value)
  return getComputedStyle (document.documentElement).getPropertyValue (name);
}

let transition = cssVar ('transition-primary');
transition = +transition.slice (0, transition.length - 1) * 1000;
let halfTransition = transition / 2;

// Resizeble button

let allPressebleButtons = document.querySelectorAll ('.presseble-btn');

function resizeButton (event) {
	let target = event.target.closest ('div');

	target.classList.add ('small-btn')
	setTimeout (() => target.classList.remove ('small-btn'), transition / 2)
}

for (let button of allPressebleButtons) {
	button.addEventListener ('click', resizeButton)
}

// theme toggler

let themeToggler = document.querySelector ('.theme-toggler');
let prevValue;

function changeIcon (iconName) {
	setTimeout (() => {
		themeToggler.firstChild.style.opacity = '0';
		themeToggler.firstChild.innerHTML = iconName;
		themeToggler.firstChild.style.opacity = '1';
	}, transition / 3);
}

function setTheme (theme) {
	if (theme == 'dark') {
		cssVar ('bgc-primary', '#1e1e24');
		cssVar ('bgc-secondary', '#ddd');

		cssVar ('fc-primary', '#fff');
		cssVar ('fc-secondary', '#000');

		changeIcon ('nights_stay');
	} else if (theme == 'ligth') {
		cssVar ('bgc-primary', '#ddd');
		cssVar ('bgc-secondary', '#1e1e24');

		cssVar ('fc-primary', '#000');
		cssVar ('fc-secondary', '#fff');

		changeIcon ('wb_sunny');
	}
}

prevValue = cssVar ('transition-primary');
cssVar ('transition-primary', '0s');

localStorage.theme == 'dark' ? setTheme ('dark') : setTheme ('ligth');

cssVar ('transition-primary', prevValue);


function toggleTheme () {

	cssVar ('bgc-primary') == '#ddd' ? localStorage.theme = 'dark' : localStorage.theme = 'ligth';

	if (cssVar ('bgc-primary') == '#ddd' || cssVar ('bgc-primary') == ' #ddd') setTheme ('dark');
	else setTheme ('ligth');
}

themeToggler.addEventListener ('click', toggleTheme);

//

function getRandomInt (max) {
  return Math.floor (Math.random () * Math.floor (max));
}

function generateCharsArray (start, howManyChars) {
	let result = [];
	for (let i = 0; i < howManyChars; i++) {
		result.push (String.fromCharCode (i + start))
	}
	return result
}

let allCheckboxes = document.querySelectorAll ('.checkbox-box input');
let passwordLength = 2;
let resultInput = document.querySelector ('.result');
let passwordLengthInputField = document.querySelector ('.password-length');
let numberOfPasswordsInputField = document.querySelector ('.password-number');

let charsObjc = {
	lowercase: generateCharsArray (97, 26),
	uppercase: generateCharsArray (65, 26),
	numbers: generateCharsArray (48, 10),
	specialSymbols: `!"#$%&'()*+,-./:;<=>?@[\]^_` + '`' + `{|}~`.split (''),
};

window.addEventListener ('load', () => {
	if (localStorage.passwordLength != undefined) passwordLengthInputField.value = localStorage.passwordLength;
	else passwordLengthInputField.value = 32;

	if (localStorage.passwordsNumber != undefined) numberOfPasswordsInputField.value = localStorage.passwordsNumber;
	else passwordLengthInputField.value = numberOfPasswordsInputField.value = 1;

	if (localStorage.checkboxValues != undefined) {
		let importedCheckboxValues = JSON.parse (localStorage.checkboxValues);
		for (let checkbox of allCheckboxes) {
			checkbox.checked = importedCheckboxValues [Array.from (allCheckboxes).indexOf (checkbox)]
		}
	} else {
		allCheckboxes [0].checked = True;
		allCheckboxes [4].checked = True;
	}
})

passwordLengthInputField.addEventListener ('input', generatePasswords)

numberOfPasswordsInputField.addEventListener ('input', generatePasswords);

function saveCheckboxesValues () {
	let toSave = [];
	for (let checkbox of allCheckboxes) {
		toSave.push (checkbox.checked);
	}
	localStorage.checkboxValues = JSON.stringify (toSave);
}

for (let checkbox of allCheckboxes) {
	checkbox.addEventListener ('click', saveCheckboxesValues);
}

document.querySelector ('.generate-btn').addEventListener ('click', generatePasswords);

function generatePasswords () {
	localStorage.passwordLength = passwordLengthInputField.value;
	localStorage.passwordsNumber = numberOfPasswordsInputField.value;

	passwordLength = +eval (passwordLengthInputField.value);
	if (String (passwordLength) == 'NaN') passwordLength = 0;
	let toGenerateCharsArray = [];

	if (allCheckboxes [0].checked) toGenerateCharsArray.push (...charsObjc.lowercase)
	if (allCheckboxes [1].checked) toGenerateCharsArray.push (...charsObjc.uppercase)
	if (allCheckboxes [2].checked) toGenerateCharsArray.push (...charsObjc.numbers)
	if (allCheckboxes [3].checked) toGenerateCharsArray.push (...charsObjc.specialSymbols)

	let numberOfPasswords = +numberOfPasswordsInputField.value;
	let result = [];
	let password = [];
	let randomChar = 'a';

	for (let i = 0; i < numberOfPasswords; i++) {
		while (result.length < passwordLength) {
			randomChar = toGenerateCharsArray [getRandomInt (toGenerateCharsArray.length)];

			while (randomChar == password [password.length]) {
				randomChar = toGenerateCharsArray [getRandomInt (toGenerateCharsArray.length)];

			}

			result.push (randomChar)
		}

		password.push (...result)
		password.push ('\n');
		result = [];
	}

	resultInput.value = password.join ('');

	if (allCheckboxes [4].checked) navigator.clipboard.writeText (password.join (''));
	else resultInput.select();
}