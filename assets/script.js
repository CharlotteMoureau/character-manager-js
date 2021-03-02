

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
    function collapseDescription(character) {
      const longDescriptionButton = document.getElementsByClassName('long-description-button');
      const modalName = document.getElementsByClassName('modal-name');
    console.log(modalName);
      for(let i = 0 ; i<longDescriptionButton.length; i++){
        longDescriptionButton[i].addEventListener('click', function () {
            console.log(i);
              console.log(modalName[i]);

            const modalTemplate = document.querySelector('#modal-template');
            const targetModal = document.querySelector('#target-modal');
            const modalClone = modalTemplate.cloneNode(true).content;

            modalClone.querySelector('.modal-title').innerHTML = modalName[i];
          //  console.log(modalClone.querySelector('.modal-title').innerHTML)
          /*  modalClone.querySelector('#short-modal-description').innerHTML = shortDescription;
            modalClone.querySelector('#modal-image').src = `data:image/*;base64,${image}`;
            modalClone.querySelector('#long-modal-description').innerHTML = description;*/
            //console.log(modalClone);
            targetModal.appendChild(modalClone);
        });
}
    }

    ourApi.then(character => {
        collapseDescription();
    })


})();
