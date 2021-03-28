export default class FormValidator {
  constructor(validationSettings, formElementSelector) {
    this._formElementSelector = formElementSelector;
    this._validationSettings = validationSettings;
    this.setEventListeners = this._setEventListeners.bind(this);
    this._inputList = Array.from(this._formElementSelector.querySelectorAll(this._validationSettings.inputSelector));
    this._buttonElement = this._formElementSelector.querySelector(this._validationSettings.submitButtonSelector);
  }

  //установка слушателей

  _setEventListeners(inputElement, buttonElement) {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputElement, buttonElement);
  }
  

  //поиск невалидного инпута

  _hasNotValidInput = (inputList) => { return inputList.some((inputElement) => { return !inputElement.validity.valid }) };

  //выбор состояния кнопки подтверждения действия

  _toggleButtonState(inputElement, buttonElement) {
    if (this._hasNotValidInput(this._inputList)) {
      this.buttonDisabled(inputElement, buttonElement);
    } else {
      this.buttonEnabled(inputElement, buttonElement);
  }}

  //состояние кнопок

  buttonEnabled(inputElement, buttonElement) {
    this._buttonElement.classList.remove(this._validationSettings.inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }

  buttonDisabled(inputElement, buttonElement) {
    this._buttonElement.classList.add(this._validationSettings.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled',true);
  }

  //функция для первоначального показа форм в необходимом виде 

  clearInputsFromError(validationSettings, formElementSelector) {
    const inputListAddForm = Array.from(this._formElementSelector.querySelectorAll(`.${this._validationSettings.inputErrorClass}`));
    const errorList = Array.from(this._formElementSelector.querySelectorAll(`.${this._validationSettings.errorClass}`));
    errorList.forEach((errorEl) => { errorEl.classList.remove(this._validationSettings.errorClass); errorEl.textContent = ''; });
    inputListAddForm.forEach((inputEl) => { inputEl.classList.remove(this._validationSettings.inputErrorClass) })
  }

  //проверка инпутов

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //скрытие стандартных событий об неправильном вводе

  _hideInputError(inputElement) {
    const errorElement = this._formElementSelector.querySelector(`${this._validationSettings.errorSelector}_${inputElement.name}`);
    inputElement.classList.remove(this._validationSettings.inputErrorClass);
    errorElement.classList.remove(this._validationSettings.errorClass);
    errorElement.textContent = '';
  }

  //показ стандартных событий ввода

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElementSelector.querySelector(`${this._validationSettings.errorSelector}_${inputElement.name}`);
    inputElement.classList.add(this._validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationSettings.errorClass);
  }

  //отмена стандартного события

  _preventDefault(evt) {
    evt.preventDefault();
  }

  //включение проверки событий ввода

  enableValidation() {
    this._preventDefault;
    this._inputList.forEach((inputElement) => {inputElement.addEventListener ("input", () => {this._setEventListeners(inputElement, this._buttonElement)})
  })}
}