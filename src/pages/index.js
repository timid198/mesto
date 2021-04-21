// import './index.css';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PicturePopup from '../scripts/components/PicturePopup.js';
import Api from '../scripts/components/Api.js';
import { inputTitleEdit, inputAttributeEdit, popupEditForm, popupAddForm, popupAvatarform, buttonEditOpen, buttonAddOpen, buttonAvatarEdit, inputData, avaPlace } from '../scripts/utils/constants.js';

// включение валидации

const validationEdit = new FormValidator(inputData, popupEditForm);
validationEdit.enableValidation();
const validationAdd = new FormValidator(inputData, popupAddForm);
validationAdd.enableValidation();
const validationAva = new FormValidator(inputData, popupAvatarform);
validationAva.enableValidation();

//просмотрщик карточек

const viewerImage = new PicturePopup('.popup-view');
viewerImage.setEventListeners();

//переменная для передачи результата в popupDelete

let cardToRemove = {};

// функция отображения UX 

function renderLoading(popupForm, isLoading) {
  const submitButtonUX = popupForm.querySelector(inputData.submitButtonSelector);
  if (isLoading) {
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

// отображение страницы

const createCard = (cardData) => {
  const card = new Card (cardData, {
    myId: userInfo._id,
    handlerRemoveClick: () => { popupDeleteCard.open(); cardToRemove = card },
    handlerLikesClick: () => {
      api.changeCardsLikes(card._id, card.isLiked())
      .then((data) => card.setLikes(data))
      .catch((err) => console.log(err));
    }
  }, '.template__element_simple', viewerImage.handleCardClick.bind(viewerImage));
  return card.generateCard()
}

const newSection = new Section({
  renderer: (item, checker) => {
    newSection.addItem(createCard(item, checker));
  }}, '.elements')

// function cardSectionRender(sectionValues) {
//   const createSection = new Section({
//     renderer: (item) => {
//       const newCard = new Card(item, {
//         myId: userInfo._id,
//         handlerRemoveClick: () => { popupDeleteCard.open(); cardToRemove = newCard },
//         handlerLikesClick: () => {
//           api.changeCardsLikes(newCard._id, newCard.isLiked())
//           .then((data) => newCard.setLikes(data))
//           .catch((err) => console.log(err));
//         }
//       }, '.template__element_simple', viewerImage.handleCardClick.bind(viewerImage));
//       createSection.setItem(newCard.generateCard());
//     }}, '.elements')

//   createSection.renderItems(sectionValues);
// }

// function cardSectionRenderAdding(sectionValues) {
//   const createSection = new Section({
//     renderer: (item) => {
//       const newCard = new Card(item, {
//         myId: userInfo._id,
//         handlerRemoveClick: () => { popupDeleteCard.open(); cardToRemove = newCard },
//         handlerLikesClick: () => {
//           api.changeCardsLikes(newCard._id, newCard.isLiked())
//           .then((data) => newCard.setLikes(data))
//           .catch((err) => console.log(err));
//         }
//       }, '.template__element_simple', viewerImage.handleCardClick.bind(viewerImage));
//       createSection.addItem(newCard.generateCard());
//     }}, '.elements')

//   createSection.renderItems(sectionValues);
// }

Promise.all([api.getCards(), api.getUserData()])
  .then((res) => {
    userInfo.setUserInfoDefault(res[1]);
    newSection.renderItems(res[0])
  })
  .catch((err) => console.log(err));

//добавление карточки на сервер (работа с API)

const formAdd = new PopupWithForm(
  {
    popupSelector: '.popup-add',
    handleFormSubmit: (formValues) => {
      renderLoading(popupAddForm, true);
      api.pushAddCardData({ name: formValues.title, link: formValues.link })
        .then((res) => {
          newSection.renderItems([res])
        })
        .catch((err) => console.log(err))
        .finally(() => {
          renderLoading(popupAddForm, false);
        })
      formAdd.close();
    }
  });

formAdd.setEventListeners(); // установка слушателей формы

function addingCard(evt) {
  evt.preventDefault();
  validationAdd.buttonDisabled();
  validationAdd.clearInputsFromError();
  formAdd.open();
}

buttonAddOpen.addEventListener('click', addingCard);

// получение объекта информации о пользователе с сервера, отправление информации о пользователе на сервер (работа с API)

const userInfo = new UserInfo({ userNameSelector: '.profile__visitor-name', userAboutSelector: '.profile__visitor-attribute', userAvatarSelector: '.profile__avatar' });

const formEdit = new PopupWithForm(
  {
    popupSelector: '.popup-edit',
    handleFormSubmit: (formValues) => {
      renderLoading(popupEditForm, true);
      api.pushUserData({ name: formValues.name, about: formValues.about })
        .then((res) => {
          userInfo.setUserInfo({ name: res.name, about: res.about, id: res._id });
          formEdit.close()
        })
        .catch(err => console.log(err))
        .finally(() => {
          renderLoading(popupEditForm, false);
        })
    }
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

//обновление аватара (работа с API)

const popupAvatar = new PopupWithForm(
  {
    popupSelector: '.popup-avatar',
    handleFormSubmit: (formValues) => {
      renderLoading(popupAvatarform, true);
      avaPlace.src = formValues.avatar;
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

const popupDeleteCard = new PopupWithForm(
  {
    popupSelector: '.popup-delete',
    handleFormSubmit: () => {
      api.deleteCard(cardToRemove._id)
        .then(() => cardToRemove.deleteCard())
        .catch((err) => console.log(err))
      popupDeleteCard.close();
    }
  })

popupDeleteCard.setEventListeners();