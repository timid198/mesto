// // const formElement = document.closest('.popup__form');

// const showInputError = (formElement, inputElement, errorMessage) => {
//   const errorElement = formElement.closest('.popup__error');
//   inputElement.classList.add('popup__input_type_error');
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add('popup__error_visible');
// };

// const hideInputError = (formElement, inputElement) => {
//   const errorElement = formElement.closest('.popup__error');
//   inputElement.classList.remove('popup__input_type_error');
//   errorElement.classList.remove('popup__error_visible');
//   errorElement.textContent = '';
// };

// const checkInputValidity = (formElement, inputElement) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(formElement, inputElement);
//   }
// };

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   })
// };

// const toggleButtonState = (inputList, buttonElement) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add('popup__button_disabled');
//   } else {
//     buttonElement.classList.remove('popup__button_disabled');
//   }
// };

// const setEventListeners = (formElement) => {
//   const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
//   const buttonElement = formElement.querySelector('.popup__button');
//   toggleButtonState(inputList, buttonElement);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(formElement, inputElement);
//       toggleButtonState(inputList, buttonElement);
//     });
//   });
// };

// const enableValidation = () => {
//   const formList = Array.from(document.querySelectorAll('.popup__form'));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', function (evt) {
//       evt.preventDefault();
//       setEventListeners(formElement);    
//     });
 
  
// });
// };

// enableValidation();
// // enableValidation({
// //   formSelector: '.popup__form',
// //   inputSelector: '.popup__input',
// //   submitButtonSelector: '.popup__button',
// //   inactiveButtonClass: 'popup__button_disabled',
// //   inputErrorClass: 'popup__input_type_error',
// //   errorClass: 'popup__error_visible'
// // }); 

const showInputError = (inputElement, errorMessage) => {
  const formSectionElement = inputElement.closest(".popup__form");
  const errorElement = formSectionElement.querySelector(".popup__error");

  errorElement.textContent = errorMessage;
  inputElement.classList.add("popup__input_type_error");
  errorElement.classList.add("popup__error_visible");
};

const hideInputError = (inputElement) => {
  const formSectionElement = inputElement.closest(".popup__form");
  const errorElement = formSectionElement.querySelector(".popup__error");

  errorElement.textContent = "";
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__error_visible");
};

const getErrorMessage = (inputElement) => {
  const defaultErrorHandler = (inputElement) => inputElement.validationMessage;
  const emailErrorHandler = (inputElement) => {
    if (inputElement.validity.typeMismatch) {
      return "Пожалуйста, введите верный email";
    }

    if (inputElement.validity.valueMissing) {
      return "Пожалуйста, заполните email";
    }
  };
  const errorHandlers = {
    email: emailErrorHandler,
    DEFAULT: defaultErrorHandler,
  };

  const inputName = inputElement.name;
  const errorHandler = errorHandlers[inputName] || errorHandlers.DEFAULT;

  return errorHandler(inputElement);
};

const checkInputValidity = (formElement, inputElement) => {
  const isInputNotValid = !inputElement.validity.valid;

  if (isInputNotValid) {
    const errorMessage = getErrorMessage(inputElement);

    showInputError(inputElement, errorMessage);
  } else {
    hideInputError(inputElement);
  }
};

const toggleButtonState = (inputList, buttonElement) => {
  const findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid;
  const hasNotValidInput = inputList.some(findAtLeastOneNotValid);

  if (hasNotValidInput) {
    buttonElement.classList.add("popup__button_disabled");
  } else {
    buttonElement.classList.remove("popup__button_disabled");
  }
};

const setEventListeners = (formElement, inputSelector) => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };
  formElement.addEventListener("submit", handleFormSubmit);

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(".popup__button");

  const inputListIterator = (inputElement) => {
    const handleInput = () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    };

    inputElement.addEventListener("input", handleInput);
  };

  inputList.forEach(inputListIterator);

  toggleButtonState(inputList, buttonElement);
};

const enableValidation = ({ formSelector, inputSelector }) => {
  const formElements = document.querySelectorAll(formSelector);
  const formList = Array.from(formElements);

  formList.forEach((formElement) => {
    setEventListeners(formElement, inputSelector);
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
});
