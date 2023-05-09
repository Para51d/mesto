import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);

        this._form = this._popup.querySelector(".form");
        this._inputList = this._form.querySelectorAll(".form__input");
        this._handleFormSubmit = handleFormSubmit;
        this._submitButton = this._form.querySelector(".form__save");
    }

    _getInputValues() {
        this._formInputValues = {};
        this._inputList.forEach((input) => {
            this._formInputValues[input.name] = input.value;
        });
        return this._formInputValues;
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        });
    }

    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener("submit", (e) => {
            e.preventDefault();

            this._handleFormSubmit(this._getInputValues());
        });
    }

    blockButton(buttonText, isBlocked = true) {
        this._submitButton.disabled = isBlocked;
        this._submitButton.textContent = buttonText;
    }
}

export { PopupWithForm };