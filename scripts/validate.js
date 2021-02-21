const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');

// Функция, которая добавляет класс с ошибкой
const showInputError = (element) => {
  element.classList.add('form__input_type_error');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (element) => {
  element.classList.remove('form__input_type_error');
};

// Функция, которая проверяет валидность поля
const isValid = () => {
  if (!formInput.validity.valid) {
    showInputError(formInput);
  } else {
    hideInputError(formInput);
  }
};

formElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
});
formInput.addEventListener('input', isValid); 