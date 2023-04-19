import "./index.css";

import { Card } from "../components/Card.js";
import { initialCards, options } from "../constants/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";

import {
    buttonEditProfile,
    buttonProfileCardEdit,
    formEditProfile,
    namePopupInput,
    jobPopupInput,
    formPopupTypeAddCard,
    placeCards
} from "../constants/constants.js";

// UserInfo, который отвечает за управление отображением информации о пользователе на странице//
const user = new UserInfo({ nameSelector: ".profile__username", jobSelector: ".profile__text" });

//создание новой карточки//
function createCard(item) {
    const card = new Card(item, "#item", viewPopupImagePic)
    return card.generateCard();
}

// Section, который отвечает за отрисовку элементов на странице//
const cardsList = new Section({
    items: initialCards, renderer: (data) => {
        cardsList.addItem(createCard(data));
    }
},
    placeCards
);

cardsList.renderItems();

// попап редкатирования профиля //
const popupProfile = new PopupWithForm(".popup_type_profile", (inputs) => {
    user.setUserInfo(inputs);
    popupProfile.close();
});

popupProfile.setEventListeners();

function popupProfileOpen({ name, job }) {
    console.log(name);
    console.log(job);
    namePopupInput.value = name;
    jobPopupInput.value = job;

    popupProfile.open();
}

buttonEditProfile.addEventListener("click", () => {
    popupProfileOpen(user.getUserInfo());
    profileValidation.resetValidation();
})

// попап добавления карточки //
const popupAdd = new PopupWithForm(".popup_type_add-place", ({ name, link }) => {
    cardsList.addItem(createCard({ name, link }));
    popupAdd.close();
})
popupAdd.setEventListeners();


buttonProfileCardEdit.addEventListener("click", () => {
    popupAdd.open();
    formCardValidation.resetValidation();
})

// попап просмотра изображения //
const popupViewImage = new PopupWithImage(".popup_type_image")
popupViewImage.setEventListeners();

function viewPopupImagePic(name, link) {
    popupViewImage.open(name, link);
}


// валидация форм //
const profileValidation = new FormValidator(options, formEditProfile);
profileValidation.enableValidation();

const formCardValidation = new FormValidator(options, formPopupTypeAddCard);
formCardValidation.enableValidation();