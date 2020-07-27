let colorBoxes = document.querySelectorAll ('.color-box');
let selectedColorType;

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

function copyColor (event) {
	let target = event.target.closest ('div');
	let lastSelected = document.querySelector ('.last-selected');
	let colorToCopy = target.dataset.color;

	if (selectedColorType == 'ffffff') colorToCopy = colorToCopy.slice (1);
	else if (selectedColorType == '#FFFFFF') colorToCopy = colorToCopy.toUpperCase ();
	else if (selectedColorType == 'FFFFFF') colorToCopy = colorToCopy.slice (1).toUpperCase ();
	else if (selectedColorType == 'rgb(255, 255, 255)') colorToCopy = 'rgb(' + hexToRGB (colorToCopy) + ')';
	else if (selectedColorType == 'hsl(0, 0%, 100%)') colorToCopy = "hsl(" + hexToHSL (colorToCopy) + ')';
	else if (selectedColorType == '255, 255, 255') colorToCopy = hexToRGB (colorToCopy)
	else if (selectedColorType == '0, 0%, 100%') colorToCopy = hexToHSL (colorToCopy);

	target.classList.add ('small-box');
	setTimeout(() => target.classList.remove ('small-box'), 150);

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

	setTimeout (() => lastSelected.style.color = 'var(--bgc-main)', 600);
	setTimeout (() => document.body.style.backgroundColor = 'var(--bgc-main)', 600);

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

selector1.addEventListener ('click', () => {
	setTimeout (() => pallet1.style.display = 'block', 300)

	cssVar ('box-size', '1rem')

	selector1.classList.add ('big-font');
	selector2.classList.remove ('big-font');
	pallet2.style.opacity = 0;

	setTimeout (() => {
		pallet2.style.display = 'none'
		cssVar ('box-size', '8rem')
	}, 300)
	setTimeout (() => pallet1.style.opacity = 1, 400)
})

selector2.addEventListener ('click', () => {
	setTimeout (() => pallet2.style.display = 'block', 300)

	cssVar ('box-size', '2rem')

	selector2.classList.add ('big-font');
	selector1.classList.remove ('big-font');
	pallet1.style.opacity = 0;

	setTimeout (() => pallet1.style.display = 'none', 300)
	setTimeout (() => pallet2.style.opacity = 1, 400)
})

document.querySelector ('.menu-trigger').addEventListener ('click', toggleMenu);
document.querySelector ('.color-type-menu').style.display = 'none';

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
	menuItem.addEventListener ('click', function () {
		selectedColorType = event.target.innerHTML;
		localStorage.colorType = selectedColorType;

		let toTheFunc = {
			target: menuItem.parentNode.previousSibling.previousSibling,
		}

		toggleMenu (toTheFunc)
	})
}