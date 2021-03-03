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
      const values = inputs.map(({ value }) => value.trim());

      if (values.some((value) => value === "")) {
        alert("there's an empty input!");
        return;
      }
      else {
        createCharacter(values);

      }

    });
  }

  //create a character

  async function createCharacter(values) {
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
  function createImage(element) {
    document.querySelector("#input-image").addEventListener("change", (element) => {
      const file = element.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        image = reader.result.replace('data:', '').replace(/^.+,/, '');
      };
      reader.readAsDataURL(file)
    });

  }

  //edit form
  function editForm() {

    document.getElementById('edit-inside-modal').addEventListener('click', async () => {

      const inputs = Array.from(document.getElementsByClassName("edits"));
      const editValues = inputs.map(({ value }) => value.trim());

      if (editValues.some((value) => value === "")) {
        alert("there's an empty input!");
        return;
      } else {
        editCharacter(editValues);
      }
    });
  }

  //edit an element
  async function editCharacter() {
    console.log('coucou');
    // const editButton = document.getElementsByClassName('submit-edit');

    // for (let i = 0; i < editButton.length; i++) {
    //   console.log(editButton[i]);
    //   // editButton[i].addEventListener('click', async function () {


    //   //   const [name, shortDescription, description] = editValues;
    //   //   const id = characterId[i];

    //   //   try {
    //   //     const response = await fetch(`https://character-database.becode.xyz/characters/${id}`, {
    //   //       method: 'PUT',
    //   //       headers: {
    //   //         "Content-Type": "application/json",
    //   //       },
    //   //       body: JSON.stringify({
    //   //         name,
    //   //         shortDescription,
    //   //         description,
    //   //         image,
    //   //       }),
    //   //     });
    //   //     console.log("coucou");
    //   //     const editedCharacter = await response.json();
    //   //     console.log(editedCharacter);
    //   //     location.reload();

    //   //   } catch (error) {
    //   //     console.error(error);
    //   //   }
    //   // });
    // };
  }

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

  //appeler toutes les fonctions
  ourApi.then(character => {
    displayCharactersCards(character);
    openCharacterCard();
    deleteCharacter();
    createImage();
    correctForm();
    editForm();
  })
})();
