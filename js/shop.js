let navbar = document.querySelector('.navbar')

/*document.querySelector('#menu-bar').onclick = () =>{
    navbar.classList.toggle('active');
}

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

/* LOTTIE animation */
setTimeout(function() {
    document.querySelector('.lottie-container').style.display = 'none';
    document.querySelector('.content').style.display = 'block';
  }, 2650);



/* buying function */
const boxes = document.querySelectorAll(".box");
const animation = document.querySelector("lottie-player");
const content = document.querySelector(".products");

boxes.forEach((box, index) => {
    const btn = box.querySelector(".cart-btn");
    btn.addEventListener("click", (event) => {
        animation.classList.remove("hidden");
        content.classList.add("hidden");
        setTimeout(() => {
            animation.classList.add("hidden");
            content.classList.remove("hidden");
        }, 3000);

        event.preventDefault();
        const name = box.querySelector("h3").innerText;
        // make a post request to the RESTdb collection with the name and price
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "https://idasg2-c0ea.restdb.io/rest/characters",
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "x-apikey": "63e552fd478852088da67f84",
                "cache-control": "no-cache"
            },
            "processData": false,
        })
        .done(function (response) {
            console.log(response);
            const chars = response.filter(char => char.name === name && char.price <= localStorage.getItem('coins'));
            chars.forEach(char => {
                const username = JSON.parse(localStorage.getItem('username'));
                var jsondata = {"character": name,"charImage": char.charImage, "username": username};
                var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://idasg2-c0ea.restdb.io/rest/characters-owned",
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "x-apikey": "63e552fd478852088da67f84",
                    "cache-control": "no-cache"
                },
                "processData": false,
                "data": JSON.stringify(jsondata)
                }

                $.ajax(settings)
                .done(function (response) {
                    console.log(response);
                })
                .fail(function (error) {
                    console.error(error);
                });

                $.ajax({
					"async": true,
					"crossDomain": true,
					"url": "https://idasg2-c0ea.restdb.io/rest/stats",
					"method": "GET",
					"headers": {
						"content-type": "application/json",
						"x-apikey": "63e552fd478852088da67f84",
						"cache-control": "no-cache"
					},
					"processData": false,
				})
				.done(function (response) {
					const stats = response.filter(stat => stat.username === username);
					stats.forEach(stat => {
                        var level = stat.level;
						var xpPoints = stat.xpPoints;
						var coins = (stat.coins - char.price);
                        var jsondata = {"level": level, "xpPoints": xpPoints, "coins": coins, "username": username};
						var settings = {
						"async": true,
						"crossDomain": true,
						"url": `https://idasg2-c0ea.restdb.io/rest/stats/${stat._id}`,
						"method": "PUT",
						"headers": {
							"content-type": "application/json",
							"x-apikey": "63e552fd478852088da67f84",
							"cache-control": "no-cache"
						},
						"processData": false,
						"data": JSON.stringify(jsondata)
						}

						$.ajax(settings).done(function (response) {
						console.log(response);
						});
                     })
                })
            })
        })
    })
})