(() => {

  const characterId = new Array();

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
    character.forEach(({ name, shortDescription, image, description, id }) => {
      const cardTemplate = document.querySelector('#template');
      const target = document.querySelector('#target');
      const cardClone = cardTemplate.cloneNode(true).content;

      cardClone.querySelector('#name').innerHTML = name;
      cardClone.querySelector('#short-description').innerHTML = shortDescription;
      cardClone.querySelector('#image').src = `data:image/*;base64,${image}`;
      cardClone.querySelector('#long-description').innerHTML = description;

      target.appendChild(cardClone);

      characterId.push(id);
    });
  }

  // collapse description
  function openCharacterCard() {
    const longDescriptionButton = document.getElementsByClassName('long-description-button');

    const cardName = document.getElementsByClassName('name-for-modal');
    const shortDescription = document.getElementsByClassName('short-for-modal');
    const longDescription = document.getElementsByClassName('long-for-modal');
    const cardImage = document.getElementsByClassName('image-for-modal');

    for (let i = 0; i < longDescriptionButton.length; i++) {
      longDescriptionButton[i].addEventListener('click', function () {

        let modalName = document.getElementById('openModalLabel');
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

  // form
  function correctForm() {

    document.getElementById('submit').addEventListener('click', async () => {
      const inputs = Array.from(document.getElementsByClassName("inputs"));
      const values = inputs.map(({value}) => value.trim());

      if (values.some((value) => value ==="")){
        alert("there's an empty input!");
        return;
      }
      else{
        createCharacter(values);
      }

    });
  }



  //create a character

  async function createCharacter(values){
    try {

      const [name, shortDescription, description] = values;
      const response = await fetch('https://character-database.becode.xyz/characters', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          shortDescription,
          description,
          image,
        }),
      });

      const createdCharacter = await response.json();
      console.log(createdCharacter);
      location.reload();

    } catch (error) {
      console.error(error);
    }
  }
  //create image
  function createImage(element){
    document.querySelector("#input-image").addEventListener("change",(element) => {
      const file = element.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        image = reader.result.replace('data:', '').replace(/^.+,/, '');
      };
      reader.readAsDataURL(file)
    });

  }

  //edit an element
/*  function editCharacter(){
    const editButton = document.getElementsByClassName('submit-edit');


    const cardName = document.getElementsByClassName('name-for-modal');
    const shortDescription = document.getElementsByClassName('short-for-modal');
    const longDescription = document.getElementsByClassName('long-for-modal');
    const cardImage = document.getElementsByClassName('image-for-modal');

    for (let i = 0; i < editButton.length; i++) {
      editButton[i].addEventListener('click', async function () {

        let editName = document.getElementById('edit-name');
        let editShortDescription = document.getElementById('edit-short-description');
        let editLongDescription = document.getElementById('edit-long-description');
        let editImage = document.getElementById('edit-image');

        editName.value = cardName[i].textContent;
        editShortDescription.value = shortDescription[i].textContent;
        editLongDescription.textContent = longDescription[i].textContent;
        editImage.src = cardImage[i].src;

        const [name, shortDescription, description] = values;
        const id = characterId[i];
        try {
          const response = await fetch(`https://character-database.becode.xyz/characters/${id}`, {
            method: 'PUT',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              shortDescription,
              description,
              image,
            }),
          });

          const editedCharacter = await response.json();
          console.log(editedCharacter);
          //  location.reload();

        } catch (error) {
          console.error(error);
        }
      });
    };
  }*/

  // delete a character
  function deleteCharacter() {
    const deleteButton = document.getElementsByClassName('delete');
    let askToConfirm;

    for (let i = 0; i < deleteButton.length; i++) {
      deleteButton[i].addEventListener('click', async function () {

        askToConfirm = confirm('are you sure you want to delete this character?');

        if (askToConfirm == true) {
          const id = characterId[i];

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
        } else {
          alert('This character has not been deleted');
        }
      });
    };
  }

  // edit a character

  // /!\ ne pas oublier de ne "rien" mettre dans les champs pour que ce soit pris en compte
  ourApi.then(character => {
    displayCharactersCards(character);
    openCharacterCard();
    deleteCharacter();
    createImage();
    correctForm();

  })
})();
