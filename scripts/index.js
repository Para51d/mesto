const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closeButton = popup.querySelector(".popup__button-close");

let formElement = document.querySelector(".popup__container");
let nameInput = document.querySelector(".popup__container_name");
let jobInput = document.querySelector(".popup__container_info");
let profileName = document.querySelector(".profile__username");
let profileJob = document.querySelector(".profile__text");


const toggleOpenPopup = () => {
    popup.classList.toggle("popup_opened");
};

function handleFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    toggleOpenPopup();
}

formElement.addEventListener('submit', handleFormSubmit);

const handleEditButtonClick = () => {
    toggleOpenPopup();
};

const handleCloseButtonClick = () => {
    toggleOpenPopup();
};

//const handleOverlyClick = (event) => {
// if (event.target === event.currentTarget) {
//     toggleOpenPopup();
// }
//};

editButton.addEventListener("click", handleEditButtonClick);
closeButton.addEventListener("click", handleCloseButtonClick);
//popup.addEventListener("click", handleOverlyClick);