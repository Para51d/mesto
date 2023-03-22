const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_profile");
const buttonCloseProfile = popupEditProfile.querySelector(".popup__button-close");

const formEditProfile = popupEditProfile.querySelector(".form");
const namePopupInput = popupEditProfile.querySelector(".form__input_name");
const jobPopupInput = popupEditProfile.querySelector(".form__input_info");
const profileNameDefault = document.querySelector(".profile__username");
const profileJobDefault = document.querySelector(".profile__text");

//открытие popup.
const openEditProfileForm = () => {
    openPopup(popupEditProfile);
    namePopupInput.value = profileNameDefault.textContent;
    jobPopupInput.value = profileJobDefault.textContent;
};

// функция замены данных в профайле на строку из Input
function submitEditProfileForm(evt) {
    evt.preventDefault();

    profileNameDefault.textContent = namePopupInput.value;
    profileJobDefault.textContent = jobPopupInput.value;
    closePopup(popupEditProfile);
}

formEditProfile.addEventListener('submit', submitEditProfileForm);

const handleButtonEditProfileClick = () => {
    openEditProfileForm();
};

const handleButtonCloseProfileClick = () => {
    openEditProfileForm();
};

buttonEditProfile.addEventListener("click", handleButtonEditProfileClick);
buttonCloseProfile.addEventListener("click", handleButtonCloseProfileClick);

// создание переменных
const placeCards = document.querySelector(".places");
const temlpateCard = document.querySelector("#item");
const popupTypeImage = document.querySelector(".popup_type_image");
const buttonClosePopupTypeImage = popupTypeImage.querySelector(".popup__button-close");
const imgPopupTypeImage = popupTypeImage.querySelector(".popup__image");
const commentPopupTypeImage = popupTypeImage.querySelector(".popup__figcaption");

//функции открытия и закрытия всех popup
const allButtonsClose = document.querySelectorAll(".popup__button-close");
const allPopups = document.querySelectorAll(".popup")

allButtonsClose.forEach((button) => {
    const activePopup = button.closest(".popup");
    button.addEventListener("click", () => closePopup(activePopup));

});

function openPopup(activePopup) {
    activePopup.classList.add("popup_opened");
    document.addEventListener('keydown', closeByEscButton);
}

function closePopup(activePopup) {
    activePopup.classList.remove("popup_opened");
    document.removeEventListener('keydown', closeByEscButton);
}

// закрытие на кнопку Esc
const closeByEscButton = (evt) => {
    if (evt.key === 'Escape') {
        const activePopup = document.querySelector('.popup_opened');
        closePopup(activePopup);
    };
};

// закрытие попапов кликом на оверлей
allPopups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
            closePopup(popup)
        }
    })
})

// Создание новых карточек на основании массива
function createCard(item) {

    // создание карточки из массива
    const newCard = temlpateCard.content.cloneNode(true);
    const newCardImg = newCard.querySelector(".card__image");
    const newCardTitle = newCard.querySelector(".card__title");

    newCardImg.src = item.link;
    newCardImg.alt = item.name;
    newCardTitle.textContent = item.name;

    // Like
    const buttonLikeNewCard = newCard.querySelector(".card__button-like");
    activeButtonLike = () => {
        buttonLikeNewCard.classList.toggle("card__button-like_active");
    }
    buttonLikeNewCard.addEventListener("click", activeButtonLike);

    // удаление карточки
    const buttonDeleteNewCard = newCard.querySelector(".card__button-removal");
    buttonDeleteNewCard.addEventListener("click", (evt) => {
        evt.target.closest(".card").remove()
    });

    // Открытие - закрытие картинки    
    newCard.querySelector(".card__image").addEventListener("click", () => {
        openPopup(popupTypeImage);
        imgPopupTypeImage.src = item.link;
        imgPopupTypeImage.alt = item.name;
        commentPopupTypeImage.textContent = item.name;
    });

    closePopup(popupTypeImage);

    return newCard;
}

initialCards.forEach(function (item) {
    const elementPlaceCards = createCard(item);
    placeCards.append(elementPlaceCards);
});

const buttonProfileCardEdit = document.querySelector(".profile__add-button");
const popupTypeAddCard = document.querySelector(".popup_type_add-place");

const buttonClosePopupTypeAddCard = popupTypeAddCard.querySelector(".popup__button-close");
const formPopupTypeAddCard = popupTypeAddCard.querySelector(".form");

const nameInputPopupTypeAddCard = popupTypeAddCard.querySelector(".form__input_title");
const imageInputPopupTypeAddCard = popupTypeAddCard.querySelector(".form__input_link");
const buttonSavePopupAdd = popupTypeAddCard.querySelector(".form__save");

buttonProfileCardEdit.addEventListener("click", () => {
    openPopup(popupTypeAddCard);
});

formPopupTypeAddCard.addEventListener("submit", (e) => {
    e.preventDefault();

    const cardData = {
        name: nameInputPopupTypeAddCard.value,
        link: imageInputPopupTypeAddCard.value
    };
    const cardElement = createCard(cardData);
    placeCards.prepend(cardElement);

    closePopup(popupTypeAddCard);
    e.target.reset();

    buttonSavePopupAdd.disabled = true;
});

enableValidation(options);