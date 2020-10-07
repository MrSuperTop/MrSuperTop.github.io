// css vars func

function cssVar (name, value) {
  if (name [0] != '-') name = '--' +name;
  if (value) document.documentElement.style.setProperty (name, value);
  return getComputedStyle (document.documentElement).getPropertyValue (name);
}

// transition vars defenition

let transition = cssVar ('transition-primary');
transition = +transition.slice (0, transition.length - 1) * 1000;

// resizeble button

let allPressebleButtons = document.querySelectorAll ('.presseble-btn');

function resizeButton (event) {
	let target = event.target.closest ('div');

	target.classList.add ('small-btn');
	setTimeout (() => target.classList.remove ('small-btn'), transition * 0.5);
}

for (let button of allPressebleButtons) { button.addEventListener ('click', resizeButton); }

// theme toggler

let themeToggler = document.querySelector ('.theme-toggler');
let prevValue;

let varHamesToToggle = ['bgc-primary', 'bgc-secondary', 'bgc-tertiary', 'bgc-quaternary','fc-primary', 'fc-secondary', 'fc-tertiary'];
let defaulVarsValues = ['#ddd', '#1e1e24', '#333', '#fff', '#000', '#fff', '#ddd'];
let toChangeVarsValues = ['#1e1e24', '#ddd', '#fff', '#333', '#fff', '#000', '#fff'];

// load theme from localStorage
document.addEventListener ('DOMContentLoaded', () => {
	prevValue = cssVar ('transition-primary');
	cssVar ('transition-primary', '0s');
	localStorage.theme == 'dark' ? setTheme ('dark') : setTheme ('ligth');
	setTimeout (() => cssVar ('transition-primary', prevValue));
});

function changeIcon (iconName) {
	setTimeout (() => {
		themeToggler.firstChild.style.opacity = '0';
		themeToggler.firstChild.innerHTML = iconName;
		themeToggler.firstChild.style.opacity = '1';
	}, transition / 3);
}

function setTheme (theme) {
	if (theme == 'dark') {
		// change all vars
		for (let i = 0; i < varHamesToToggle.length; i++) { cssVar (varHamesToToggle [i], toChangeVarsValues [i]) };
		// Icon
		changeIcon ('nights_stay');
	} else if (theme == 'ligth') {
		// change all vars
		for (let i = 0; i < varHamesToToggle.length; i++) { cssVar (varHamesToToggle [i], defaulVarsValues [i]) };
		// Icon
		changeIcon ('wb_sunny');
	}
}

function toggleTheme () {
	cssVar ('bgc-primary') == '#ddd' ? localStorage.theme = 'dark' : localStorage.theme = 'ligth'; // save theme to the localStorage
	if (cssVar ('bgc-primary') == '#ddd' || cssVar ('bgc-primary') == ' #ddd') setTheme ('dark');
	else setTheme ('ligth');
}

themeToggler.addEventListener ('click', toggleTheme);

// Popper

function createNewPopper (trigger, tooltip, settings) {
	let popperInstance = null;

	function createTooltip() {
	  popperInstance = Popper.createPopper(button, tooltip, {
	  	placement: settings [0],
	    modifiers: [
	      {
	        name: 'offset',
	        options: {
	          offset: settings [1],
	        },
	      },
	    ],
	  });
	}

	function destroyTooltip() {
	  if (popperInstance) {
	    popperInstance.destroy();
	    popperInstance = null;
	  }
	}

	function showTooltip() {
	  tooltip.setAttribute('data-show', '');
	  createTooltip();
	}

	function hideTooltip() {
	  tooltip.removeAttribute('data-show');
	  destroyTooltip();
	}

	const showEvents = ['mouseenter', 'focus'];
	const hideEvents = ['mouseleave', 'blur'];

	showEvents.forEach(event => {
	  button.addEventListener(event, showTooltip);
	});

	hideEvents.forEach(event => {
	  button.addEventListener(event, hideTooltip);
	});
}