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

let theme = 'white'

document.querySelector ('.theme-changer-box').addEventListener ('click', function () {
	if (theme == 'white') {
		cssVar ('main-color', '#1e1e24');
		cssVar ('font-color', '#fff');
		theme = 'black'
	} else {
		cssVar ('main-color', '#fff');
		cssVar ('font-color', '#000');
		theme = 'white'
	}
})