//функция делающая кнопку неактивной
function buttonAnActive(elem) {
  elem.setAttribute("disabled", true);
  elem.classList.add('popup__button_disabled');
}

//функция делающая кнопку активной
function buttonActive(elem) {
  elem.removeAttribute("disabled");
  elem.classList.remove('popup__button_disabled');
}

//функция убирающая текст об ошибке и устанавливающая стиль инпута по умолчанию
function clearInputsFromError(errorArray, inputArray) {
  errorArray.forEach((errorEl) => { errorEl.classList.remove('popup__error_visible'); errorEl.textContent = ''; });
  inputArray.forEach((inputEl) => { inputEl.classList.remove('popup__input_type_error') });
}

//функция проверки кнопки подтверждения действия в popup__add

const buttonAddValidation = (buttonElem) => {
  const formNewPlace = document.querySelector('.popup-add__form');
  const inputListAddForm = Array.from(formNewPlace.querySelectorAll('.popup__input'));
  const errorList = Array.from(formNewPlace.querySelectorAll('.popup__error_visible'));
  buttonAnActive(buttonElem);
  clearInputsFromError(errorList, inputListAddForm);
}

//функция проверки кнопки подтверждения действия в popup__edit

function fillFormEdit(buttonElem) {
  const editProfileForm = document.querySelector('.popup-edit__form');
  const inputListEditProfileForm = Array.from(editProfileForm.querySelectorAll('.popup__input'));
  const errorListEditProfileForm = Array.from(editProfileForm.querySelectorAll('.popup__error_visible'));
  if (hasNotValidInput(inputListEditProfileForm)) {
    buttonAnActive(buttonElem);
  } else {
    buttonActive(buttonElem);
    clearInputsFromError(errorListEditProfileForm, inputListEditProfileForm);
  }
}

function checkButtonForm(buttonElem) {
  if (buttonElem.classList.contains('popup-add__button')) {
    buttonAddValidation(buttonElem);
  } 
  if (buttonElem.classList.contains('popup-edit__button')) {
    fillFormEdit(buttonElem);
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
    buttonAnActive(buttonElement);
  } else {
    buttonActive(buttonElement);
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