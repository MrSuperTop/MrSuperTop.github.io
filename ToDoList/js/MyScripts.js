document.addEventListener ('click', function () {
	if (
		event.target.classList.contains ('fa-plus')
		) {
		let target = event.target.closest('div');

		let toDoElement = document.createElement ('div');
		let whatToDoElement = target.parentNode.children [2];
		let deleteElement = document.createElement ('div');

		toDoElement.classList.add ('to-do-element')
		toDoElement.innerHTML = document.querySelector ('.add-input').value;

		deleteElement.classList.add ('delete-icon-box')
		deleteElement.innerHTML += '<i class="fas fa-minus-circle"></i>'
		toDoElement.append (deleteElement);

		whatToDoElement.append (toDoElement)
	} else if (
		event.target.classList.contains ('delete-icon-box') ||
		event.target.classList.contains ('fa-minus-circle')
		) {
		let target = event.target.closest('div');
		target.parentNode.remove ()
	}
})
