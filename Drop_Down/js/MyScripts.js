document.querySelector ('.drop-down-trigger').addEventListener ('click', function () {
	let target = event.target.closest ('div');
	let coords = target.getBoundingClientRect ();
	let dropDownContent = target.parentNode.children [1];

	let left = coords.left - dropDownContent.clientWidth / 2 + target.clientWidth / 2 + pageXOffset;
	let top = coords.top + target.clientHeight + pageYOffset;

	console.log (top)

	dropDownContent.style.left = left + 'px';
	console.log (document.body.clientWidth)
	console.log (left)
	dropDownContent.style.top = top + 'px';

	dropDownContent.classList.toggle ('drop-down-content-show');
})