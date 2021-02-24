const buttonEl = document.querySelector('.popup-add__button');
const savingButton = document.querySelector('.popup-edit__button');

//функция проверки кнопки подтверждения действия в popup__add

const buttonAddValidation = (buttonElem) => {
  const addInputTitle = document.querySelector('.popup__input_title');
  const addInputLink = document.querySelector('.popup__input_link');
  const formNewPlace = document.querySelector('.popup-add__form');
  const errorList = Array.from(formNewPlace.querySelectorAll('.popup__error_visible'));
  addInputTitle.value = '';
  addInputLink.value = '';
  buttonElem.setAttribute("disabled", true);
  buttonElem.classList.add('popup__button_disabled');
  addInputTitle.classList.remove('popup__input_type_error');
  addInputLink.classList.remove('popup__input_type_error');
  errorList.forEach((errorEl) => { errorEl.classList.remove('popup__error_visible'); errorEl.textContent = ''; });
}

//функция проверки кнопки подтверждения действия в popup__edit

function fillFormEdit(buttonElem) {
  const editProfileForm = document.querySelector('.popup-edit__form');
  const inputListEditProfileForm = Array.from(editProfileForm.querySelectorAll('.popup__input'));
  const errorListEditProfileForm = Array.from(editProfileForm.querySelectorAll('.popup__error_visible'));
  inputTitleEdit.value = infoTitle.textContent;
  inputAttributeEdit.value = infoAttribute.textContent;
  if (hasNotValidInput(inputListEditProfileForm)) {
    buttonElem.setAttribute("disabled", true);
    buttonElem.classList.add('popup__button_disabled');
  } else {
    buttonElem.removeAttribute("disabled");
    buttonElem.classList.remove('popup__button_disabled');
    errorListEditProfileForm.forEach((errorEl) => { errorEl.classList.remove('popup__error_visible'); errorEl.textContent = ''; });
    inputListEditProfileForm.forEach((inputEl) => { inputEl.classList.remove('popup__input_type_error') });
  }
}

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
const hasNotValidInput = (inputList) => { return inputList.some((inputElement) => { return !inputElement.validity.valid }) };

const toggleButtonState = (inputList, buttonElement, validationSettings) => {
  if (hasNotValidInput(inputList)) {
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
  errorClass: 'popup__error_visible',
});