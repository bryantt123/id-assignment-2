function getCharactersOwned() {
    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": "https://idasg2-e717.restdb.io/rest/characters-owned",
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "x-apikey": "63e63782478852088da68022",
          "cache-control": "no-cache"
        }
      })
      .done(function(response){
            const chars = response.filter(char => char.username === JSON.parse(localStorage.getItem('username')));
            chars.forEach(char => {
                const cardsContainer = document.querySelector(".container");
                let cards = "";
                chars.forEach(function(item) {
                    if(item.character === "Yelan"){
                        cards += `
                        <div class="card">
                            <div class="card-image">
                                <img src="pics/yelan.png" alt="Character">
                            </div>

                            <div class="card-body">
                                <h2>${item.character}</h2>
                                <p>${item.charDesc}</p>
                            </div>

                            <div class="selector">
                                <button>CHOOSE</button>
                            </div>
                        </div>`;
                    } else if (item.character === "Yoimiya"){
                        cards += `
                        <div class="card">
                            <div class="card-image">
                                <img src="pics/yoimiya.webp" alt="Character">
                            </div>

                            <div class="card-body">
                                <h2>${item.character}</h2>
                                <p>${item.charDesc}</p>
                            </div>

                            <div class="selector">
                                <button>CHOOSE</button>
                            </div>
                        </div>`;
                    } else if (item.character === "Kaeya"){
                        cards += `
                        <div class="card">
                            <div class="card-image">
                                <img src="pics/kaeya.webp" alt="Character">
                            </div>

                            <div class="card-body">
                                <h2>${item.character}</h2>
                                <p>${item.charDesc}</p>
                            </div>

                            <div class="selector">
                                <button>CHOOSE</button>
                            </div>
                        </div>`;
                    } else if (item.character === "Kazuha"){
                        cards += `
                        <div class="card">
                            <div class="card-image">
                                <img src="pics/kazuha.png" alt="Character">
                            </div>

                            <div class="card-body">
                                <h2>${item.character}</h2>
                                <p>${item.charDesc}</p>
                            </div>

                            <div class="selector">
                                <button>CHOOSE</button>
                            </div>
                        </div>`;
                    } else if (item.character === "Bennett"){
                        cards += `
                        <div class="card">
                            <div class="card-image">
                                <img src="pics/bennet.webp" alt="Character">
                            </div>

                            <div class="card-body">
                                <h2>${item.character}</h2>
                                <p>${item.charDesc}</p>
                            </div>

                            <div class="selector">
                                <button>CHOOSE</button>
                            </div>
                        </div>`;
                    } else if (item.character === "Rosaria"){
                        cards += `
                        <div class="card">
                            <div class="card-image">
                                <img src="pics/rosaria.png" alt="Character">
                            </div>

                            <div class="card-body">
                                <h2>${item.character}</h2>
                                <p>${item.charDesc}</p>
                            </div>

                            <div class="selector">
                                <button>CHOOSE</button>
                            </div>
                        </div>`;
                    } else if (item.character === "Qiqi"){
                        cards += `
                        <div class="card">
                            <div class="card-image">
                                <img src="pics/qiqi.png" alt="Character">
                            </div>

                            <div class="card-body">
                                <h2>${item.character}</h2>
                                <p>${item.charDesc}</p>
                            </div>

                            <div class="selector">
                                <button>CHOOSE</button>
                            </div>
                        </div>`;
                    } else if (item.character === "Xiao"){
                        cards += `
                        <div class="card">
                            <div class="card-image">
                                <img src="pics/xiao.webp" alt="Character">
                            </div>

                            <div class="card-body">
                                <h2>${item.character}</h2>
                                <p>${item.charDesc}</p>
                            </div>

                            <div class="selector">
                                <button>CHOOSE</button>
                            </div>
                        </div>`;
                    } else if (item.character === "Mona"){
                        cards += `
                        <div class="card">
                            <div class="card-image">
                                <img src="pics/mona.png" alt="Character">
                            </div>

                            <div class="card-body">
                                <h2>${item.character}</h2>
                                <p>${item.charDesc}</p>
                            </div>

                            <div class="selector">
                                <button>CHOOSE</button>
                            </div>
                        </div>`;
                    } else if (item.character === "Wanderer"){
                        cards += `
                        <div class="card">
                            <div class="card-image">
                                <img src="pics/wanderer.webp" alt="Character">
                            </div>

                            <div class="card-body">
                                <h2>${item.character}</h2>
                                <p>${item.charDesc}</p>
                            </div>

                            <div class="selector">
                                <button>CHOOSE</button>
                            </div>
                        </div>`;
                    }
                cardsContainer.innerHTML = cards;
            });
        });
    });
}

getCharactersOwned();