const editButton = document.querySelector(".profile__edit-button");

const popup = document.querySelector(".popup");
const closeButton = popup.querySelector(".popup__button-close");

const toggleOpenPopup = () => {
    popup.classList.toggle("popup_opened");
};

const handleEditButtonClick = () => {
    toggleOpenPopup();
};

const handleCloseButtonClick = () => {
    toggleOpenPopup();
};

const handleOverlyClick = (event) => {
    if (event.target === event.currentTarget) {
        toggleOpenPopup();
    }
};

editButton.addEventListener("click", handleEditButtonClick);
closeButton.addEventListener("click", handleCloseButtonClick);

popup.addEventListener("click", handleOverlyClick);

// Находим форму в DOM
let formElement = document.querySelector(".popup");

let nameInput = document.querySelector(".popup__name");
let jobInput = document.querySelector(".popup__info");

function handleFormSubmit(evt) {
    evt.preventDefault();

    document.querySelector(".profile__username").textContent = nameInput.value;
    document.querySelector(".profile__text").textContent = jobInput.value;
    toggleOpenPopup();
}

formElement.addEventListener('submit', handleFormSubmit);
