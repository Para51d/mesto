class Card {
    constructor(data, templateSelector, increasePopupImage) {
        this._name = data.name;
        this._link = data.link;
        this._increasePopupImage = increasePopupImage;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content.querySelector(".card")
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();

        this._elementImage = this._element.querySelector(".card__image");
        this._elementName = this._element.querySelector(".card__title");
        this._elementLike = this._element.querySelector(".card__button-like");
        this._elementTrash = this._element.querySelector(".card__button-removal");

        this._setEventListeners();

        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
        this._elementName.textContent = this._name;

        return this._element;
    }

    _likeCard() {
        this._elementLike.classList.toggle("card__button-like_active");
    }

    _removalCard() {
        this._element.remove();
    }

    _setEventListeners() {
        this._elementImage.addEventListener("click", () => {
            this._increasePopupImage(this._name, this._link);
        });

        this._elementLike.addEventListener("click", () => this._likeCard());
        this._elementTrash.addEventListener("click", () => this._removalCard());
    }
}

export { Card };