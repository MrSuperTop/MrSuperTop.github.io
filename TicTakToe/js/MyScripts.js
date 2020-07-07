let allTds = document.querySelectorAll ('table td');
var flag = false;
var grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var dataForWinCheck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 3, 6, 1, 4, 7, 2, 5, 8, 0, 4, 8, 2, 4, 6];
let allToHide = [document.querySelector ('.grid'), document.querySelector ('.grid-img')];

//

let oWin = document.querySelector ('.O-win');
let xWin = document.querySelector ('.X-win');
let restart = document.querySelector ('.restart');
let draw = document.querySelector ('.draw');

setTimeout (() => oWin.style.display = 'none', 300);
setTimeout (() => xWin.style.display = 'none', 300);
setTimeout (() => draw.style.display = 'none', 300);

cssVar ('transition', '.5s')
let cssTransition = cssVar ('transition').split ('').slice (0, cssVar ('transition').length - 1);
let res = '';
for (char of cssTransition) {
	res += char
}

cssTransition = +res
console.log (cssTransition)

setTimeout (() => document.querySelector ('.grid-img').classList.remove ('grid-big'), 0);

//

function changeWhoesTurn (whosTurn) {
	let imgs = document.querySelectorAll ('.whos-turn-img')
	imgs [0].classList.toggle ('whos-turn-img-circled-X')
	imgs [1].classList.toggle ('whos-turn-img-circled-O')
}

function hide (toHide) {
	toHide.classList.add ('hidden');
	setTimeout (() => toHide.style.display = 'none', cssTransition * 1000);
}

function show (toShow) {
	toShow.style.cssText = '';
	setTimeout (() => toShow.classList.remove ('hidden'), cssTransition * 1000);
}

function drawCheck () {
	let counter = 0;

	for (number of grid) {
		if (!number) {
			counter += 1
		}
	}

	if (counter == 0) {
		for (elem of allToHide) {
	 		hide (elem)
 		}
 		show (draw)
	}
}

function cssVar(name, value){
    if (name [0] != '-') name = '--' + name
    if (value) document.documentElement.style.setProperty (name, value)
    return getComputedStyle (document.documentElement).getPropertyValue (name);
}

function winCheck () {
	let firstCord = 0
	let secondCord = 1
	let thirdCord = 2
	let checkDraw = true;

	while (thirdCord < dataForWinCheck.length) {
		if (grid [dataForWinCheck [firstCord]] == 1 && grid [dataForWinCheck [secondCord]] == 1 && grid [dataForWinCheck [thirdCord]] == 1) {
	 		for (elem of allToHide) {
	 			hide (elem)
	 		}
	 		show (xWin)
	 		checkDraw = false;
	 	} else if (grid [dataForWinCheck [firstCord]] == 2 && grid [dataForWinCheck [secondCord]] == 2 && grid [dataForWinCheck [thirdCord]] == 2) {
	 		for (elem of allToHide) {
	 			hide (elem)
	 		}
	 		show (oWin)
	 		checkDraw = false;
	 	}

	 firstCord += 3;
	 secondCord += 3;
	 thirdCord += 3;
	}

	if (checkDraw) {
		drawCheck ()
	}
}

//

for (td of allTds) {
	td.addEventListener ('click', function () {

		let img = document.createElement ('img');
		let target = event.target.closest ('td');
		if (!flag && !target.innerHTML) {
			img.setAttribute('src', 'img/X.png');
			grid [+event.target.dataset.number] = 1;
		} else if (!target.innerHTML) {
			img.setAttribute('src', 'img/O.png');
			grid [+event.target.dataset.number] = 2;
		}

		if (!target.innerHTML) {
			flag = !flag;
			changeWhoesTurn (flag)
			img.style.opacity = '0';
			event.target.append (img);
			setTimeout (() => img.style.cssText = '', cssTransition * 100);
		}

		winCheck ()
	})
}

//

restart.addEventListener ('click', function () {
	grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	if (flag) {
		changeWhoesTurn (flag)
	}

	flag = false;
	for (elem of allToHide) {
		show (elem)
	}
	setTimeout (() => {
		for (td of allTds) {
			td.innerHTML = ''
		}
	}, cssTransition * 1000)
	for (img of document.querySelectorAll ('table img[src="img/X.png"], img[src="img/O.png"]')) {
		if (!img.classList.contains ('winner-img') && !img.classList.contains ('whos-turn-img')) {
			img.style.opacity = '0';
		}
	}

	hide (xWin)
	hide (oWin)
	hide (draw)
})