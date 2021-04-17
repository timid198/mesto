const initialCards = [
    {
        name: 'Смоленск',
        link: 'https://images.unsplash.com/photo-1565161934554-44ab1400ac6e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80'
    },
    {
        name: 'Петергоф',
        link: 'https://images.unsplash.com/photo-1582184455904-1645a099548b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80'
    },
    {
        name: 'Ростов',
        link: 'https://images.unsplash.com/photo-1524214889128-d155b841834d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=384&q=80'
    },
    {
        name: 'Казань',
        link: 'https://images.unsplash.com/photo-1600421539016-cc3f0866d2b0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=401&q=80'
    },
    {
        name: 'Санкт-Петербург',
        link: 'https://images.unsplash.com/photo-1554202218-20ee1af0fb17?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80'
    },
    {
        name: 'Москва',
        link: 'https://images.unsplash.com/photo-1561217680-8cd186af7701?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80'
    }
];

const inputData = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    errorSelector: '.popup__error',
    formAddClass: 'popup-add',
    formEditClass: 'popup-edit',
  }

  const formElementEdit = document.querySelector('.popup-edit__window');
  const inputTitleEdit = formElementEdit.querySelector('.popup__input_name');
  const inputAttributeEdit = formElementEdit.querySelector('.popup__input_about');
  const popupEditForm = document.querySelector('.popup-edit__form');
  const popupAddForm = document.querySelector('.popup-add__form');
  const buttonEditOpen = document.querySelector('.profile__edit-button');
  const buttonAddOpen = document.querySelector('.profile__add-button');
  const patternProfile = document.querySelector('.profile__visitor-name');

  export {inputTitleEdit, inputAttributeEdit, popupEditForm, popupAddForm, buttonEditOpen, buttonAddOpen, initialCards, inputData, patternProfile}