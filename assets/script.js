(() => {

  const characterId = new Array();
  const cardName = document.getElementsByClassName('name-for-modal');
  const shortDescription = document.getElementsByClassName('short-for-modal');
  const longDescription = document.getElementsByClassName('long-for-modal');
  const cardImage = document.getElementsByClassName('image-for-modal');

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

  // open character card
  function openCharacterCard() {
    const longDescriptionButton = document.getElementsByClassName('long-description-button');

    for (let i = 0; i < longDescriptionButton.length; i++) {
      longDescriptionButton[i].addEventListener('click', function () {

        let modalName = document.getElementById('name-modal');
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
      // console.log(image);
        return image;
      };
      console.log(reader);
      reader.readAsDataURL(file)
      const tst = image;
      console.log(tst);
      return image;


    });
  }

   function transformToUri(tst) {

     // console.log(test);
     const inputs = Array.from(document.getElementsByClassName("edits"));
     const values = inputs.map(({ value }) => value.trim());
     let canvas = document.createElement("canvas");
     context = canvas.getContext('2d');
       base_image = new Image();
       base_image.src = values[3];
       base_image.onload = function () {
         context.drawImage(base_image, 100, 100);
       }


     // make_base(values);
     let jpegUrl = canvas.toDataURL("image/jpeg");

     return txt;
   };

  //edit character
  function editCharacter(tst) {
    const outerEditButton = document.getElementsByClassName('outer-edit');
    const innerEditButton = document.getElementById('edit-inside-modal');
    // createImage(image);
    // const txt = image[1].outerHTML;
    // var cut = txt.slice(92);
    // cut = txt.substring(91, txt.length - 8);
    // console.log(cut);

//console.log(tst);
    for (let i = 0; i < outerEditButton.length; i++) {
      outerEditButton[i].addEventListener('click', () => {

        let modalName = document.getElementById('edit-name');
        let modalShortDescription = document.getElementById('edit-short-description');
        let modalLongDescription = document.getElementById('edit-long-description');

        modalName.value = cardName[i].textContent;
        modalShortDescription.value = shortDescription[i].textContent;
        modalLongDescription.textContent = longDescription[i].textContent;

        innerEditButton.addEventListener('click', async () => {
          const editInputs = Array.from(document.getElementsByClassName("edits"));
          const editValues = editInputs.map(({ value }) => value.trim());
          // let uriImage = transformToUri(base_image);
          // console.log(uriImage);

           editValues[3] = cut;
           // editValues[3] = editValues[3].substring(23);
           console.log(editValues[3]);

          if (editValues.some((value) => value === "")) {
            alert("there's an empty input!");
            return;
          }
          else {
            const [name, shortDescription, description, image] = editValues;
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
              // location.reload();

            } catch (error) {
              console.error(error);
            }
          }
        });
      });
    }
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
    editCharacter();
  })
})();
