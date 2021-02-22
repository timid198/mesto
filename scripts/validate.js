//показ стандартных сообщений об ошибке и выделение инпута при невалидном вводе
const showInputError = (formElement, inputElement, errorMessage, validationSettings) => {
  const formSectionElement = inputElement.closest(".popup__section");
  const errorElement = formSectionElement.querySelector(".popup__error");
  inputElement.classList.add(validationSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSettings.errorClass);
};

//скрытие стандартных сообщений об ошибке и выделение инпута при невалидном вводе
const hideInputError = (formElement, inputElement, validationSettings) => {
  const formSectionElement = inputElement.closest(".popup__section");
  const errorElement = formSectionElement.querySelector(".popup__error");
  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorElement.classList.remove(validationSettings.errorClass);
  errorElement.textContent = '';
};

//проверка правильности ввода
const checkInputValidity = (formElement, inputElement, validationSettings) => {

  const isInputNotValid = !inputElement.validity.valid;

  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;
    showInputError(formElement, inputElement, errorMessage, validationSettings);
  } else {
    hideInputError(formElement, inputElement, validationSettings);
  }
};

//активная и неактивная кнопка
const toggleButtonState = (inputList, buttonElement, validationSettings) => {
  const findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid;
  const hasNotValidInput = inputList.some(findAtLeastOneNotValid);

  if (hasNotValidInput) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add(validationSettings.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(validationSettings.inactiveButtonClass);
  }
};

//расстановка слушателей методов по инпутам
const setEventListeners = (formElement, validationSettings) => {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, validationSettings);
      toggleButtonState(inputList, buttonElement, validationSettings);
    });
  });

  toggleButtonState(inputList, buttonElement, validationSettings);
};

//выборка форм инпутов из разметки
const enableValidation = (validationSettings) => {
  const formElements = document.querySelectorAll(validationSettings.formSelector);
  const formList = Array.from(formElements);

  formList.forEach((formElement) => {
    setEventListeners(formElement, validationSettings);
  });
};


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
