

// creation of a class character
// class Character {
//     constructor(name, shortDescription, description, image) {
//         this.name = name;
//         this.shortDescription = shortDescription;
//         this.description = description;
//         this.image = image;
//     }
// }
(() => {
    // fetch API
    async function fetchApi() {
        try {
            const myFetch = await fetch('https://character-database.becode.xyz/characters');
            const character = await myFetch.json();
            return character;
        } catch (error) {
            console.error(error);
        }
    }
    // retrieves the fetchApi function
    let ourApi = fetchApi();

    // clone character's cards
    function displayCharactersCards(character) {
        character.forEach(({ name, shortDescription, image, description }) => {
            const cardTemplate = document.querySelector('#template');
            const target = document.querySelector('#target');
            const cardClone = cardTemplate.cloneNode(true).content;

            cardClone.querySelector('#name').innerHTML = name;
            cardClone.querySelector('#short-description').innerHTML = shortDescription;
            cardClone.querySelector('#image').src = `data:image/*;base64,${image}`;
            cardClone.querySelector('#long-description').innerHTML = description;

            target.appendChild(cardClone);
        });

    }

    ourApi.then(character => {
        displayCharactersCards(character);
        console.log(character);
    })


    // collapse description
    function collapseDescription() {
        document.getElementById('long-description-button').addEventListener('click', function () {
            const longDescription = document.getElementById('long-description');

            if (longDescription.style.display === 'none') {
                longDescription.style.display = 'block';
                console.log('coucou');
            } else {
                longDescription.style.display = 'none';
                console.log('pas coucou');
            }
        });

    }

    ourApi.then(() => {
        collapseDescription();
    })
})();