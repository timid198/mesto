import Card from './card.js';
import { initialCards } from './content.js';
import FormValidator from './formValidator.js';
import { inputData } from './validate.js';

const buttonEditOpen = document.querySelector('.profile__edit-button');
const buttonAddOpen = document.querySelector('.profile__add-button');
const buttonSubmitEdit = document.querySelector('.popup-edit__button');
const buttonSubmitAdd = document.querySelector('.popup-add__button');
const popupEditWindow = document.querySelector('.popup-edit');
const popupAddWindow = document.querySelector('.popup-add');
const popupViewWindow = document.querySelector('.popup-view');
const buttonEditClose = document.querySelector('.popup-edit__close');
const buttonAddClose = document.querySelector('.popup-add__close');
const buttonViewClose = document.querySelector('.popup-view__close');
const popupEditForm = document.querySelector('.popup-edit__form');
const popupAddForm = document.querySelector('.popup-add__form');
const infoTitle = document.querySelector('.profile__visitor-name');
const infoAttribute = document.querySelector('.profile__visitor-attribute');
const formElementEdit = document.querySelector('.popup-edit__window');
const inputTitleEdit = formElementEdit.querySelector('.popup__input_name');
const inputAttributeEdit = formElementEdit.querySelector('.popup__input_about');
const formElementAdd = popupAddWindow.querySelector('.popup-add__window');
const inputAddName = formElementAdd.querySelector('.popup__input_title');
const inputAddLink = formElementAdd.querySelector('.popup__input_link');
const viewImage = document.querySelector('.popup-view__image');
const viewTitle = document.querySelector('.popup-view__title');

// добавление начальных карточек

function renderPage(items) {
  items.forEach((item) => {
    const card = new Card(item, '.template__element_simple', viewverCard);
    const cardElement = card.generateCard();

    document.querySelector('.elements').append(cardElement);
  })
}

renderPage(initialCards);

// фключение валидации


const validationEdit = new FormValidator(inputData, popupEditForm);
validationEdit.enableValidation();
const validationAdd = new FormValidator(inputData, popupAddForm);
validationAdd.enableValidation();


// функция открытия popup

function escapeClose(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escapeClose);
}

//открытие формы добавления карточек

function addingFormOpen() {
  validationAdd.buttonDisabled();
  validationAdd.clearInputsFromError();
  openPopup(popupAddWindow)
}

//открытие формы редактирования профиля

function editingFormOpen() {
  validationEdit.buttonEnabled();
  validationEdit.clearInputsFromError();
  fillInput();
  openPopup(popupEditWindow);
}

buttonEditOpen.addEventListener('click', (evt) => { editingFormOpen() });
buttonAddOpen.addEventListener('click', (evt) => { addingFormOpen() });

// функция закрытия popup

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeClose);
}

buttonEditClose.addEventListener('click', (evt) => { closePopup(popupEditWindow)});
buttonAddClose.addEventListener('click', (evt) => { clearInputAdd(); closePopup(popupAddWindow) });
buttonViewClose.addEventListener('click', (evt) => { closePopup(popupViewWindow) });

// наполнение редактора содержимым страницы
function fillInput() {
  inputTitleEdit.value = infoTitle.textContent;
  inputAttributeEdit.value = infoAttribute.textContent;
}

function handlerFormSubmitEdit(evt) {
  evt.preventDefault();
  infoTitle.textContent = inputTitleEdit.value;
  infoAttribute.textContent = inputAttributeEdit.value;
  closePopup(popupEditWindow);
}

formElementEdit.addEventListener('submit', handlerFormSubmitEdit)

// попап на добавление карточек
function clearInputAdd() {
  inputAddName.value = '';
  inputAddLink.value = '';
}

function addCard(card) {
  document.querySelector('.elements').prepend(card);
}

function renderCard(evt) {
  evt.preventDefault();
  const card = new Card({ name: inputAddName.value, link: inputAddLink.value }, '.template__element_simple', viewverCard);
  addCard(card.generateCard());
  clearInputAdd();
  closePopup(popupAddWindow);
}

formElementAdd.addEventListener('submit', renderCard)

//просмотр карточек

function viewverCard(name, link) {  
  viewImage.src = link;
  viewImage.alt = name;
  viewTitle.textContent = name;
  openPopup(popupViewWindow);
}

//закрытие при миссклике

popupEditWindow.addEventListener('click', (evt) => { if (evt.target === evt.currentTarget) { closePopup(popupEditWindow) } });
popupAddWindow.addEventListener('click', (evt) => { if (evt.target === evt.currentTarget) { clearInputAdd(); closePopup(popupAddWindow) } });
popupViewWindow.addEventListener('click', (evt) => { if (evt.target === evt.currentTarget) { closePopup(popupViewWindow) } });