const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup");
const buttonCloseProfile = popupEditProfile.querySelector(".popup__button-close");

const formEditProfile = document.querySelector(".popup__container");
const namePopupInput = document.querySelector(".popup__input_type_name");
const jobPopupInput = document.querySelector(".popup__input_type_info");
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
allButtonsClose.forEach((button) => {

  const activePopup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(activePopup));
});

function openPopup(activePopup) {
  activePopup.classList.add("popup_opened");
}

function closePopup(activePopup) {
  activePopup.classList.remove("popup_opened");
}

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
const formPopupTypeAddCard = popupTypeAddCard.querySelector(".popup__container");

const nameInputPopupTypeAddCard = popupTypeAddCard.querySelector(".popup__input_type_name");
const imageInputPopupTypeAddCard = popupTypeAddCard.querySelector(".popup__input_type_image");

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
});