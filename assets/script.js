

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

    const testId = new Array();


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
        character.forEach(({ name, shortDescription, image, description, id}) => {
            const cardTemplate = document.querySelector('#template');
            const target = document.querySelector('#target');
            const cardClone = cardTemplate.cloneNode(true).content;

            cardClone.querySelector('#name').innerHTML = name;
            cardClone.querySelector('#short-description').innerHTML = shortDescription;
            cardClone.querySelector('#image').src = `data:image/*;base64,${image}`;
            cardClone.querySelector('#long-description').innerHTML = description;

            target.appendChild(cardClone);

            testId.push(id);
           
        });
            console.log(testId)
    }

    ourApi.then(character => {
        displayCharactersCards(character);
        console.log(character);
    })


    // collapse description
    function openCharacterCard() {
        const longDescriptionButton = document.getElementsByClassName('long-description-button');
        
        const cardName = document.getElementsByClassName('name-for-modal');
        const shortDescription = document.getElementsByClassName('short-for-modal');
        const longDescription = document.getElementsByClassName('long-for-modal');
        const cardImage = document.getElementsByClassName('image-for-modal');

        for (let i = 0; i < longDescriptionButton.length; i++) {
            longDescriptionButton[i].addEventListener('click', function () {

                let modalName = document.getElementById('exampleModalLabel');
                let modalShortDescription = document.getElementById('short-modal-description');
                let modalLongDescription = document.getElementById('long-modal-description');
                let modalImage = document.getElementById('modal-image');

                modalName.textContent = cardName[i].textContent;
                modalShortDescription.textContent = shortDescription[i].textContent;
                modalLongDescription.textContent = longDescription[i].textContent;
                modalImage.src = cardImage[i].src;
            });
        }
    }

    ourApi.then(() => {
       openCharacterCard();
    })

    //create a character
   
    // // function refresh

    
    
    // delete a character
    function deleteCharacter(){
        const deleteButton = document.getElementsByClassName('delete');
        let test;
        
        
        for (let i = 0; i < deleteButton.length; i++) {
            deleteButton[i].addEventListener('click', async function () {
                
                
                test = confirm('are you sure you want to delete this character?');
                
                if(test == true ){
                    const id = testId[i];
                    console.log(id)

                    try {
                        const response = await fetch(`https://character-database.becode.xyz/characters/${id}`, {
                            method: 'DELETE',
                            headers: {
                                "Content-Type": "application/json",
                            },
                        });

                        const deletedCharacter = await response.json();
                        console.log(deletedCharacter);
                        location.reload();
                        
                    } catch (error) {
                        console.error(error);
                    }
                  


                }else{
                    
                    alert('This character has not been deleted');
                }


            });
        };


     }
     ourApi.then(() => {
        deleteCharacter();
     })
    // edit a character

    // /!\ ne pas oublier de ne "rien" mettre dans les champs pour que ce soit pris en compte
})();
