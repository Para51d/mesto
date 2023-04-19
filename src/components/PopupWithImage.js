import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._image = document.querySelector(".popup__image");
        this._imageFigcaption = document.querySelector(".popup__figcaption");
    }

    open(name, link) {
        super.open();
        this._image.src = link;
        this._image.alt = name;
        this._imageFigcaption.textContent = name;
    };
}

export { PopupWithImage };