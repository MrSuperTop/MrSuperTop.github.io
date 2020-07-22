let colorBoxes = document.querySelectorAll ('.color-box');

function copyColor (event) {
	let target = event.target.closest ('div');
	let lastSelected = document.querySelector ('.last-selected');

	target.classList.add ('small-box');
	setTimeout(() => target.classList.remove ('small-box'), 150);

	lastSelected.innerHTML = `${target.dataset.color} copied!`
	lastSelected.style.color = target.dataset.color;
	setTimeout (() => lastSelected.style.color = 'var(--bgc-main)', 600);

	document.body.style.backgroundColor = target.dataset.color;
	setTimeout (() => document.body.style.backgroundColor = 'var(--bgc-main)', 600);

	navigator.clipboard.writeText(target.dataset.color);
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

	cssVar ('box-size', '8rem')

	selector1.classList.add ('big-font');
	selector2.classList.remove ('big-font');
	pallet2.style.opacity = 0;

	setTimeout (() => pallet2.style.display = 'none', 300)
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