import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._image = this._popup.querySelector(".popup__image");
        this._imageFigcaption = this._popup.querySelector(".popup__figcaption");
    }

    open(name, link) {
        this._image.src = link;
        this._image.alt = name;
        this._imageFigcaption.textContent = name;

        super.open();
    };
}

export { PopupWithImage };