export default class FormValidator {
  constructor(validationSettings, formElementSelector) {
    this._formElementSelector = formElementSelector;
    this._validationSettings = validationSettings;
    this.setEventListeners = this._setEventListeners.bind(this);
  }


  _setEventListeners = (formElement, validationSettings) => {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement, this._validationSettings);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement, this._validationSettings);
        this._toggleButtonState(inputList, buttonElement, this._validationSettings);
      });
    });
  }

  _hasNotValidInput = (inputList) => { return inputList.some((inputElement) => { return !inputElement.validity.valid }) }

  _toggleButtonState = (inputList, buttonElement, validationSettings) => {
    if (this._hasNotValidInput(inputList)) {
      this._buttonAnActive(buttonElement);
    } else {
      this._buttonActive(buttonElement);
    }
  }

  _checkInputValidity = (formElement, inputElement, validationSettings) => {
    const isInputNotValid = !inputElement.validity.valid;
    if (isInputNotValid) {
      const errorMessage = inputElement.validationMessage;
      this._showInputError(formElement, inputElement, errorMessage, this._validationSettings);
    } else {
      this._hideInputError(formElement, inputElement, this._validationSettings);
    }
  }

  _hideInputError = (formElement, inputElement, validationSettings) => {
    const formSectionElement = inputElement.closest(".popup__section");
    const errorElement = formSectionElement.querySelector(".popup__error");
    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorElement.classList.remove(validationSettings.errorClass);
    errorElement.textContent = '';
  }

  _showInputError = (formElement, inputElement, errorMessage, validationSettings) => {
    const formSectionElement = inputElement.closest(".popup__section");
    const errorElement = formSectionElement.querySelector(".popup__error");
    inputElement.classList.add(validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationSettings.errorClass);
  }

  _buttonAnActive(elem) {
    elem.setAttribute("disabled", true);
    elem.classList.add('popup__button_disabled');
  }

  _buttonActive(elem) {
    elem.removeAttribute("disabled");
    elem.classList.remove('popup__button_disabled');
  }

  _clearInputsFromError(errorArray, inputArray) {
    errorArray.forEach((errorEl) => { errorEl.classList.remove('popup__error_visible'); errorEl.textContent = ''; });
    inputArray.forEach((inputEl) => { inputEl.classList.remove('popup__input_type_error') });
  }

  _buttonAddValidation = (buttonElem) => {
    const formNewPlace = document.querySelector('.popup-add__form');
    const inputListAddForm = Array.from(formNewPlace.querySelectorAll('.popup__input'));
    const errorList = Array.from(formNewPlace.querySelectorAll('.popup__error_visible'));
    this._buttonAnActive(buttonElem);
    this._clearInputsFromError(errorList, inputListAddForm);
  }

  _fillFormEdit(buttonElem) {
    const editProfileForm = document.querySelector('.popup-edit__form');
    const inputListEditProfileForm = Array.from(editProfileForm.querySelectorAll('.popup__input'));
    const errorListEditProfileForm = Array.from(editProfileForm.querySelectorAll('.popup__error_visible'));
    if (this._hasNotValidInput(inputListEditProfileForm)) {
      this._buttonAnActive(buttonElem);
    } else {
      this._buttonActive(buttonElem);
      this._clearInputsFromError(errorListEditProfileForm, inputListEditProfileForm);
    }
  }

  _checkButtonForm(formElSelector, buttonElem) {
    if (formElSelector.classList.contains('popup-add')) {
      this._buttonAddValidation(buttonElem);
    }
    if (formElSelector.classList.contains('popup-edit')) {
      this._fillFormEdit(buttonElem);
    }
  }

  enableValidation() {
    const activatedButton = document.querySelector('.popup__button');
    activatedButton.addEventListener('click', this._checkButtonForm(this._formElementSelector, activatedButton));
    const formElements = document.querySelectorAll(this._validationSettings.formSelector);
    const formList = Array.from(formElements);
    formList.forEach((formElement) => {
      this.setEventListeners(formElement, this._validationSettings);
    });
  }
}