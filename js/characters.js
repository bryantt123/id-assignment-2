const characterList = document.querySelector('#character-list');

const fetchCharacters = async () => {
  try {
    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": "https://idasg2-fc8e.restdb.io/rest/characters-owned",
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
        characters.forEach((character) => {
            const characterCard = document.createElement('div');
            characterCard.classList.add('character-card');

            const characterImage = document.createElement('div');
            characterImage.classList.add('character-image');
            characterImage.style.backgroundImage = `url(${character.charImage})`;

            const characterName = document.createElement('div');
            characterName.classList.add('character-name');
            characterName.innerText = character.character;

            characterCard.appendChild(characterImage);
            characterCard.appendChild(characterName);

            characterList.appendChild(characterCard);
        })
    })
  } catch (error) {
    console.error(error);
  }
};

fetchCharacters();