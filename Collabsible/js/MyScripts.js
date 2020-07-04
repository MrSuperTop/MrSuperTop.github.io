let allHeaders = document.querySelectorAll ('.collabsible-header');
let allBodies = document.querySelectorAll ('.collabsible-body');
let allLies = document.querySelectorAll ('.collabsible > li');
let bodyiesHeights = [];

//

function cssVar (name, value) {
  if (name[0] != '-') name = '--' +name
  if (value) document.documentElement.style.setProperty (name, value)
  return getComputedStyle (document.documentElement).getPropertyValue (name);
}

//

for (let body of allBodies) {
	body.style.height = 'auto';
	bodyiesHeights.push (body.offsetHeight)
	body.style.cssText = '';
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

document.querySelector ('.drop-down-trigger').addEventListener ('click', function () {
	let target = event.target.closest ('div');
	let coords = target.getBoundingClientRect ();
	let dropDownContent = target.parentNode.children [1];

	let left = coords.left - dropDownContent.clientWidth / 2 + target.clientWidth / 2 + pageXOffset;
	let top = coords.top + target.clientHeight + pageYOffset;

	dropDownContent.style.left = left + 'px';
	dropDownContent.style.top = top + 'px';

	dropDownContent.classList.toggle ('drop-down-content-show');
	target.children [0].classList.toggle ('arrow-fliped')
})

function makeSmallSelectors (mainSelector) {
	let allSelectors = document.querySelectorAll ('.themes-ul li p');

	for (selector of allSelectors) {
		if (selector.classList.contains ('selector-big') && selector != mainSelector) {
			selector.classList.remove ('selector-big')
		}
	}
}

let darkSelector = document.querySelector ('.dark-theme');
let lightSelector = document.querySelector ('.light-theme');
let blueSelector = document.querySelector ('.blue-theme');

let prevTrans = cssVar ('transition')

cssVar ('transition', '0s');
let loadedTheme = localStorage.getItem ('theme');
let activeSelector = document.querySelector ('.' + loadedTheme + '-theme');
setTheme (loadedTheme, activeSelector)
cssVar ('transition', prevTrans);

function setTheme (themeName, selector) {
	if (themeName == 'dark') {
		cssVar ('main-color', '#1e1e24');
		cssVar ('font-color', '#fff');
		localStorage.setItem ('theme', 'dark');
	} else if (themeName == 'light') {
		cssVar ('main-color', '#fff');
		cssVar ('font-color', '#000');
		localStorage.setItem ('theme', 'light');
	} else {
		cssVar ('main-color', '#3498db');
		cssVar ('font-color', '#fff');
		localStorage.setItem ('theme', 'blue');
	}
	selector.classList.add ('selector-big');
	makeSmallSelectors (selector);
}

darkSelector.addEventListener ('click', function () {
	setTheme ('dark', event.target);
})

lightSelector.addEventListener ('click', function () {
	setTheme ('light', event.target);
})

blueSelector.addEventListener ('click', function () {
	setTheme ('blue', event.target);
});