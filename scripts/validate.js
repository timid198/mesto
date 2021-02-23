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

<<<<<<< HEAD
//проверка правильности ввода
const checkInputValidity = (formElement, inputElement, validationSettings) => {
  const isInputNotValid = !inputElement.validity.valid;
  if (isInputNotValid) {
=======
//
const isInputNotValid = (inputElement) => !inputElement.validity.valid;

//проверка правильности ввода
const checkInputValidity = (formElement, inputElement, validationSettings) => {  
  if (isInputNotValid(inputElement)) {
>>>>>>> b19c3cbfac1755203e3936c6a07a14ff6c90a784
    const errorMessage = inputElement.validationMessage;
    showInputError(formElement, inputElement, errorMessage, validationSettings);
  } else {
    hideInputError(formElement, inputElement, validationSettings);
  }
};

<<<<<<< HEAD
//активная и неактивная кнопка
const toggleButtonState = (inputList, buttonElement, validationSettings) => {
  const findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid;
  const hasNotValidInput = inputList.some(findAtLeastOneNotValid);
  if (hasNotValidInput) {
=======
//функция проверки заполненности полей ввода
const hasNotValidInput = (inputList) => {return inputList.some((inputElement) => (!inputElement.validity.valid))};

//активная и неактивная кнопка
const toggleButtonState = (inputList, buttonElement, validationSettings) => {  
  if (hasNotValidInput(inputList)) {
>>>>>>> b19c3cbfac1755203e3936c6a07a14ff6c90a784
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

//popup-add__button проверка ввода
function deactivateAddButton () {
  const addForm = document.querySelector('.popup-add__form');
  const buttonSubmitAdd = addForm.querySelector('.popup-add__button');
  const inputListAddForm = Array.from(addForm.querySelectorAll('.popup__input'));
  const errorElListAddForm = Array.from(addForm.querySelectorAll('.popup__error'));
  if (hasNotValidInput(inputListAddForm)) {
    buttonSubmitAdd.setAttribute("disabled", true);
    buttonSubmitAdd.classList.add('popup__button_disabled');
    inputListAddForm.forEach((inputEl) => {
      inputEl.classList.remove('popup__input_type_error');
      inputEl.value='';
    });
    errorElListAddForm.forEach((errorEl) => {
      errorEl.classList.remove('popup__error_visible');
      errorEl.textContent = '';
    })
  } else {
    buttonSubmitAdd.removeAttribute("disabled");
    buttonSubmitAdd.classList.remove('popup__button_disabled');
  }
}
deactivateAddButton ();
//popup-edit__button проверка ввода
function deactivateEditButton () {
  if (!inputTitleEdit.value.valid && !inputAttributeEdit.value.valid) {
    buttonSubmitEdit.removeAttribute("disabled", true);
    buttonSubmitEdit.classList.remove('popup__button_disabled');
  } else {
    buttonSubmitEdit.setAttribute("disabled", true);
    buttonSubmitEdit.classList.add('popup__button_disabled');    
  }
}

// if (buttonElement.classList.contains('popup-add__button')) {
//   if (hasNotValidInput(inputList)) {
//     buttonElement.setAttribute("disabled", true);
//     buttonElement.classList.add(validationSettings.inactiveButtonClass);
//   } else {
//     buttonElement.removeAttribute("disabled");
//     buttonElement.classList.remove(validationSettings.inactiveButtonClass);
//   }
//   inputAddName.value = '';
//   inputAddLink.value = '';
// }
