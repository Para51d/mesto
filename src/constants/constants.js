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

const options = {
    formSelector: ".form",
    submitSelector: ".form__save",
    inputSelector: ".form__input",
    inputInvalidClass: "form__input_invalid",
    inputSectionSelector: ".form__section",
    inputErrorClass: "form__input-error_active",
    inputErrorSelector: ".form__input-error",
    disabledButtonClass: "form__save_inactive",
};

export const buttonEditProfile = document.querySelector(".profile__edit-button");
export const buttonProfileCardEdit = document.querySelector(".profile__add-button");

export const popupEditProfile = document.querySelector(".popup_type_profile");
export const formEditProfile = popupEditProfile.querySelector(".form");
export const namePopupInput = popupEditProfile.querySelector(".form__input_name");
export const jobPopupInput = popupEditProfile.querySelector(".form__input_info");

export const popupTypeAddCard = document.querySelector(".popup_type_add-place");
export const formPopupTypeAddCard = popupTypeAddCard.querySelector(".form");
export const placeCards = document.querySelector(".places");

export { initialCards, options };