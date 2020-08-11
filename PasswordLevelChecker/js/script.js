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

	if (cssVar ('bgc-primary') == '#ddd' || cssVar ('bgc-primary') == '#ddd') setTheme ('dark');
	else setTheme ('ligth');
}

themeToggler.addEventListener ('click', toggleTheme);

//

let allCheckers = document.querySelectorAll ('.checker');
let checkersBox = document.querySelector ('.checkers');
let passwordInput = document.querySelector ('.password-to-check');
let warning = document.querySelector ('.warning');
let warningBox = document.querySelector ('.warning-box');

let charsObjc = {
	lowercase: generateCharsArray (97, 26),
	uppercase: generateCharsArray (65, 26),
	numbers: generateCharsArray (48, 10),
	specialSymbols: ` !"#$%&'()*+,-./:;<=>?@[\]^_` + '`' + `{|}~`.split (''),
	returnAllTogether () {
		return [...this.lowercase, ...this.uppercase, ...this.numbers, ...this.specialSymbols]
	},
};

console.log (charsObjc.returnAllTogether ())

function generateCharsArray (start, howManyChars) {
	let result = [];
	for (let i = 0; i < howManyChars; i++) {
		result.push (String.fromCharCode (i + start))
	}
	return result
}

function addOk (checker) {
	checker.classList.remove ('bad');
	checker.classList.add ('ok');
	checker.firstChild.classList.remove ('fa-exclamation')
	checker.firstChild.classList.add ('fa-check')
}

function addBad (checker) {
	checker.classList.remove ('ok');
	checker.classList.add ('bad');
	checker.firstChild.classList.add ('fa-exclamation')
	checker.firstChild.classList.remove ('fa-check')
}

function hasLetter (word, whichLetter = '') {
	for (let char of word) {
		if (!charsObjc.returnAllTogether ().includes (char)) return 'notInArray';
		if (whichLetter == 'Uppercase' && charsObjc.uppercase.includes (char)) return true;
		if (whichLetter == 'Lowercase' && charsObjc.lowercase.includes (char)) return true;
		if (whichLetter == 'Number' && charsObjc.numbers.includes (char)) return true;
		if (whichLetter == 'SpecialCaracter' && charsObjc.specialSymbols.includes (char)) return true;
	}
}

passwordInput.addEventListener ('input', () => {
	if (hasLetter (passwordInput.value) == 'notInArray')  {
		checkersBox.style.opacity = 0;
		setTimeout (() => {
			checkersBox.style.display = 'none';
			warningBox.style.display = 'block';
			setTimeout (() => warningBox.style.opacity = 1, 10)
		}, transition);
	} else {
		warningBox.style.opacity = 0;
		setTimeout (() => {
			warningBox.style.display = 'none';
			checkersBox.style.display = 'block';
			setTimeout (() => checkersBox.style.opacity = 1, 10)
		}, transition);

		passwordInput.value.length >= 8 ? addOk (allCheckers [0]) : addBad (allCheckers [0]);
		hasLetter (passwordInput.value, 'Uppercase') ? addOk (allCheckers [1]) : addBad (allCheckers [1]);
		hasLetter (passwordInput.value, 'Lowercase') ? addOk (allCheckers [2]) : addBad (allCheckers [2]);
		hasLetter (passwordInput.value, 'Number') ? addOk (allCheckers [3]) : addBad (allCheckers [3]);
		hasLetter (passwordInput.value, 'SpecialCaracter') ? addOk (allCheckers [4]) : addBad (allCheckers [4]);
	}
})