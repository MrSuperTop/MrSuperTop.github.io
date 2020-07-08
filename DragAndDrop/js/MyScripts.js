let text = document.querySelector ('.text')

text.addEventListener ('mousedown', function () {
	let shiftX = event.clientX - text.getBoundingClientRect().left;
	let shiftY = event.clientY - text.getBoundingClientRect().top;

	text.style.position = 'absolute';
	text.style.xIndex = '1000';
	document.body.append (text);

	function moveAt (pageX, pageY) {
		let newLeft = pageX - shiftX;
		let newTop = pageY - shiftY;

		if (newLeft > document.body.clientWidth - text.clientWidth - 5) {
			newLeft = document.body.clientWidth - text.clientWidth - 5
		}
		if (newLeft < 5) {
			newLeft = 5
		}
		if (newTop > document.body.clientHeight - text.clientHeight - 5) {
			newTop = document.body.clientHeight - text.clientHeight - 5
		}
		if (newTop < 5) {
			newTop = 5
		}

		text.style.left = newLeft + 'px';
		text.style.top = newTop + 'px';
	}

	moveAt (event.pageX, event.pageY);

	function mouseMove (event) {
		setTimeout (() => moveAt (event.pageX, event.pageY), 0)
	}

	window.addEventListener ('mousemove', mouseMove);

	text.onmouseup = function () {
		window.removeEventListener ('mousemove', mouseMove);
		text.onmouseup = null;
	}
})

text.ondragstart = function() {
	  return false;
	};