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

let allToInputBtns = document.querySelectorAll ('.to-input');
let resultWindow = document.querySelector ('.result-window');

for (let btn of allToInputBtns) {
	btn.addEventListener ('click', function () {
		resultWindow.value += btn.innerHTML;
	})
}

let equalBtn = document.querySelector ('.equal-btn');
let clearBtn = document.querySelector ('.clear-btn');
let backspaceBtn = document.querySelector ('.backspace-btn');

equalBtn.addEventListener ('click', function () {
	resultWindow.value = eval (resultWindow.value);
})

clearBtn.addEventListener ('click', function () {
	resultWindow.value = '';
})

backspaceBtn.addEventListener ('click', function () {
	resultWindow.value = resultWindow.value.slice (0, resultWindow.value.length - 1);
})