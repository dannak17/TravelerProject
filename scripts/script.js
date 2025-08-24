//Array with default place cards with name, image and description
const cards = [
    {
        name: "Dancer",
        image: "https://images.pexels.com/photos/28978570/pexels-photo-28978570.jpeg",
        description: "Traditional Clothes"
    },
    {
        name: "Mexico",
        image: "https://images.pexels.com/photos/1573471/pexels-photo-1573471.jpeg",
        description: "Mexico's Flag"
    },
    {
        name: "Place",
        image: "https://images.pexels.com/photos/415611/pexels-photo-415611.jpeg",
        description: "A beautiful sunset"
    },
];

//Here is where is the modal windows
const modalImageView = document.querySelector("#modal-image-view");
const ModalNewPlace = document.querySelector("#modal-new-place");
const modalProfile = document.querySelector("#modal-profile")
//Profile section elements
const travelerProfilEditBtn = document.querySelector("#button-edit");
const travelerProfileAddPlaceBtn = document.querySelector(".traveler-profile__add-place-btn");
const travelerProfileDetails = document.querySelector(".traveler-profile__details");
const travelerProfileName = document.querySelector("#traveler-profile__name");
const travelerProfileBio = document.querySelector(".traveler-profile__bio");
//Declare the profile editing
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");
//This is a gallery list where place cards will be displayed
const placesGalleryList = document.querySelector(".places-gallery__list");
//Here close buttons for all modals
const modalClose = Array.from(document.querySelectorAll(".modal__close"));
//Here is where we save all the forms in index.html
const modalForms = Array.from(document.querySelectorAll(".modal__form"));
//This function take all the inputs in a form and then validates the data using the required fields
const validarBoton = (modalInputs) => {
    return modalInputs.some((inputElement) => !inputElement.validity.valid);
}
//Creates a new place card from the template and appends it to the gallery
const createCard = (card) => {
    //Clone template content
    const templatePlaceCard = document.querySelector("#template-place-card").content.cloneNode(true);

    //Place card elements
    const placeCardImage = templatePlaceCard.querySelector(".place-card__image");
    const placeCardTitle = templatePlaceCard.querySelector(".place-card__title");

    //Set image, description and name title
    placeCardImage.src = card.image;
    placeCardImage.alt = card.description;
    placeCardTitle.textContent = card.name;

    //Open image modal when clicking on card image
    placeCardImage.addEventListener("click", () => {
        modalImageView.classList.add("modal_is-opened");
        const modalImage = modalImageView.querySelector(".modal__image");
        const modalCaption = modalImageView.querySelector(".modal__caption");
        modalImage.src = placeCardImage.src;
        modalImage.alt = placeCardImage.alt;
        modalCaption.textContent = placeCardTitle.textContent;
    });

    //Delete card when clicking the delete button
    templatePlaceCard.querySelector(".place-card__delete-button").addEventListener("click", (evt) => {
        evt.target.closest(".place-card").remove();
    });

    //This button toggles activate state from the card
    const placeCardLikeButton = templatePlaceCard.querySelector(".place-card__like-button");
    placeCardLikeButton.addEventListener("click", () => {
        placeCardLikeButton.classList.toggle("place-card__like-button_is-active");
    });

    //Add the card info to gallery 
    placesGalleryList.appendChild(templatePlaceCard);
};

//This close modals when clicking x button
modalClose.forEach((modalClose) => {
    modalClose.addEventListener("click", (evt) => {
        let modal = evt.target.closest(".modal");
        modal.classList.remove("modal_is-opened");
    });
});

//Add new place form listener
ModalNewPlace.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const tempCard = {};
    const form = ModalNewPlace.querySelector(".modal__form");
    const modalInputs = Array.from(form.querySelectorAll(".modal__input"));
    
    modalInputs.forEach((modalInput) => {
        tempCard[modalInput.name] = modalInput.value;
    });

    //create a temporary card  
    createCard(tempCard);

    //reset and close modal
    form.reset();
    ModalNewPlace.classList.remove("modal_is-opened");
});

//Validate all forms in real time, if user enter a invalid data or incorrect format on inputs shows message "Error"
modalForms.forEach((modalForm) => {
    const modalInputs = Array.from(modalForm.querySelectorAll(".modal__input"));
    const modalButton = modalForm.querySelector(".modal__button");

    modalButton.disabled = validarBoton(modalInputs);

    modalInputs.forEach((modalInput) => {
        modalInput.addEventListener("input", () => {
            modalButton.disabled = validarBoton(modalInputs);
            let modalError = modalForm.querySelector("#" + modalInput.id + "-error");
            if (!modalInput.validity.valid) {
                modalError.textContent = "Error!";
                modalError.classList.add("modal__error_visible");
            } else {
                modalError.textContent = "";
                modalError.classList.remove("modal__error_visible");
            }
        });
    });
});

//Open a modal "Add New Place"
travelerProfileAddPlaceBtn.addEventListener("click", () => {
    ModalNewPlace.classList.add("modal_is-opened");
});

//Render default cards at the beginning on page load
cards.forEach((card) => createCard(card));

//Submit profile edit form
modalProfile.addEventListener("submit", (evt) => {
    evt.preventDefault();
    travelerProfileName.textContent = profileName.value;
    travelerProfileBio.textContent = profileDescription.value;
    modalProfile.classList.remove("modal_is-opened");
});

//Open a modal "Edit profile"
travelerProfilEditBtn.addEventListener("click", () => {
    profileName.value = travelerProfileName.textContent;
    profileDescription.value = travelerProfileBio.textContent;
    modalProfile.classList.add("modal_is-opened");
});
