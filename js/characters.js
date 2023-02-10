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
                cards += `
                <div class="card">
                    <div class="card-image">
                        <img src="${item.charImage}" alt="Character">
                    </div>

                    <div class="card-body">
                        <h2>${item.character}</h2>
                        <p>${item.charDesc}</p>
                    </div>

                    <div class="selector">
                        <button>go with this!</button>
                    </div>
                </div>`;
                });
                cardsContainer.innerHTML = cards;
            })
        })
}

getCharactersOwned();