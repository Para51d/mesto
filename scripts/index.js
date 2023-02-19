const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closeButton = popup.querySelector(".popup__button-close");

let formElement = document.querySelector(".popup__container");
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_info");
let profileName = document.querySelector(".profile__username");
let profileJob = document.querySelector(".profile__text");

//открытие popup.
const toggleOpenPopup = () => {
    popup.classList.toggle("popup_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
};

// функция замены данных в профайле на строку из Input
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

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// создание переменных
const cards = document.querySelector(".places");
const popupAdd = document.querySelector(".popup_type_add-place");
const form = popupAdd.querySelector(".popup__container");
const temlpate = document.querySelector("#item");
const cardImage = temlpate.querySelector(".card__image");
const popupTypeImage = document.querySelector(".popup_type_image");
const closeButtonImage = popupTypeImage.querySelector(".popup__button-close");
const popupImg = popupTypeImage.querySelector(".popup__image");
const popupImgComment = popupTypeImage.querySelector(".popup__figcaption");


// Создание новых карточек на основании массива
function createCard(item) {

    // создание карточки из массива
    const templateCard = temlpate.content.cloneNode(true);
    templateCard.querySelector(".card__image").src = item.link;
    templateCard.querySelector(".card__image").alt = item.name;
    templateCard.querySelector(".card__title").textContent = item.name;

    // Like
    const likeButton = templateCard.querySelector(".card__button-like");
    activeLike = () => {
        likeButton.classList.toggle("card__button-like_active");
    }
    likeButton.addEventListener("click", activeLike);


    // удаление карточки
    const deleteButton = templateCard.querySelector(".card__button-removal");
    deleteButton.addEventListener("click", (evt) => {
        evt.target.closest(".card").remove()
    });


    // Открытие - закрытие картинки    
    templateCard.querySelector(".card__image").addEventListener("click", () => {
        popupTypeImage.classList.toggle("popup_opened");
        popupImg.src = item.link;
        popupImgComment.textContent = item.name;
    });

    closeButtonImage.addEventListener("click", () => {
        popupTypeImage.classList.remove("popup_opened");
    });

    return templateCard;
}

initialCards.forEach(function (item) {
    const cardElement = createCard(item);
    cards.append(cardElement);
});


const editButtonCard = document.querySelector(".profile__add-button");
const addFormCard = document.querySelector(".popup_type_add-place");

const closeButtonAdd = popupAdd.querySelector(".popup__button-close");
const formElementAdd = popupAdd.querySelector(".popup__container");
const addButtomCard = popupAdd.querySelector(".popup__button-save");
const nameInputAdd = popupAdd.querySelector(".popup__input_type_name");
const imageInputAdd = popupAdd.querySelector(".popup__input_type_image");

editButtonCard.addEventListener("click", () => {
    popupAdd.classList.toggle("popup_opened")
});

formElementAdd.addEventListener("submit", (e) => {
    e.preventDefault();
    const ManualCard = {
        name: nameInputAdd.value,
        link: imageInputAdd.value
    };
    const cardElement = createCard(ManualCard);
    cards.prepend(cardElement);

    popupAdd.classList.remove("popup_opened");

    imageInputAdd.value = " ";
    nameInputAdd.value = " ";

});

closeButtonAdd.addEventListener("click", () => {
    popupAdd.classList.remove("popup_opened")
});
