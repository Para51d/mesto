import "./index.css";

import { Card } from "../components/Card.js";
import { Api } from "../components/Api.js";
import { options, settings, profileInfo } from "../constants/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";

import {
    popupWithConfirmation,
    buttonEditProfile,
    popupProfileSection,
    popupEditAvatar,
    popupIncreaseImage,
    buttonProfileCardEdit,
    buttonChangeAvatar,
    formPopupChangeAvatar,
    formEditProfile,
    popupTypeAddPlace,
    formPopupTypeAddCard,
    placeCards,
    cardTemplate
} from "../constants/constants.js";


let userId;

const userInfo = new UserInfo(profileInfo);
const api = new Api(settings);

///////открытие попапа для редактирования профиля
const handleEditProfile = () => {
    const { name, about } = userInfo.getUserInfo();
    popupEditProfile.setInputValues({ name, about });
    profileValidation.resetValidation();
    popupEditProfile.open();
};

//запрос на добавление новой карточки
const handleAddCard = (data) => {
    popupTypeAddCard.blockButton('Создание...');
    api.addNewCard(data)
        .then(res => {
            renderCard(res, true);
            popupTypeAddCard.close();
        })
        .catch(error => console.log(`Ошибка: ${error}`))
        .finally(() => popupTypeAddCard.blockButton('Создать', false));
};

///////запрос на сохранение изменений профиля
const handleSaveProfile = (data) => {
    popupEditProfile.blockButton('Сохранение...');
    api.editUserInfo(data)
        .then(res => {
            userInfo.setUserInfo(res);
            popupEditProfile.close()
        })
        .catch(error => console.log(`Ошибка: ${error}`))
        .finally(() => popupEditProfile.blockButton('Сохранить', false));
};

////////запрос на сохранение изменений аватара
const handleSaveAvatar = (data) => {
    popupChangeAvatar.blockButton('Сохранение...');
    api.changeUserAvatar(data)
        .then(res => {
            userInfo.setUserAvatar(res);
            popupChangeAvatar.close();
        })
        .catch(error => console.log(`Ошибка: ${error}`))
        .finally(() => popupChangeAvatar.blockButton('Сохранить', false));
};

//запрос на обработку лайка карточки
const handleLikeClick = (cardId, isLiked, card) => {
    card.blockLikeButton();
    api.handleLike(cardId, isLiked)
        .then(res => {
            card.checkLike(res.likes);
        })
        .catch(error => console.log(`Ошибка: ${error}`))
        .finally(() => card.blockLikeButton(false));
};

//запрос на удаление карточки
const deleteCard = (cardId, card) => {
    popupWithDeleteConfirmation.blockButton('Удаление...');
    api.deleteCard(cardId)
        .then(() => {
            card.handleDeleteCard();
            popupWithDeleteConfirmation.close();
        })
        .catch(error => console.log(`Ошибка: ${error}`))
        .finally(() => popupWithDeleteConfirmation.blockButton('Да', false));
};

//открытие попапа для подтверждения удаления карточки
const handleClickDeleteButton = (cardId, card) => {
    popupWithDeleteConfirmation.handleSubmit(() => deleteCard(cardId, card));
    popupWithDeleteConfirmation.open();
};

//открытие попапа с увеличенной картинкой
const handleCardClick = (name, link) => {
    popupWithPic.open(name, link);
};

//отрисовка и добавление новой карточки
const renderCard = (cardData, isStart) => {
    const card = new Card(cardData, cardTemplate, handleCardClick, handleLikeClick, handleClickDeleteButton, userId);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement, isStart);
};

const cardList = new Section(renderCard, placeCards);

const popupWithDeleteConfirmation = new PopupWithConfirmation(popupWithConfirmation);
popupWithDeleteConfirmation.setEventListeners();

const popupWithPic = new PopupWithImage(popupIncreaseImage);
popupWithPic.setEventListeners();

const popupTypeAddCard = new PopupWithForm(popupTypeAddPlace, handleAddCard);
popupTypeAddCard.setEventListeners();

const popupEditProfile = new PopupWithForm(popupProfileSection, handleSaveProfile);
popupEditProfile.setEventListeners();

const popupChangeAvatar = new PopupWithForm(popupEditAvatar, handleSaveAvatar);
popupChangeAvatar.setEventListeners();


/////////// валидация форм //
const profileValidation = new FormValidator(options, formEditProfile);
profileValidation.enableValidation();

const formCardValidation = new FormValidator(options, formPopupTypeAddCard);
formCardValidation.enableValidation();

const avatarChangeValidation = new FormValidator(options, formPopupChangeAvatar);
avatarChangeValidation.enableValidation();

Promise.all([
    api.getUserInfo(),
    api.getInitialCards()
])
    .then(([userData, cards]) => {
        userId = userData._id;
        userInfo.setUserInfo(userData);
        userInfo.setUserAvatar(userData);
        cardList.renderItems(cards);
    })
    .catch(error => console.log(`Ошибка: ${error}`));

buttonChangeAvatar.addEventListener('click', () => {
    avatarChangeValidation.resetValidation();
    popupChangeAvatar.open();
});

buttonEditProfile.addEventListener('click', handleEditProfile);

buttonProfileCardEdit.addEventListener('click', () => {
    formCardValidation.resetValidation();
    popupTypeAddCard.open();
});
