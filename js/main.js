const title = document.querySelector('.title');
const username = JSON.parse(localStorage.getItem('username'));
title.innerText = `Hi, ${username}!`;

DisplayTodos();

window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	const newTodoForm = document.querySelector('#new-todo-form');

	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();

		var jsondata = {
			"quest": e.target.elements.content.value,
			"questCat": e.target.elements.category.value,
			"done": false,
			"username": username
		};
	
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://idasg2-7926.restdb.io/rest/quests",
			"method": "POST",
			"headers": {
				"content-type": "application/json",
				"x-apikey": "63e28b26478852088da67e80",
				"cache-control": "no-cache"
			},
			"processData": false,
			"data": JSON.stringify(jsondata)
		};
	
		$.ajax(settings).done(function (response) {
			console.log(response);
			DisplayTodos();
		});

		// Reset the form
		e.target.reset();

	})

})

function DisplayTodos() {
	const todoList = document.querySelector('#todo-list');
	todoList.innerHTML = "";

	$.ajax({
		"async": true,
		"crossDomain": true,
		"url": "https://idasg2-7926.restdb.io/rest/quests",
		"method": "GET",
		"headers": {
			"content-type": "application/json",
			"x-apikey": "63e28b26478852088da67e80",
			"cache-control": "no-cache"
		},
		"processData": false,
	})
	
	.done(function (response) {
		const quests = response.filter(quest => quest.username === username && quest.done === false);
		quests.forEach(quest => {
			const todoItem = document.createElement('div');
			todoItem.classList.add('todo-item');

			const label = document.createElement('label');
			const input = document.createElement('input');
			const span = document.createElement('span');
			const content = document.createElement('div');
			const actions = document.createElement('div');
			const edit = document.createElement('button');
			const deleteButton = document.createElement('button');

			input.type = 'checkbox';
			input.checked = quest.done;
			span.classList.add('bubble');
			if (quest.questCat == 'mondstadt') {
				span.classList.add('mondstadt');
			} else if ( quest.questCat == 'liyue'){
				span.classList.add('liyue');
			} else if ( quest.questCat == 'inazuma'){
				span.classList.add('inazuma');
			} else if ( quest.questCat == 'sumeru'){
				span.classList.add('sumeru');
			}
				
			content.classList.add('todo-content');
			actions.classList.add('actions');
			edit.classList.add('edit');
			deleteButton.classList.add('delete');

			content.innerHTML = `<input type="text" value="${quest.quest}" readonly>`;
			edit.innerHTML = 'Edit';
			deleteButton.innerHTML = 'Delete';

			label.appendChild(input);
			label.appendChild(span);
			actions.appendChild(edit);
			actions.appendChild(deleteButton);
			todoItem.appendChild(label);
			todoItem.appendChild(content);
			todoItem.appendChild(actions);

			todoList.appendChild(todoItem);

			input.addEventListener('change', (e) => {
				var settings = {
					"async": true,
					"crossDomain": true,
					"url": `https://idasg2-7926.restdb.io/rest/quests/`+quest._id,
					"method": "DELETE",
					"headers": {
					  "content-type": "application/json",
					  "x-apikey": "63e28b26478852088da67e80",
					  "cache-control": "no-cache"
					}

				  }
				  

				  $.ajax(settings).done(function (response) {
					console.log(response);
					DisplayTodos();
				  });
			
			})

			edit.addEventListener('click', (e) => {
				const input = content.querySelector('input');
				input.removeAttribute('readonly');
				input.focus();
				input.addEventListener('blur', (e) => {
					input.setAttribute('readonly', true);
					var jsondata = {"quest": e.target.value, "questCat": quest.questCat, "done": quest.done, "username": quest.username};
					var settings = {
					"async": true,
					"crossDomain": true,
					"url": `https://idasg2-7926.restdb.io/rest/quests/${quest._id}`,
					"method": "PUT",
					"headers": {
						"content-type": "application/json",
						"x-apikey": "63e28b26478852088da67e80",
						"cache-control": "no-cache"
					},
					"processData": false,
					"data": JSON.stringify(jsondata)
					}

					$.ajax(settings).done(function (response) {
					console.log(response);
					DisplayTodos()
					});
				})
			})

			deleteButton.addEventListener('click', (e) => {

				var settings = {
				  "async": true,
				  "crossDomain": true,
				  "url": `https://idasg2-7926.restdb.io/rest/quests/${quest._id}`,
				  "method": "DELETE",
				  "headers": {
					"content-type": "application/json",
					"x-apikey": "63e28b26478852088da67e80",
					"cache-control": "no-cache"
				  }
				}
			  
				$.ajax(settings).done(function (response) {
				  console.log(response);
				});
				DisplayTodos();
			  });

	})
	})
}