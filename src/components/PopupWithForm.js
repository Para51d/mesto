import { Popup } from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);

        this._form = this._popup.querySelector('.form');
        this._inputList = this._form.querySelectorAll('.form__input');
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        this._formInputValues = {};
        this._inputList.forEach((input) => {
            this._formInputValues[input.name] = input.value;
        });
        return this._formInputValues;
    }

    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (e) => {
            e.preventDefault();

            this._handleFormSubmit(this._getInputValues());
            this.close();
        });
    }
}

export { PopupWithForm };