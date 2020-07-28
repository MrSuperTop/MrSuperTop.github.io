let colorBoxes = document.querySelectorAll ('.color-box');
let selectedColorType;

let transition = cssVar ('transition-main');
transition = +transition.slice (0, transition.length - 1) * 1000;

if (localStorage.colorType == undefined) { selectedColorType = '#ffffff' }
else { selectedColorType = localStorage.colorType }

function hexToRGB (h) {
  let r = 0, g = 0, b = 0;

  if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
}

  return +r + ", " + +g + ", " + +b;
}

function hexToHSL(H) {
  // Convert hex to RGB first
  let r = 0, g = 0, b = 0;
  if (H.length == 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length == 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  if (delta == 0)
    h = 0;
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  else if (cmax == g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0)
    h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return h + ", " + s + "%, " + l + "%";
}

function luminanace(r, g, b) {
  let array = [r, g, b].map (function (value) {
    value /= 255;
    return value <= 0.03928 ? value / 12.92 : Math.pow ((value + 0.055) / 1.055, 2.4);
	});

  return array [0] * 0.2126 + array [1] * 0.7152 + array [2] * 0.0722;
}

function contrastCoefGet (color1, color2) {
	let r = 0, g = 0, b = 0;

  r = "0x" + color1[1] + color1[2];
  g = "0x" + color1[3] + color1[4];
  b = "0x" + color1[5] + color1[6];
  let rgb1 = [+r, +g, +b]

  r = "0x" + color2[1] + color2[2];
  g = "0x" + color2[3] + color2[4];
  b = "0x" + color2[5] + color2[6];
  let rgb2 = [+r, +g, +b]

  let lum1 = luminanace(rgb1[0], rgb1[1], rgb1[2]);
  let lum2 = luminanace(rgb2[0], rgb2[1], rgb2[2]);

  return +((lum1 + 0.05) / (lum2 + 0.05)).toFixed (2);
}

function copyColor (event) {
	let target = event.target.closest ('div');
	let lastSelected = document.querySelector ('.last-selected');
	let colorToCopy = target.dataset.color;

	if (contrastCoefGet ('#ffffff', target.dataset.color) <= 4.5) {
		lastSelected.style.backgroundColor = '#000';
	} else {
		lastSelected.style.backgroundColor = '#fff';
	}

	if (selectedColorType == 'ffffff') colorToCopy = colorToCopy.slice (1);
	else if (selectedColorType == '#FFFFFF') colorToCopy = colorToCopy.toUpperCase ();
	else if (selectedColorType == 'FFFFFF') colorToCopy = colorToCopy.slice (1).toUpperCase ();
	else if (selectedColorType == 'rgb(255, 255, 255)') colorToCopy = 'rgb(' + hexToRGB (colorToCopy) + ')';
	else if (selectedColorType == 'hsl(0, 0%, 100%)') colorToCopy = "hsl(" + hexToHSL (colorToCopy) + ')';
	else if (selectedColorType == '255, 255, 255') colorToCopy = hexToRGB (colorToCopy)
	else if (selectedColorType == '0, 0%, 100%') colorToCopy = hexToHSL (colorToCopy);

	target.classList.add ('small-box');
	setTimeout(() => target.classList.remove ('small-box'), transition / 2);

	lastSelected.innerHTML = `${colorToCopy} copied!`

	function setColor (before = '', after = '') {
		lastSelected.style.color = before + colorToCopy + after;
		document.body.style.backgroundColor = before + colorToCopy + after;
		target.parentNode.parentNode.style.backgroundColor = before + colorToCopy + after;
	}

	if (colorToCopy [0] != '#' && colorToCopy.length == 6) {
		setColor ('#')
	} else if (colorToCopy.length >= 7 && colorToCopy [0] != 'r' && colorToCopy [0] != 'h' && colorToCopy [0] != '#') {
		if (!colorToCopy.split ('').includes ('%')) {
			setColor ('rgb(', ')')
		} else {
			setColor ('hsl(', ')')
		}
	} else {
		setColor ()
	}

	setTimeout (() => {
		lastSelected.style.color = 'var(--bgc-main)';
		lastSelected.style.backgroundColor = 'var(--bgc-main)';
		document.body.style.backgroundColor = 'var(--bgc-main)';
	}, 600);

	navigator.clipboard.writeText (colorToCopy);
}

function cssVar (name, value) {
  if (name [0] != '-') name = '--' + name //allow passing with or without --
  if (value) document.documentElement.style.setProperty (name, value)
  return getComputedStyle (document.documentElement).getPropertyValue (name);
}

for (let box of colorBoxes) {
	box.style.backgroundColor = box.dataset.color;
	box.addEventListener ('click', copyColor);
}

let selector1 = document.querySelector ('.selector-1');
let selector2 = document.querySelector ('.selector-2');

let pallet1 = document.querySelector ('.pallet-1');
let pallet2 = document.querySelector ('.pallet-2');

pallet2.style.opacity = 0;
pallet2.style.display = 'none';

function switchToPallet1 () {
	localStorage.selectedPallet = 'pallet1';
	setTimeout (() => pallet1.style.display = 'block', transition)

	cssVar ('box-size', '1rem')

	selector1.classList.add ('big-font');
	selector2.classList.remove ('big-font');
	pallet2.style.opacity = 0;

	setTimeout (() => {
		pallet2.style.display = 'none'
		cssVar ('box-size', '8rem')
	}, transition)
	setTimeout (() => pallet1.style.opacity = 1, transition + 100)
}

function switchToPallet2 () {
	localStorage.selectedPallet = 'pallet2';
	setTimeout (() => pallet2.style.display = 'block', transition)

	cssVar ('box-size', '2rem')

	selector2.classList.add ('big-font');
	selector1.classList.remove ('big-font');
	pallet1.style.opacity = 0;

	setTimeout (() => pallet1.style.display = 'none', transition)
	setTimeout (() => pallet2.style.opacity = 1, transition + 100)
}

selector1.addEventListener ('click', switchToPallet1)
selector2.addEventListener ('click', switchToPallet2)

let prevValue = cssVar ('transition-main');
cssVar ('transition-main', '0s')

if (localStorage.selectedPallet == 'pallet2') {
	switchToPallet2 ();
} else {
	document.querySelector ('.selector-1').classList.add ('big-font')
}

setTimeout (() => cssVar ('transition-main', prevValue), 5)

let colorTypeMenu = document.querySelector ('.color-type-menu');
let menuTrigger = document.querySelector ('.menu-trigger');

menuTrigger.addEventListener ('click', toggleMenu);
colorTypeMenu.style.display = 'none';

function toggleMenu (event) {
	let target = event.target.closest ('div');
	target.firstChild.classList.toggle ('arrow-fliped')

	let menuWithColors = target.nextSibling.nextSibling;
	let cssStyles = window.getComputedStyle (menuWithColors);

	if (cssStyles.getPropertyValue ('display') == 'none') menuWithColors.style.display = 'block';
	else if (cssStyles.getPropertyValue ('display') == 'block') setTimeout (() => menuWithColors.style.display = 'none', 300);

	setTimeout (() => target.nextSibling.nextSibling.classList.toggle ('menu-shown'), 1)
}

let menuItems = document.querySelectorAll ('.menu-item');
menuItems = Array.from (menuItems)

for (let menuItem of menuItems) {
	if (menuItem.innerHTML == localStorage.colorType) {
		menuItem.style.cssText = 'font-size: 1.25rem; color: #f4b400;';
		break;
	}
}

for (let menuItem of menuItems) {
	menuItem.addEventListener ('click', function () {
		selectedColorType = event.target.innerHTML;
		localStorage.colorType = selectedColorType;
		menuItem.style.cssText = 'font-size: 1.25rem; color: #f4b400;';

		for (let toRemoveStyles of menuItems) {
			if (toRemoveStyles != menuItem) toRemoveStyles.style.cssText = '';
		}

		let toTheFunc = {
			target: menuItem.parentNode.previousSibling.previousSibling,
		}

		toggleMenu (toTheFunc)
	})
}

let themeToggler = document.querySelector ('.theme-toggler');

function toggleTheme (event) {
	let target = event.target.closest ('div');

	target.firstChild.style.opacity = 0;

	setTimeout (() => {
		target.firstChild.classList.toggle ('fa-lightbulb');
		target.firstChild.classList.toggle ('fa-moon');
		target.firstChild.style.opacity = 1;
	}, transition)

	cssVar ('bgc-main', cssVar ('bgc-secondary'));
	if (cssVar ('bgc-main') == '#ddd') {
		cssVar ('bgc-secondary', '#1e1e24');
	} else {
		cssVar ('bgc-secondary', '#ddd');
	}
}

themeToggler.addEventListener ('click', toggleTheme);

document.body.addEventListener('click', function () {
	let target;

	if (event.target == document.body) {
		target = document.body;
	} else if (event.target == document.querySelector ('nav')) {
		target = document.querySelector ('nav')
	}	else {
		target = event.target.closest ('div')
	}

	let toFunc = {
		target: menuTrigger
	};

	if (target != menuTrigger && target != colorTypeMenu && target.parentNode != colorTypeMenu
	&& colorTypeMenu.classList.contains ('menu-shown')) toggleMenu (toFunc);
})