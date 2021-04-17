// import './index.css';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/formValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Api from '../scripts/components/Api.js';
import {inputTitleEdit, inputAttributeEdit, popupEditForm, popupAddForm, buttonEditOpen, buttonAddOpen, inputData, patternProfile} from '../scripts/utils/constants.js';


// фключение валидации

const validationEdit = new FormValidator(inputData, popupEditForm);
validationEdit.enableValidation();
const validationAdd = new FormValidator(inputData, popupAddForm);
validationAdd.enableValidation();

//просмотрщик карточек

const viewerImage = new PopupWithImage ('.popup-view');
viewerImage.setEventListeners();


//функция создания карточки
let cardToRemove = {};

function createCard(thing, cardClass, counter) {
  const card =new Card(thing, cardClass, viewerImage.handleCardClick.bind(viewerImage), counter, popupDeleteCard);
  return card.generateCard();
}

function createCardWithoutDelButton(thing, cardClass, counter) {
  const card =new Card(thing, cardClass, viewerImage.handleCardClick.bind(viewerImage), counter, popupDeleteCard);
  return card.generateCardDelInactive();
}

// fut.presentCardDeleteButton();
//заполнение страницы

// const newSection = new Section({items: initialCards, renderer: (item) => {
//   const cardElement = createCard (item, '.template__element_simple' );
//   newSection.setItem(cardElement);
// }}, '.elements');

// newSection.renderItems();

//попап редактирования профиля

// const userInfo = new UserInfo ({userNameSelector: '.profile__visitor-name', userAboutSelector: '.profile__visitor-attribute', userAvatarSelector: '.profile__avatar'});
// const formEdit = new PopupWithForm (
//   { popupSelector: '.popup-edit', 
//     handleFormSubmit: (formValues) => {
//       userInfo.setUserInfo({name: formValues.name, about: formValues.about});
//       formEdit.close();
// }});

// formEdit.setEventListeners(); // установка слушателей формы

// function fillInput() {
//   const userData = userInfo.getUserInfo();
//   inputTitleEdit.value = userData.userName;
//   inputAttributeEdit.value = userData.userAbout;
// }

// function popupEditOpen(evt) {
//   evt.preventDefault();
//   validationEdit.buttonEnabled();
//   validationEdit.clearInputsFromError();
//   fillInput();  
//   formEdit.open();
// }

// buttonEditOpen.addEventListener('click', popupEditOpen);

//попап добавления карточки

// const formAdd = new PopupWithForm (
//   {popupSelector: '.popup-add',
//    handleFormSubmit:(formValues) => {
//     const generatedCard = createCard({name:formValues.title, link:formValues.link}, '.template__element_simple');
//     newSection.setItem(generatedCard);
//     formAdd.close();
//   }});

// formAdd.setEventListeners(); // установка слушателей формы

// function addingCard(evt) {
//   evt.preventDefault();
//   validationAdd.buttonDisabled();
//   validationAdd.clearInputsFromError();  
//   formAdd.open();
// }

// buttonAddOpen.addEventListener('click', addingCard);

// подключение к серверу (работа с API)

const api = new Api({
  address: 'https://mesto.nomoreparties.co/',
  token: '4f64f170-2de3-4b0f-8592-8133023e0f4d',
  groupID: 'cohort-22',
})

// получение объекта карточек с сервера (работа с API)


// const newSection = new Section({items: item, renderer: (item) => {
//   const cardElement = createCard (item, '.template__element_simple' );
//   newSection.setItem(cardElement);
// }}, '.elements');

const popupDeleteCard = new PopupWithForm (
  {popupSelector: '.popup-delete',
    handleFormSubmit: () => { 
      api.deleteCard(cardToRemove._id)
      .then(() => cardToRemove.deleteCard())
      .catch(err => console.log('Ошибка при выполнении'))     
      popupDeleteCard.close();
    }
})

// {handlerLikesClick: () => {cardToLike = cardElement, cardLikesFunc(cardToLike), console.log(cardToLike.likes)}}
// {handlerLikesClick: () => {console.log(cardElement)}}

api.getCards()
  .then((cards) => {
    const newSection = new Section({items: Array.from(cards), renderer: (item) => {
      const cardElement = new Card({name: item.name, link: item.link, _id: item._id, likes: item.likes, owner: item.owner, myId: userInfo._id}, '.template__element_simple', viewerImage.handleCardClick.bind(viewerImage), {handlerRemoveClick: () => {
          popupDeleteCard.open(); cardToRemove = cardElement}, handlerLikesClick: () => {
            api.changeCardsLikes(cardElement._id, cardElement.isLiked())
              .then((data) => cardElement.setLikes(data))
              .catch((err) => console.log(err));
          }
        });
        newSection.setItem(cardElement.generateCard());
    }}, '.elements');
    
    newSection.renderItems();
  });

  //добавление карточки на сервер (работа с API)

  const formAdd = new PopupWithForm (
    {popupSelector: '.popup-add',
     handleFormSubmit:(formValues) => {
      api.pushAddCardData({name: formValues.title, link: formValues.link})
      .then((res) => {
      const newAddedCard = new Section({items: res.json, renderer: (res) => {
        const cardElement = new Card({name: res.name, link: res.link, _id: res._id, likes: res.likes, owner: res.owner, myId: userInfo._id}, '.template__element_simple', viewerImage.handleCardClick.bind(viewerImage), {handlerRemoveClick: () => {
          popupDeleteCard.open(); cardToRemove = cardElement;}, handlerLikesClick: () => {
            api.changeCardsLikes(cardElement._id, cardElement.isLiked())
              .then((data) => cardElement.setLikes(data))
              .catch((err) => console.log(err));
        }
      });
        newAddedCard.setItem(cardElement.generateCard());
      }}, '.elements');
      formAdd.close();
      }
  )}});
  
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
      api.pushUserData({name: formValues.name, about: formValues.about})
      .then((res) => {
      userInfo.setUserInfo({name: res.name, about: res.about, id: res._id});
      })
      formEdit.close();
  }});

  // let change = Array.from(userInfo)._id;
  // console.log(userId);

  

  api.getUserData()
      .then((data) => {
       userInfo.setUserInfoDefault(data);
      })
 

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

  // отправление информации о пользователе на сервер (работа с API)

  // const formEdit = new PopupWithForm (
  //   { popupSelector: '.popup-edit', 
  //     handleFormSubmit: (formValues) => {
  //       api.pullUserData({name: formValues.name, about: formValues.about});
  //       formEdit.close();
  // }})

  // попап подтверждения удаления

popupDeleteCard.setEventListeners();