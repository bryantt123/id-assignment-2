setTimeout(function() {
	document.querySelector('.lottie-container').style.display = 'none';
	document.querySelector('.content').style.display = 'block';
}, 2650);

const title = document.querySelector('.title');
const username = JSON.parse(localStorage.getItem('username'));
title.innerText = `Hi, ${username}!`;
DisplayStats();

function DisplayStats(){
	$.ajax({
		"async": true,
		"crossDomain": true,
		"url": "https://idasg2-e717.restdb.io/rest/stats",
		"method": "GET",
		"headers": {
			"content-type": "application/json",
			"x-apikey": "63e63782478852088da68022",
			"cache-control": "no-cache"
		},
		"processData": false,
	})
	.done(function (response) {
		const quests2 = response.filter(quest2 => quest2.username === username);
		quests2.forEach(quest2 => {
			const statsLevel = document.querySelector('.level');
			statsLevel.innerText = `Current Level: ${quest2.level}`;

			const statsXp = document.querySelector('.xp');
			const statsXpValue = JSON.parse(quest2.xpPoints);
			statsXp.innerText = `Experience Points: ${statsXpValue}`;

			const statsCoins = document.querySelector('.coins');
			const statsCoinsValue = JSON.parse(quest2.coins);
			localStorage.setItem("coins", JSON.stringify(statsCoinsValue));
			statsCoins.innerText = `Coins: ${statsCoinsValue}`;
		});
	});
}

DisplayTodos();

window.addEventListener('load', () => {
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
			"url": "https://idasg2-e717.restdb.io/rest/quests",
			"method": "POST",
			"headers": {
				"content-type": "application/json",
				"x-apikey": "63e63782478852088da68022",
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
	});
});

function DisplayTodos() {
	const todoList = document.querySelector('#todo-list');
	todoList.innerHTML = "";

	$.ajax({
		"async": true,
		"crossDomain": true,
		"url": "https://idasg2-e717.restdb.io/rest/quests",
		"method": "GET",
		"headers": {
			"content-type": "application/json",
			"x-apikey": "63e63782478852088da68022",
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
					"url": `https://idasg2-e717.restdb.io/rest/quests/`+quest._id,
					"method": "DELETE",
					"headers": {
					  "content-type": "application/json",
					  "x-apikey": "63e63782478852088da68022",
					  "cache-control": "no-cache"
					}
				};
				
				$.ajax({
					"async": true,
					"crossDomain": true,
					"url": "https://idasg2-e717.restdb.io/rest/stats",
					"method": "GET",
					"headers": {
						"content-type": "application/json",
						"x-apikey": "63e63782478852088da68022",
						"cache-control": "no-cache"
					},
					"processData": false,
				})
				.done(function (response) {
					const quests2 = response.filter(quest2 => quest2.username === username);
					quests2.forEach(quest2 => {
						var level = quest2.level;
						var xpPoints = quest2.xpPoints;
						var coins = quest2.coins;
						if (quest2.xpPoints >= 100){
							level = quest2.level + 1;
							xpPoints = quest2.xpPoints - 90;
							coins = quest2.coins + 70;
						} else{
							xpPoints = quest2.xpPoints + 10;
							coins = quest2.coins + 20;
						}
						var jsondata = {"level": level,"xpPoints":xpPoints, "coins": coins, "username": username};
						var settings = {
						"async": true,
						"crossDomain": true,
						"url": `https://idasg2-e717.restdb.io/rest/stats/${quest2._id}`,
						"method": "PUT",
						"headers": {
							"content-type": "application/json",
							"x-apikey": "63e63782478852088da68022",
							"cache-control": "no-cache"
						},
						"processData": false,
						"data": JSON.stringify(jsondata)
						};

						$.ajax(settings).done(function (response) {
						console.log(response);
						});
					});
				});
				$.ajax(settings).done(function (response) {
					console.log(response);
					DisplayTodos();
					DisplayStats();
				});
			});

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
					"url": `https://idasg2-e717.restdb.io/rest/quests/${quest._id}`,
					"method": "PUT",
					"headers": {
						"content-type": "application/json",
						"x-apikey": "63e63782478852088da68022",
						"cache-control": "no-cache"
					},
					"processData": false,
					"data": JSON.stringify(jsondata)
					};

					$.ajax(settings).done(function (response) {
					console.log(response);
					DisplayTodos();
					});
				});
			});

			deleteButton.addEventListener('click', (e) => {
				var settings = {
				  "async": true,
				  "crossDomain": true,
				  "url": `https://idasg2-e717.restdb.io/rest/quests/${quest._id}`,
				  "method": "DELETE",
				  "headers": {
					"content-type": "application/json",
					"x-apikey": "63e63782478852088da68022",
					"cache-control": "no-cache"
				  }
				};
			  
				$.ajax(settings).done(function (response) {
				  console.log(response);
				  DisplayTodos();
				});
			});
		});
	});
}


/* NAVBAR */
/*
let navbar = document.querySelector('.navbar');

document.querySelector('#menu-bar').onclick = () =>{
    navbar.classList.toggle('active');
};

document.querySelector('#close').onclick = () =>{
    navbar.classList.remove('active');
}

window.onscroll = () =>{

    navbar.classList.remove('active');

    if(window.scrollY > 100){
        document.querySelector('header').classList.add('active');
    }else{
        document.querySelector('header').classList.remove('active');
    }

}

let themeToggler = document.querySelector('#theme-toggler');

themeToggler.onclick = () =>{
    themeToggler.classList.toggle('fa-sun');
    if(themeToggler.classList.contains('fa-sun')){
        document.querySelector('body').classList.add('active');
    }else{
        document.querySelector('body').classList.remove('active');
    }
}*/