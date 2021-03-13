const templateEl = document.querySelector('.template__element');
const listContainerEl = document.querySelector('.elements');
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
const addingButton = document.querySelector('.popup-add__button');
const savingButton = document.querySelector('.popup-edit__button');
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

//
function inputFocus(inputEl) {
  inputEl.focus();}


// функция открытия popup

function escapeClose(evt) {
  if (evt.keyCode === 27) {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escapeClose);
}

buttonEditOpen.addEventListener('click', (evt) => { fillInput(); checkButtonForm(savingButton); openPopup(popupEditWindow) });
buttonAddOpen.addEventListener('click', (evt) => { openPopup(popupAddWindow); checkButtonForm(addingButton) });

// функция закрытия popup

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeClose);
}

buttonEditClose.addEventListener('click', (evt) => { closePopup(popupEditWindow) });
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
  listContainerEl.prepend(card);
}

function renderCard(evt) {
  evt.preventDefault();
  addCard(new Card({ name: inputAddName.value, link: inputAddLink.value }, '.template__element_simple'));
  clearInputAdd();
  closePopup(popupAddWindow);
}

formElementAdd.addEventListener('submit', renderCard)

// удаление карточки

// function deleteCard(evt) {
//   const targetEl = evt.target;
//   const targetItem = targetEl.closest('.element');
//   targetItem.remove();
// }

// кнопка лайк

// function cardLike(evt) {
//   const targetLike = evt.target;
//   const targetedLike = targetLike.closest('.element__title-like');
//   targetedLike.classList.toggle('element__title-like_set');
// }
//закрытие при миссклике

popupEditWindow.addEventListener('click', (evt) => { if (evt.target === evt.currentTarget) { closePopup(popupEditWindow) } });
popupAddWindow.addEventListener('click', (evt) => { if (evt.target === evt.currentTarget) { clearInputAdd(); closePopup(popupAddWindow) } });
popupViewWindow.addEventListener('click', (evt) => { if (evt.target === evt.currentTarget) { closePopup(popupViewWindow) } });

//отображение карточек

// function getCard(item) {
//   const newCard = templateEl.content.cloneNode(true);
//   const elImage = newCard.querySelector('.element__image');
//   elImage.src = item.link;
//   elImage.alt = item.name;
//   const elTitle = newCard.querySelector('.element__title-text');
//   elTitle.textContent = item.name;

//   const buttonTrash = newCard.querySelector('.element__trash');
//   buttonTrash.addEventListener('click', deleteCard);

//   const buttonLike = newCard.querySelector('.element__title-like');
//   buttonLike.addEventListener('click', cardLike);

//   elImage.addEventListener('click', () => {
//     openPopup(popupViewWindow)
//     viewImage.src = item.link;
//     viewImage.alt = item.name;
//     viewTitle.textContent = item.name;
//   });

//   return newCard
// }

// function render() {
//   const html = initialCards
//     .map(getCard);
//   listContainerEl.append(...html);
// }

// render()
// elImage.addEventListener('click', () => {
//   openPopup(popupViewWindow)
//   viewImage.src = item.link;
//   viewImage.alt = item.name;
//   viewTitle.textContent = item.name;
// });