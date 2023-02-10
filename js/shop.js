/*
let navbar = document.querySelector('.navbar')

document.querySelector('#menu-bar').onclick = () =>{
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

        if (name === "Yelan"){
            document.getElementById("yelanButton").disabled = true;
            document.getElementById("yelanButton").innerText = "Owned";
        } else if (name === "Yoimiya"){
            document.getElementById("yoimiyaButton").disabled = true;
            document.getElementById("yoimiyaButton").innerText = "Owned";
        } else if (name === "Kaeya"){
            document.getElementById("kaeyaButton").disabled = true;
            document.getElementById("kaeyaButton").innerText = "Owned";
        } else if (name === "Kazuha"){
            document.getElementById("kazuhaButton").disabled = true;
            document.getElementById("kazuhaButton").innerText = "Owned";
        } else if (name === "Bennett"){
            document.getElementById("bennettButton").disabled = true;
            document.getElementById("bennettButton").innerText = "Owned";
        } else if (name === "Rosaria"){
            document.getElementById("rosariaButton").disabled = true;
            document.getElementById("rosariaButton").innerText = "Owned";
        } else if (name === "Qiqi"){
            document.getElementById("qiqiButton").disabled = true;
            document.getElementById("qiqiButton").innerText = "Owned";
        } else if (name === "Xiao"){
            document.getElementById("xiaoButton").disabled = true;
            document.getElementById("xiaoButton").innerText = "Owned";
        } else if (name === "Mona"){
            document.getElementById("monaButton").disabled = true;
            document.getElementById("monaButton").innerText = "Owned";
        } else if (name === "Wanderer"){
            document.getElementById("wandererButton").disabled = true;
            document.getElementById("wandererButton").innerText = "Owned";
        }
        // make a post request to the RESTdb collection with the name and price
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "https://idasg2-fc8e.restdb.io/rest/characters",
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "x-apikey": "63e60003478852088da67ff3",
                "cache-control": "no-cache"
            },
            "processData": false,
        })
        .done(function (response) {
            console.log(response);
            const chars = response.filter(char => char.name === name && char.price <= localStorage.getItem('coins'));
            chars.forEach(char => {

                const username = JSON.parse(localStorage.getItem('username'));
                var jsondata = {"character": name, "charDesc": char.charDesc, "charImage": char.charImage, "username": username};
                var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://idasg2-fc8e.restdb.io/rest/characters-owned",
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "x-apikey": "63e60003478852088da67ff3",
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
					"url": "https://idasg2-fc8e.restdb.io/rest/stats",
					"method": "GET",
					"headers": {
						"content-type": "application/json",
						"x-apikey": "63e60003478852088da67ff3",
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
						"url": `https://idasg2-fc8e.restdb.io/rest/stats/${stat._id}`,
						"method": "PUT",
						"headers": {
							"content-type": "application/json",
							"x-apikey": "63e60003478852088da67ff3",
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