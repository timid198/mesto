class FormValidator {
    constructor(validationSettings, formElementSelector){
      this._formElementSelector = formElementSelector;
      this._validationSettings = validationSettings;
      this.checkButtonForm = this._checkButtonForm.bind(this);
      this.fillFormEdit = this._fillFormEdit.bind(this);
      this.buttonAddValidation = this._buttonAddValidation.bind(this);
      this.hasNotValidInput = this._hasNotValidInput.bind(this);
      this.buttonAnActive = this._buttonAnActive.bind(this);
      this.buttonActive = this._buttonActive.bind(this);
      this.toggleButtonState = this._toggleButtonState.bind(this);
      this.checkInputValidity = this._checkInputValidity.bind(this);
      this.showInputError = this._showInputError.bind(this);
      this.hideInputError = this._hideInputError.bind(this);
      this.clearInputsFromError = this._clearInputsFromError.bind(this);
      this.setEventListeners = this._setEventListeners.bind(this);
    }
  
    
    _setEventListeners = (formElement, validationSettings) => {
    const inputList = Array.from(formElement.querySelectorAll(this._validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(this._validationSettings.submitButtonSelector);
    this.toggleButtonState(inputList, buttonElement, validationSettings);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.checkInputValidity(formElement, inputElement, validationSettings);
        this.toggleButtonState(inputList, buttonElement, validationSettings);
      });
    });
}
  
  _hasNotValidInput = (inputList) => { return inputList.some((inputElement) => { return !inputElement.validity.valid }) }
  
  _toggleButtonState = (inputList, buttonElement, validationSettings) => {
    if (this.hasNotValidInput(inputList)) {
        this.buttonAnActive(buttonElement);
    } else {
        this.buttonActive(buttonElement);
    }
  }
  
  _checkInputValidity = (formElement, inputElement, validationSettings) => {
    const isInputNotValid = !inputElement.validity.valid;
    if (isInputNotValid) {
      const errorMessage = inputElement.validationMessage;
      this.showInputError(formElement, inputElement, errorMessage, validationSettings);
    } else {
      this.hideInputError(formElement, inputElement, validationSettings);
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
        this.buttonAnActive(buttonElem);
        this.clearInputsFromError(errorList, inputListAddForm);
    }

    _fillFormEdit(buttonElem) {
        const editProfileForm = document.querySelector('.popup-edit__form');
        const inputListEditProfileForm = Array.from(editProfileForm.querySelectorAll('.popup__input'));
        const errorListEditProfileForm = Array.from(editProfileForm.querySelectorAll('.popup__error_visible'));
        if (this.hasNotValidInput(inputListEditProfileForm)) {
            this.buttonAnActive(buttonElem);
        } else {
            this.buttonActive(buttonElem);
            this.clearInputsFromError(errorListEditProfileForm, inputListEditProfileForm);
        }
    }

    _checkButtonForm(buttonElem) {
        if (buttonElem.classList.contains('popup-add__button')) {
            this.buttonAddValidation(buttonElem);
        } 
        if (buttonElem.classList.contains('popup-edit__button')) {
            this.fillFormEdit(buttonElem);
        }
    }

    enableValidation = () => {
        const activatedButton = document.querySelector('.popup__button');
        activatedButton.addEventListener('click', this.checkButtonForm(activatedButton));
        const formElements = document.querySelectorAll(this._validationSettings.formSelector);
        const formList = Array.from(formElements);
        formList.forEach((formElement) => {
            this.setEventListeners(formElement, validationSettings);
        });
      }
    
  
}

const inputData = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};

const validation = new FormValidator;
validation.enableValidation(inputData, '.popup__form')