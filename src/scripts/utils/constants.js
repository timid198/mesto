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
  formAvatarClass: 'popup-avatar',
}

const avaPlace = document.querySelector('.profile__avatar');
const formElementEdit = document.querySelector('.popup-edit__window');
const inputTitleEdit = formElementEdit.querySelector('.popup__input_name');
const inputAttributeEdit = formElementEdit.querySelector('.popup__input_about');
const popupEditForm = document.querySelector('.popup-edit__form');
const popupAddForm = document.querySelector('.popup-add__form');
const popupAvatarform = document.querySelector('.popup-avatar__form');
const buttonEditOpen = document.querySelector('.profile__edit-button');
const buttonAddOpen = document.querySelector('.profile__add-button');
const buttonAvatarEdit = document.querySelector('.profile__overlay');

export { inputTitleEdit, inputAttributeEdit, popupEditForm, popupAddForm, popupAvatarform, buttonEditOpen, buttonAddOpen, buttonAvatarEdit, inputData, avaPlace }