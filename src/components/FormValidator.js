class FormValidator {
    constructor(options, formElement) {
        this._inputSelector = options.inputSelector;
        this._submitSelector = options.submitSelector;
        this._disabledButtonClass = options.disabledButtonClass;
        this._inputInvalidClass = options.inputInvalidClass;
        this._inputErrorClass = options.inputErrorClass;
        this._inputErrorSelector = options.inputErrorSelector;
        this._inputSectionSelector = options.inputSectionSelector;
        this._formElement = formElement;
    }

    resetValidation = () => {
        this._toggleButtonState();
        this._inputList.forEach((input) => {
            input.classList.remove(this._inputInvalidClass);
            input.classList.remove(this._inputErrorClass);
            input.nextElementSibling.textContent = '';
        });
    }

    _showInputError() {
        const errorElement = this._inputElement.closest(this._inputSectionSelector).querySelector(this._inputErrorSelector);
        this._inputElement.classList.add(this._inputInvalidClass);
        errorElement.classList.add(this._inputErrorClass);
        errorElement.textContent = this._inputElement.validationMessage;
    }

    _hideInputError() {
        const errorElement = this._inputElement.closest(this._inputSectionSelector).querySelector(this._inputErrorSelector);
        this._inputElement.classList.remove(this._inputInvalidClass);
        errorElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
    }

    _isValid(inputElement) {
        if (!this._inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _toggleButtonState() {
        const isFormValid = this._formElement.checkValidity();
        this._buttonElement.disabled = !isFormValid;
        this._buttonElement.classList.toggle(
            this._disabledButtonClass,
            !isFormValid
        );
    }

    _setEventListeners() {
        this._inputList = this._formElement.querySelectorAll(this._inputSelector);
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._inputElement = inputElement;
                this._isValid();
                this._toggleButtonState();
            });
        });
        this._buttonElement = this._formElement.querySelector(this._submitSelector);
    }

    enableValidation = () => {
        this._setEventListeners();
    }
}

export { FormValidator };