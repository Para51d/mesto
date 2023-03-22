// прячет блок для отрисовки ошибки: прозрачность 0
const hiddenError = (errorElement, inputErrorClass) => {
    errorElement.innerText = '';
    errorElement.classList.remove(inputErrorClass);
};

// убираем подчёркивание инпута красной линией
const hideInputError = (inputElement, inputInvalidClass) => {
    inputElement.classList.remove(inputInvalidClass);
};

// добавляет блок: прозрачность 1 и добавляет текст ошибки 
const showError = (errorElement, message, inputErrorClass) => {
    errorElement.innerText = message;
    errorElement.classList.add(inputErrorClass);
};

// подчёркиваем инпут с не валидным значением в красныой линией
const showInputError = (inputElement, inputInvalidClass) => {
    inputElement.classList.add(inputInvalidClass);
};

// проверяет значения инпута на валидные и не валидные, подчёркивает не валидные и показывает сообщение ошибки валидации; убирает подчёркивание и сообщение у валидных
const setInputState = (inputElement, isValid, options) => {
    const { inputSectionSelector, inputErrorSelector, inputErrorClass, inputInvalidClass } = options;
    const inputSectionElement = inputElement.closest(inputSectionSelector);
    const errorElement = inputSectionElement.querySelector(inputErrorSelector);
    if (isValid) {
        hideInputError(inputElement, inputInvalidClass);
        hiddenError(errorElement, inputErrorClass);
    } else {
        showInputError(inputElement, inputInvalidClass);
        showError(errorElement, inputElement.validationMessage, inputErrorClass);
    }
};

const toggleInputState = (inputElement, options) => {
    const isValid = inputElement.validity.valid;
    setInputState(inputElement, isValid, options);
};

// убирает дизейбл с кнопки "Сохранить" или "Создать"
const enableButton = (buttonElement, disabledButtonClass) => {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(disabledButtonClass);
};

// дизейблит кнопку "Сохранить" или "Создать"
const disableButton = (buttonElement, disabledButtonClass) => {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add(disabledButtonClass);
};

// проверяет форму на валидность всех инпутов, если OK - активные кнопки "Сохранить" или "Создать", если НЕТ - задизейбленые
const toggleButtonState = (inputs, submitElement, disabledButtonClass) => {
    // форма валидна, если каждый инпут валиден
    const formIsValid = inputs.every(inputElement => inputElement.validity.valid);

    if (formIsValid) {
        enableButton(submitElement, disabledButtonClass);
    } else {
        disableButton(submitElement, disabledButtonClass);
    }
};

const setEventListeners = (form, options) => {
    const submitElement = form.querySelector(options.submitSelector);
    const inputs = Array.from(form.querySelectorAll(options.inputSelector));

    inputs.forEach(inputElement => {
        inputElement.addEventListener("input", () => {
            toggleInputState(inputElement, options);
            toggleButtonState(inputs, submitElement, options.disabledButtonClass);
        });
    });

    toggleButtonState(inputs, submitElement, options.disabledButtonClass);
};

// находит все фомы и применяет весь код валидации к каждой форме
const enableValidation = (options) => {
    // находим все формы
    const forms = Array.from(document.querySelectorAll(options.formSelector));
    forms.forEach(form => {
        setEventListeners(form, options);
    });
};