

// creation of a class character
// class Character {
//     constructor(name, shortDescription, description, image) {
//         this.name = name;
//         this.shortDescription = shortDescription;
//         this.description = description;
//         this.image = image;
//     }
// }

async function fetchApi() {
    try {
        const myFetch = await fetch('https://character-database.becode.xyz/characters');
        const data = await myFetch.json();
        console.log(data);

        data.forEach(({ name, shortDescription, image }) => {
            const cardTemplate = document.querySelector('#template');
            const target = document.querySelector('#target');
            const cardClone = cardTemplate.cloneNode(true).content;

            cardClone.querySelector('#name').innerHTML = name;
            cardClone.querySelector('#short-description').innerHTML = shortDescription;
            cardClone.querySelector('#image').src = image;


            target.appendChild(cardClone);
        });

    } catch (error) {
        console.error(error);
    }
}
fetchApi();

// function newCharacter(data) {
//     data.forEach(character => {
//         const cardTemplate = document.querySelector('#template');
//         const target = document.querySelector('#target');
//         const cardClone = cardTemplate.cloneNode(true).content;

//         cardClone.querySelector('#name').innerHTML = character.name;
//         cardClone.querySelector('#short-description').innerHTML = character.description;

//         target.appendChild(cardClone);
//     });
// }

// test.then(data => {
//     newCharacter(data);
//     console.log(data);
// })