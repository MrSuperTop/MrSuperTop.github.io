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

let selectedSystem = 'rad';

function sin (number) {
	if (selectedSystem == 'deg') return Math.sin (number) / (180 / Math.PI);
	else return Math.sin (number);
}
function cos (number) {
	if (selectedSystem == 'deg') return Math.cos (number) / (180 / Math.PI);
	else return Math.cos (number);
}
function tan (number) {
	if (selectedSystem == 'deg') return Math.tan (number) / (180 / Math.PI);
	else return Math.tan (number);
}
function arsin (number) {
	if (selectedSystem == 'deg') return Math.asin (number) / (180 / Math.PI);
	else return Math.asin (number);
}
function arcos (number) {
	if (selectedSystem == 'deg') return Math.acos (number) / (180 / Math.PI);
	else return Math.acos (number);
}
function artan (number) {
	if (selectedSystem == 'deg') return Math.atan (number) / (180 / Math.PI);
	else return Math.atan (number);
}
function sqrt (number) {
	return Math.sqrt (number);
}
function floor (number) {
	return Math.floor (number);
}

function factorial (n) {
  return n ? n * factorial (n - 1) : 1;
}

// Math operation for simplifying code

function isItANumber (char) {
	if (char.charCodeAt (0) >= 48 && char.charCodeAt (0) <= 57) return true;
	else if (char == '.') return true;
	else return false;
}

let toFilter = Array.from (document.querySelectorAll ('.calc-btn'));
let specialBtns = [];

let allToInputBtns = toFilter.filter (function (item, index, array) {
	if (item.classList.length == 2) {
		if (item.innerHTML.length == 1 || item.innerHTML == 'x!') return true;
		else if (item.innerHTML.length != 1 && item.innerHTML != 'x!' && item.innerHTML != '') specialBtns.push (item);
	}
});

let resultWindow = document.querySelector ('.result-window');

for (let btn of allToInputBtns) {
	btn.addEventListener ('click', function () {
		btn.innerHTML == 'x!' ? resultWindow.value += '!' : resultWindow.value += btn.innerHTML;
	})
}

for (let btn of specialBtns) {
	btn.addEventListener ('click', function () {
		resultWindow.value += btn.innerHTML + '(';
	})
}

let equalBtn = document.querySelector ('.equal-btn');
let clearBtn = document.querySelector ('.clear-btn');
let backspaceBtn = document.querySelector ('.backspace-btn');
let invertBtn = document.querySelector ('.invert-btn');
let degBtn = document.querySelector ('.deg-btn');
let radBtn = document.querySelector ('.rad-btn');

function equal () {
	let toEval = resultWindow.value;

	while (toEval.includes ('π')) {
		toEval = toEval.replace ('π', '3.141592653589793')
	}

	while (toEval.includes ('e')) {
		toEval = toEval.replace ('e', '2.718281828459045')
	}

	while (toEval.includes ('!')) {
		let toFactorial = [];
		let indexesToSlice = [-1, -1];


		if (toEval.includes ('!')) {
			indexesToSlice [1] = toEval.indexOf ('!');
			for (let i = toEval.indexOf ('!') - 1; i != -1; i--) {
				if (isItANumber (toEval [i])) toFactorial.push (toEval [i]);
				if (!isItANumber (toEval [i])) {
					break;
				}
				indexesToSlice [0] = i;
			}
		}

		if (toFactorial.length != 0) {
			let toReplaceWith = String (factorial (+toFactorial.reverse ().join ('')));
			toEval = toEval.replace (toEval.slice (indexesToSlice [0], indexesToSlice [1]) + '!', toReplaceWith);
		} else {
			toEval = toEval.replace ('!', '')
		}
	}

	if (toEval != '') resultWindow.value = String (eval (toEval).toFixed (4));
	else resultWindow.value = ''
}

equalBtn.addEventListener ('click', equal)

clearBtn.addEventListener ('click', function () {
	resultWindow.value = '';
})

backspaceBtn.addEventListener ('click', function () {
	resultWindow.value = resultWindow.value.slice (0, resultWindow.value.length - 1);
})

function invertBtns () {
	if (specialBtns [1].innerHTML == 'sin') {
		for (let i = 1; i < 4; i++) {
			specialBtns [i].innerHTML = 'ar' + specialBtns [i].innerHTML;
		}
	} else {
		for (let i = 1; i < 4; i++) {
			specialBtns [i].innerHTML = specialBtns [i].innerHTML.slice (2);
		}
	}
}

degBtn.addEventListener ('click', setDeg)
radBtn.addEventListener ('click', setRad)

function setDeg () {
	degBtn.classList.add ('selected-type');
	radBtn.classList.remove ('selected-type');
	selectedSystem = 'deg';
}

function setRad () {
	radBtn.classList.add ('selected-type');
	degBtn.classList.remove ('selected-type');
	selectedSystem = 'rad';
}

invertBtn.addEventListener ('click', invertBtns)

let singsArray = ['+', '-', '*', '/'];

function isASing (char) {
	if (singsArray.includes (char)) return true;
	else return false;
}

document.body.addEventListener ('keydown', function () {
	if (isItANumber (event.key) || singsArray.includes (event.key)) resultWindow.value += event.key;
	if (event.key == 'Backspace') resultWindow.value = resultWindow.value.slice (0, resultWindow.value.length - 1);
	if (event.key == 'Enter') equal ()
})