import './index.css';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/formValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import {inputTitleEdit, inputAttributeEdit, popupEditForm, popupAddForm, buttonEditOpen, buttonAddOpen, initialCards, inputData} from '../scripts/utils/constants.js';

// фключение валидации

const validationEdit = new FormValidator(inputData, popupEditForm);
validationEdit.enableValidation();
const validationAdd = new FormValidator(inputData, popupAddForm);
validationAdd.enableValidation();

//просмотрщик карточек

const viewerImage = new PopupWithImage ('.popup-view');
viewerImage.setEventListeners();

//функция создания карточки

function createCard(thing, cardClass) {
  const card =new Card(thing, cardClass, viewerImage.handleCardClick.bind(viewerImage));
  return card.generateCard();
}

//заполнение страницы

const newSection = new Section({items: initialCards, renderer: (item) => {
  const cardElement = createCard (item, '.template__element_simple' );
  newSection.setItem(cardElement);
}}, '.elements');

newSection.renderItems();

//попап редактирования профиля

const userInfo = new UserInfo ({userNameSelector: '.profile__visitor-name', userAboutSelector: '.profile__visitor-attribute'});
const formEdit = new PopupWithForm (
  { popupSelector: '.popup-edit', 
    handleFormSubmit: (formValues) => {
      userInfo.setUserInfo({name: formValues.name, about: formValues.about});
      formEdit.close();
}});

formEdit.setEventListeners(); // установка слушателей формы

function fillInput() {
  const userData = userInfo.getUserInfo();
  inputTitleEdit.value = userData.userName;
  inputAttributeEdit.value = userData.userAbout;
}

function popupEditOpen(evt) {
  evt.preventDefault();
  validationEdit.buttonEnabled();
  validationEdit.clearInputsFromError();
  fillInput();  
  formEdit.open();
}

buttonEditOpen.addEventListener('click', popupEditOpen);

//попап добавления карточки

const formAdd = new PopupWithForm (
  {popupSelector: '.popup-add',
   handleFormSubmit:(formValues) => {
    const generatedCard = createCard({name:formValues.title, link:formValues.link}, '.template__element_simple');
    newSection.setItem(generatedCard);
    formAdd.close();
  }});

formAdd.setEventListeners(); // установка слушателей формы

function addingCard(evt) {
  evt.preventDefault();
  validationAdd.buttonDisabled();
  validationAdd.clearInputsFromError();  
  formAdd.open();
}

buttonAddOpen.addEventListener('click', addingCard);