import { Card } from "./Card.js";
import { initialCards, options } from "./constants.js";
import { FormValidator } from "./FormValidator.js";

const buttonEditProfile = document.querySelector(".profile__edit-button");
const profileNameDefault = document.querySelector(".profile__username");
const profileJobDefault = document.querySelector(".profile__text");

const popupEditProfile = document.querySelector(".popup_type_profile");
const buttonCloseProfile = popupEditProfile.querySelector(".popup__button-close");

const formEditProfile = popupEditProfile.querySelector(".form");
const namePopupInput = popupEditProfile.querySelector(".form__input_name");
const jobPopupInput = popupEditProfile.querySelector(".form__input_info");

const buttonProfileCardEdit = document.querySelector(".profile__add-button");
const popupTypeAddCard = document.querySelector(".popup_type_add-place");
const formPopupTypeAddCard = popupTypeAddCard.querySelector(".form");
const nameInputPopupTypeAddCard = popupTypeAddCard.querySelector(".form__input_title");
const imageInputPopupTypeAddCard = popupTypeAddCard.querySelector(".form__input_link");

const placeCards = document.querySelector(".places");
const temlpateCard = document.querySelector("#item");

const popupTypeImage = document.querySelector(".popup_type_image");
const imgPopupTypeImage = popupTypeImage.querySelector(".popup__image");
const commentPopupTypeImage = popupTypeImage.querySelector(".popup__figcaption");

const CardImg = document.querySelector(".card__image");
const CardTitle = document.querySelector(".card__title");
const allPopups = document.querySelectorAll(".popup")
const allCloseButtons = document.querySelectorAll(".popup__button-close");

initialCards.forEach(function (item) {
    placeCards.append(createCard(item));
});

allCloseButtons.forEach((button) => {
    const popup = button.closest(".popup"); //родитель к кнопке закрытия
    button.addEventListener('click', () => closePopup(popup)); // слушатель закрытия по клику на кнопку
});

// закрытие на кнопку Esc
const closeByEscButton = (evt) => {
    if (evt.key === 'Escape') {
        const activePopup = document.querySelector('.popup_opened');
        closePopup(activePopup);
    };
};

// закрытие модальных окон кликом на оверлей
const closePopupWithBackground = (e) => {
    if (e.target.classList.contains('popup_opened')) {
        closePopup(e.target);
    }
};

function openPopup(activePopup) {
    activePopup.classList.add("popup_opened");
    document.addEventListener('keydown', closeByEscButton);
    document.addEventListener('click', closePopupWithBackground);
}

function closePopup(activePopup) {
    activePopup.classList.remove("popup_opened");
    document.removeEventListener('keydown', closeByEscButton);
    document.removeEventListener('click', closePopupWithBackground);
}

// открытие Popup с картинкой
function increasePopupImagePic(name, link) {
    imgPopupTypeImage.src = link;
    imgPopupTypeImage.alt = name;
    commentPopupTypeImage.textContent = name;

    openPopup(popupTypeImage);
}

// создание новой карточки
function createCard(data) {
    const card = new Card(data, '#item', increasePopupImagePic);
    return card.generateCard();
}

// добавление новой карточки в начало блока
function addNewCard(item) {
    placeCards.prepend(item);
}

// cброс инпутов
function clearInput(e) {
    e.target.reset();
}

//сохранение данных профиля ( Profile )
function handleFormProfileSubmit(e) {
    e.preventDefault();

    profileNameDefault.textContent = namePopupInput.value;
    profileJobDefault.textContent = jobPopupInput.value;
    closePopup(popupEditProfile);
}

// сохранение даных карточки (внесение названия и ссылки на изображение)
function handleFormAddSubmit(e) {
    e.preventDefault();

    const addCard = {
        name: nameInputPopupTypeAddCard.value,
        link: imageInputPopupTypeAddCard.value,
    };
    addNewCard(createCard(addCard));
    closePopup(popupTypeAddCard, clearInput(e));
}

// открытие и редактирование полей попап профиля нажатием на кнопку редактирования
buttonEditProfile.addEventListener('click', function () {
    openPopup(popupEditProfile);
    namePopupInput.value = profileNameDefault.textContent;
    jobPopupInput.value = profileJobDefault.textContent;

    profileValidation.reset();
});

// открытие попап добавления карточки нажатием на кнопку добавления
buttonProfileCardEdit.addEventListener('click', function () {
    openPopup(popupTypeAddCard);
});

formEditProfile.addEventListener('submit', handleFormProfileSubmit);
formPopupTypeAddCard.addEventListener('submit', handleFormAddSubmit);

// валидация форм
const profileValidation = new FormValidator(options, formEditProfile);
profileValidation.enableValidation();

const formCardValidation = new FormValidator(options, formPopupTypeAddCard);
formCardValidation.enableValidation();