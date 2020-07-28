function cssVar (name, value) {
  if (name [0] != '-') name = '--' +name
  if (value) document.documentElement.style.setProperty (name, value)
  return getComputedStyle (document.documentElement).getPropertyValue (name);
}

let transition = cssVar ('transition-main');
transition = +transition.slice (0, transition.length - 1) * 1000;

// Css vars func

let allPressebleButtons = document.querySelectorAll ('.presseble-btn');

function resizeButton (event) {
	let target = event.target.closest ('div');

	target.classList.add ('small-btn')
	setTimeout (() => target.classList.remove ('small-btn'), transition / 2)
}

for (let button of allPressebleButtons) {
	button.addEventListener ('click', resizeButton)
}

// Resizeble button