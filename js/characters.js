function getCharactersOwned() {
    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": "https://idasg2-fc8e.restdb.io/rest/characters-owned",
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "x-apikey": "63e60003478852088da67ff3",
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
                                <button>go with this!</button>
                            </div>
                        </div>`;
                    } else if (item.character === "Yoimiya"){
                        cards += `
                        <div class="card">
                            <div class="card-image">
                                <img src="pics/yoimiya.png" alt="Character">
                            </div>

                            <div class="card-body">
                                <h2>${item.character}</h2>
                                <p>${item.charDesc}</p>
                            </div>

                            <div class="selector">
                                <button>go with this!</button>
                            </div>
                        </div>`;
                    } else if (item.character === "Kaeya"){
                        cards += `
                        <div class="card">
                            <div class="card-image">
                                <img src="pics/kaeya.png" alt="Character">
                            </div>

                            <div class="card-body">
                                <h2>${item.character}</h2>
                                <p>${item.charDesc}</p>
                            </div>

                            <div class="selector">
                                <button>go with this!</button>
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
                                <button>go with this!</button>
                            </div>
                        </div>`;
                    } else if (item.character === "Bennett"){
                        cards += `
                        <div class="card">
                            <div class="card-image">
                                <img src="pics/bennet.png" alt="Character">
                            </div>

                            <div class="card-body">
                                <h2>${item.character}</h2>
                                <p>${item.charDesc}</p>
                            </div>

                            <div class="selector">
                                <button>go with this!</button>
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
                                <button>go with this!</button>
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
                                <button>go with this!</button>
                            </div>
                        </div>`;
                    } else if (item.character === "Xiao"){
                        cards += `
                        <div class="card">
                            <div class="card-image">
                                <img src="pics/xiao.png" alt="Character">
                            </div>

                            <div class="card-body">
                                <h2>${item.character}</h2>
                                <p>${item.charDesc}</p>
                            </div>

                            <div class="selector">
                                <button>go with this!</button>
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
                                <button>go with this!</button>
                            </div>
                        </div>`;
                    } else if (item.character === "Wanderer"){
                        cards += `
                        <div class="card">
                            <div class="card-image">
                                <img src="pics/wanderer.png" alt="Character">
                            </div>

                            <div class="card-body">
                                <h2>${item.character}</h2>
                                <p>${item.charDesc}</p>
                            </div>

                            <div class="selector">
                                <button>go with this!</button>
                            </div>
                        </div>`;
                    }
                cardsContainer.innerHTML = cards;
            })
        })
    })
}

getCharactersOwned();