export default class FormValidator {
  constructor(validationSettings, formElementSelector) {
    this._formElementSelector = formElementSelector;
    this._validationSettings = validationSettings;
    this._inputList = Array.from(this._formElementSelector.querySelectorAll(this._validationSettings.inputSelector));
    this._buttonElement = this._formElementSelector.querySelector(this._validationSettings.submitButtonSelector);
  }


  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        inputElement.classList.remove(this._validationSettings.inputErrorClass)
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _hasNotValidInput (inputList) { return inputList.some((inputElement) => { return !inputElement.validity.valid }) }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasNotValidInput(this._inputList)) {
      this._buttonElement.classList.add(this._validationSettings.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled',true);
    } else {
      this._buttonElement.classList.remove(this._validationSettings.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
  }}

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElementSelector.querySelector(`${this._validationSettings.errorSelector}_${inputElement.name}`);
    inputElement.classList.remove(this._validationSettings.inputErrorClass);
    errorElement.classList.remove(this._validationSettings.errorClass);
    errorElement.textContent = '';
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElementSelector.querySelector(`${this._validationSettings.errorSelector}_${inputElement.name}`);
    inputElement.classList.add(this._validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationSettings.errorClass);
  }

  // _buttonAnActive(elem, validationSettings) {
  //   elem.setAttribute("disabled", true);
  //   elem.classList.add(this._validationSettings.inactiveButtonClass);
  // }

  // _buttonActive(elem, validationSettings) {
  //   elem.removeAttribute("disabled");
  //   elem.classList.remove(this._validationSettings.inactiveButtonClass);
  // }

  _clearInputsFromError() {
    errorArray.forEach((errorEl) => { errorEl.classList.remove(this._validationSettings.errorClass); errorEl.textContent = ''; });
    inputArray.forEach((inputEl) => { inputEl.classList.remove(this._validationSettings.inputErrorClass) });
  }

  // _buttonAddValidation = (buttonElem, validationSettings) => {
  //   const formNewPlace = document.querySelector('.popup-add__form');
  //   this._inputListAddForm = Array.from(formNewPlace.querySelectorAll(validationSettings.inputSelector));
  //   this._errorList = Array.from(formNewPlace.querySelectorAll(validationSettings.errorClass));
  //   this._buttonAnActive(buttonElem, validationSettings);
  //   this._clearInputsFromError(this._errorList, this._inputListAddForm, this._validationSettings);
  // }

  // _fillFormEdit(buttonElem, validationSettings) {
  //   const editProfileForm = document.querySelector('.popup-edit__form');
  //   this._inputListEditProfileForm = Array.from(editProfileForm.querySelectorAll(validationSettings.inputSelector));
  //   this._errorListEditProfileForm = Array.from(editProfileForm.querySelectorAll(validationSettings.errorClass));
  //   if (this._hasNotValidInput(this._inputListEditProfileForm)) {
  //     this._buttonAnActive(buttonElem, this._validationSettings);
  //   } else {
  //     this._buttonActive(buttonElem, this._validationSettings);
  //     this._clearInputsFromError(this._errorListEditProfileForm, this._inputListEditProfileForm, validationSettings);
  //   }
  // }

  // _checkButtonForm(formElSelector, buttonElem, validationSettings) {
  //   if (formElSelector.classList.contains('popup-add')) {
  //     this._buttonAddValidation(buttonElem, this._validationSettings);
  //   }
  //   if (formElSelector.classList.contains('popup-edit')) {
  //     this._fillFormEdit(buttonElem, this._validationSettings);
  //   };
  // }

  // setPopupCardSubmitToInitial() {
  //   this._formElement.querySelector(this._validationSettings.submitButtonSelector).setAttribute('disabled',true);
  //   this._formElement.querySelector(this._validationSettings.submitButtonSelector).classList.add(this._validationSettings.inactiveButtonClass);
  // }

  // // Функция очистки ошибок в Popup
  // clearErrors() {
  //   const errorList = Array.from(this._formElement.querySelectorAll(`.${this._validationSettings.activeErrorClass}`));
  //   const inputErrorList = Array.from(this._formElement.querySelectorAll(`.${this._validationSettings.inputErrorClass}`));

  //   if (errorList !== []) {
  //     errorList.forEach((errorElement) => {
  //     errorElement.textContent='';
  //     errorElement.classList.remove(this._validationSettings.activeErrorClass);
  //     })
  //   }

  //   if (inputErrorList !== []) {
  //     inputErrorList.forEach((inputErrorElement) => {
  //       inputErrorElement.classList.remove(this._validationSettings.inputErrorClass);
  //     })
  //   }
  // }

  enableValidation() {
    // const activatedButton = document.querySelector(this._validationSettings.submitButtonSelector);
    // activatedButton.addEventListener('click', this._checkButtonForm(this._formElementSelector, activatedButton, this._validationSettings));
    this._setEventListeners();
  }
}
