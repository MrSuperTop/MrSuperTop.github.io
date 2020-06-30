let startBtn = document.getElementsByClassName ('start-btn') [0];
let result = document.getElementsByClassName ('result') [0];

let engString = `qwertyuiop[]asdfghjkl;'zxcvbnm,./QWERTYUIOP{}ASDFGHJKL:"ZXCVBNM<>? 1234567890!#$%^&*()_-+=`;
let ruString =  `йцукенгшщзхъфывапролджэячсмитьбю.ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ, 1234567890!№;%:?*()_-+=`;

function resultCheckDisplay () {
	if (result.textContent == '') {
		result.style.display = 'none';
	}
	else {
		result.style.display = 'block';
	}
}

resultCheckDisplay ()

startBtn.addEventListener ('click', function () {
	let toWorkWith = document.getElementsByClassName ('main-text') [0].value;
	let lengOfToWorkWith = document.getElementsByClassName ('selecting-leng') [0].value;

	if (toWorkWith != null || lengOfToWorkWith != null) {
		let engArray = engString.split (',') + ['`'];
		let ruArray = ruString.split (',') + [`ё`];

		let splitedInput = toWorkWith.split ('');
		var res = [];

		if (lengOfToWorkWith == 'ru') {
			for (char of splitedInput) {
				res += [engArray [ruArray.indexOf (char)]]
			}
		} else if (lengOfToWorkWith == 'eng') {
			for (char of splitedInput) {
				res += [ruArray [engArray.indexOf (char)]]
			}
		}

		if (lengOfToWorkWith == '') {
			result.textContent = 'You didn`t select language!';
		} else if (res.length == 0 && res != undefined) {
			result.textContent = 'You didn`t write anything to input!';
		} else if (res != undefined) {
			result.textContent = 'Result: ' + res;
		}

		resultCheckDisplay ()
	}
})

var toReversTextArea = document.querySelector ('.to-revers-text');
document.querySelector ('.result-reversed').hidden = true;

toReversTextArea.addEventListener ('keyup', function () {
	splitedString = document.querySelector ('.to-revers-text').value.split ('');

	let reversed = '';
	for (let i = 0; i < splitedString.length; i++) {
		reversed += splitedString [splitedString.length - i - 1];
	}

	let reversedResElement = document.querySelector ('.result-reversed')

	if (reversed != 'undefined' && reversed.length != 0) {
		reversedResElement.hidden = false;
		reversedResElement.innerHTML = 'Result: ' + reversed;
	} else {
		reversedResElement.hidden = true;
	}
})