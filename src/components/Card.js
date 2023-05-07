class Card {
    constructor({ likes, name, link, _id, owner }, templateElement, handleCardClick, handleLikeClick, handleDeleteClick, userId) {
        this._name = name;
        this._link = link;
        this._cardId = _id;
        this._likes = likes;
        this._userId = userId;
        this._templateElement = templateElement;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteClick = handleDeleteClick;
        this._isOwner = owner._id === userId;
        this._isLiked = this._checkUserLike();
    }

    _getTemplate() {
        return this._templateElement
            .querySelector('.card')
            .cloneNode(true);
    }

    _handleLikeCard() {
        this._handleLikeClick(this._cardId, this._isLiked, this);
    }

    _checkUserLike() {
        return this._likes.some(owner => owner._id === this._userId);
    }

    _toggleLikeButtonState(isLiked) {
        if (isLiked) {
            this._likeButton.classList.add("card__button-like_active");
        } else {
            this._likeButton.classList.remove("card__button-like_active");
        }
    }

    checkLike(likes) {
        if (likes) {
            this._likes = likes;
            this._isLiked = this._checkUserLike();
        }
        this._likeCounter.textContent = this._likes.length;
        this._toggleLikeButtonState(this._isLiked);
    }

    blockLikeButton(isBlocked = true) {
        this._likeButton.disabled = isBlocked;
    }

    handleDeleteCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._imageElement.addEventListener('click', () => {
            this._handleCardClick(this._imageElement);
        });
        this._likeButton.addEventListener('click', () => {
            this._handleLikeCard();
        });
        if (this._isOwner) {
            this._buttonDelete.addEventListener('click', () => {
                this._handleDeleteClick(this._cardId, this);
            });
        }
    }


    generateCard() {
        this._element = this._getTemplate();

        this._imageElement = this._element.querySelector(".card__image");
        this._imageElement.src = this._link;
        this._imageElement.alt = this._name;
        this._element.querySelector(".card__title").textContent = this._name;
        this._likeButton = this._element.querySelector(".card__button-like");
        this._likeCounter = this._element.querySelector(".card__like-counter");
        this._buttonDelete = this._element.querySelector(".card__button-removal");
        this._likeCounter.textContent = `${this._likes.length}`;
        if (!this._isOwner) {
            this._buttonDelete.remove();
        }
        this.checkLike();
        this._setEventListeners();

        return this._element;
    }
}

export { Card };