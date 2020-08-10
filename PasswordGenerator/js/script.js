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
let charsObjc = {
	lowercase: generateCharsArray (97, 26),
	uppercase: generateCharsArray (65, 26),
	numbers: generateCharsArray (48, 10),
	specialSymbols: [...generateCharsArray (33, 15), ...generateCharsArray (58, 7), ...generateCharsArray (123, 4)],
};

window.addEventListener ('load', () => {
	if (localStorage.passwordLength != undefined) passwordLengthInputField.value = localStorage.passwordLength;
	else passwordLengthInputField.value = 32;

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

passwordLengthInputField.addEventListener ('input', () => {
	localStorage.passwordLength = event.target.value;
})

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

document.querySelector ('.generate-btn').addEventListener ('click', () => {
	passwordLength = +eval (passwordLengthInputField.value);
	if (String (passwordLength) == 'NaN') passwordLength = 0;
	let toGenerateCharsArray = [];

	if (allCheckboxes [0].checked) toGenerateCharsArray.push (...charsObjc.lowercase)
	if (allCheckboxes [1].checked) toGenerateCharsArray.push (...charsObjc.uppercase)
	if (allCheckboxes [2].checked) toGenerateCharsArray.push (...charsObjc.numbers)
	if (allCheckboxes [3].checked) toGenerateCharsArray.push (...charsObjc.specialSymbols)

	let result = [];
	while (result.length != passwordLength) {
		result.push (toGenerateCharsArray [getRandomInt (toGenerateCharsArray.length)])
	}
	resultInput.value = result.join ('');

	if (allCheckboxes [4].checked) navigator.clipboard.writeText (result.join (''));
	else resultInput.select();
})