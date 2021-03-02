

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
        const character = await myFetch.json();
        console.log(character);

        character.forEach(({ name, shortDescription, image }) => {
            const cardTemplate = document.querySelector('#template');
            const target = document.querySelector('#target');
            const cardClone = cardTemplate.cloneNode(true).content;

            cardClone.querySelector('#name').innerHTML = name;
            cardClone.querySelector('#short-description').innerHTML = shortDescription;
            cardClone.querySelector('#image').src = `data:image/*;base64,${image}`;


            target.appendChild(cardClone); 
        });

    } catch (error) {
        console.error(error);
    }
}
fetchApi();

    function collapseDescription(){
    const longDescription = document.getElementById('long-description');
    console.log(longDescription)
    
        if(longDescription.style.display === 'none'){
            longDescription.style.display = 'inline-block';
        }
    
        
    
}
collapseDescription()