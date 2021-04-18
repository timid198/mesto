// import './index.css';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PicturePopup from '../scripts/components/PicturePopup.js';
import Api from '../scripts/components/Api.js';
import {inputTitleEdit, inputAttributeEdit, popupEditForm, popupAddForm, popupAvatarform, buttonEditOpen, buttonAddOpen, buttonAvatarEdit, inputData} from '../scripts/utils/constants.js';


// фключение валидации

const validationEdit = new FormValidator(inputData, popupEditForm);
validationEdit.enableValidation();
const validationAdd = new FormValidator(inputData, popupAddForm);
validationAdd.enableValidation();
const validationAva = new FormValidator(inputData, popupAvatarform);
validationAva.enableValidation();

//просмотрщик карточек

const viewerImage = new PicturePopup ('.popup-view');
viewerImage.setEventListeners();


//переменная для передачи результата в popupDelete
let cardToRemove = {};

// функция отображения UX 

function renderLoading(popupForm, isLoading) {
  const submitButtonUX = popupForm.querySelector(inputData.submitButtonSelector);
  if(isLoading) {
    submitButtonUX.textContent = 'Сохранение...';
  } else {
    submitButtonUX.textContent = 'Сохранить';
  }
}

// подключение к серверу (работа с API)

const api = new Api({
  address: 'https://mesto.nomoreparties.co/',
  token: '4f64f170-2de3-4b0f-8592-8133023e0f4d',
  groupID: 'cohort-22',
})

//обновление аватара (работа с API)

const popupAvatar = new PopupWithForm (
  {popupSelector: '.popup-avatar',
    handleFormSubmit: (formValues) => {
      renderLoading(popupAvatarform, true); 
      api.changeAvatar(formValues.avatar)
      .then(() => console.log('Аватар обновлен'), popupAvatar.close())
      .catch(err => console.log(err)) 
      .finally(() => {
        renderLoading(popupAvatarform, false);    
      });
    }
})

popupAvatar.setEventListeners();

function avatarEdit(evt) {
  evt.preventDefault();
  validationAva.buttonDisabled();
  validationAva.clearInputsFromError();
  popupAvatar.open();
}

buttonAvatarEdit.addEventListener('click', avatarEdit);

// попап подтверждения удаления карточки

const popupDeleteCard = new PopupWithForm (
  {popupSelector: '.popup-delete',
    handleFormSubmit: () => {
      api.deleteCard(cardToRemove._id)
      .then(() => cardToRemove.deleteCard())
      .catch(err => console.log('Ошибка при выполнении'))     
      popupDeleteCard.close();
    }
})

popupDeleteCard.setEventListeners();

// получение карточек с сервера (работа с API)

const cardPromise = api.getCards()
  .then((cards) => {
    const newSection = new Section({items: Array.from(cards), renderer: (item) => {
      const cardElement = new Card({name: item.name, link: item.link, _id: item._id, likes: item.likes, owner: item.owner, myId: userInfo._id}, '.template__element_simple', viewerImage.handleCardClick.bind(viewerImage), {handlerRemoveClick: () => {
          popupDeleteCard.open(); cardToRemove = cardElement}, handlerLikesClick: () => {
            api.changeCardsLikes(cardElement._id, cardElement.isLiked())
              .then((data) => cardElement.setLikes(data))
              .catch((err) => console.log(err));
          }});
        newSection.setItem(cardElement.generateCard());
    }}, '.elements');
    newSection.renderItems();
  })
  .catch((err) => console.log(err));

  //добавление карточки на сервер (работа с API)

  const formAdd = new PopupWithForm (
    {popupSelector: '.popup-add',
     handleFormSubmit:(formValues) => {
      renderLoading(popupAddForm, true); 
      api.pushAddCardData({name: formValues.title, link: formValues.link})
      .then((res) => {
      const newAddedCard = new Section({items: res.json, renderer: (res) => {
        const cardElement = new Card({name: res.name, link: res.link, _id: res._id, likes: res.likes, owner: res.owner, myId: userInfo._id}, '.template__element_simple', viewerImage.handleCardClick.bind(viewerImage), {handlerRemoveClick: () => {
          popupDeleteCard.open(); cardToRemove = cardElement;}, handlerLikesClick: () => {
            api.changeCardsLikes(cardElement._id, cardElement.isLiked())
              .then((data) => cardElement.setLikes(data))
              .catch((err) => console.log(err));
        }});
        newAddedCard.setItem(cardElement.generateCard());
      }}, '.elements');
      formAdd.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderLoading(popupAddForm, false);    
      })
    }});
  
  
  formAdd.setEventListeners(); // установка слушателей формы
  
  function addingCard(evt) {
    evt.preventDefault();
    validationAdd.buttonDisabled();
    validationAdd.clearInputsFromError();  
    formAdd.open();
  }
  
  buttonAddOpen.addEventListener('click', addingCard);

  // получение объекта информации о пользователе с сервера, отправление информации о пользователе на сервер (работа с API)

  const userInfo = new UserInfo ({userNameSelector: '.profile__visitor-name', userAboutSelector: '.profile__visitor-attribute', userAvatarSelector: '.profile__avatar'});
   
  const formEdit = new PopupWithForm (
  { popupSelector: '.popup-edit', 
    handleFormSubmit: (formValues) => {
      renderLoading(popupEditForm, true); 
      api.pushUserData({name: formValues.name, about: formValues.about})
      .then((res) => {
      userInfo.setUserInfo({name: res.name, about: res.about, id: res._id});
      formEdit.close()})
      .catch(err => console.log(err))
      .finally(() => {
        renderLoading(popupEditForm, false);    
      })
  }});  

  // получение начальной информации с сервера (работа с API)

  const userPromise = api.getUserData()
      .then((data) => {
       userInfo.setUserInfoDefault(data);
      })
      .catch(err => console.log(err));
 
// отображение страницы

Promise.all([cardPromise, userPromise])
  .then(() => {
    console.log('Страница загружена');
  }); 

  formEdit.setEventListeners();

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
  
  buttonEditOpen.addEventListener('click', popupEditOpen)