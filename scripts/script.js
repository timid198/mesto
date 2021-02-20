// добавление карточек на страницу
const templateEl = document.querySelector('.template__element');
const listContainerEl = document.querySelector('.elements');

const initialCards = [
    {
      name: 'Москва',
      link: 'https://images.unsplash.com/photo-1561217680-8cd186af7701?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80'
    },
    {
      name: 'Санкт-Петербург',
      link: 'https://images.unsplash.com/photo-1554202218-20ee1af0fb17?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80'
    },
    {
      name: 'Казань',
      link: 'https://images.unsplash.com/photo-1600421539016-cc3f0866d2b0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=401&q=80'
    },
    {
      name: 'Ростов',
      link: 'https://images.unsplash.com/photo-1524214889128-d155b841834d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=384&q=80'
    },
    {
      name: 'Петергоф',
      link: 'https://images.unsplash.com/photo-1582184455904-1645a099548b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80'
    },
    {
      name: 'Смоленск',
      link: 'https://images.unsplash.com/photo-1565161934554-44ab1400ac6e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80'
    }
  ];

  function getCard (item) {
    const newCard = templateEl.content.cloneNode(true);
    const elImage = newCard.querySelector('.element__image');
    elImage.src = item.link;
    elImage.alt = item.name;
    const elTitle = newCard.querySelector('.element__title-text');
    elTitle.textContent = item.name;
    
    const buttonTrash = newCard.querySelector ('.element__trash');    
    buttonTrash.addEventListener ('click', deleteCard);

    const buttonLike = newCard.querySelector('.element__title-like');
    buttonLike.addEventListener('click', cardLike);

    elImage.addEventListener('click', () => {
      openPopup(popupViewWindow)
      viewImage.src = item.link;
      viewImage.alt = item.name;
      viewTitle.textContent = item.name;
    });

    return newCard
}

function render () {
  const html = initialCards
    .map(getCard);
    listContainerEl.append(...html);
}

// функция открытия popup

const buttonEditOpen = document.querySelector('.profile__edit-button');
const buttonAddOpen = document.querySelector('.profile__add-button');
const popupEditWindow = document.querySelector('.popup-edit');
const popupAddWindow = document.querySelector('.popup-add');
const popupViewWindow = document.querySelector('.popup-view');

function openPopup (popup) {
  popup.classList.add('popup_opened');
}

buttonEditOpen.addEventListener ('click', (evt) => {evt.preventDefault(); inputTitleEdit.value = infoTitle.textContent; inputAttributeEdit.value = infoAttribute.textContent; openPopup (popupEditWindow)});
buttonAddOpen.addEventListener ('click', (evt) => {evt.preventDefault();  openPopup (popupAddWindow)});

// функция закрытия popup

function closePopup (popup) {
  popup.classList.remove('popup_opened')
}

const buttonEditClose = document.querySelector('.popup-edit__close');
const buttonAddClose = document.querySelector('.popup-add__close');
const buttonViewClose = document.querySelector('.popup-view__close');

buttonEditClose.addEventListener ('click', (evt) => {evt.preventDefault(); closePopup (popupEditWindow)});
buttonAddClose.addEventListener ('click', (evt) => {evt.preventDefault();  closePopup (popupAddWindow)});
buttonViewClose.addEventListener ('click', (evt) => {evt.preventDefault();  closePopup (popupViewWindow)});

// наполнение редактора содержимым страницы

const infoTitle = document.querySelector('.profile__visitor-name');
const infoAttribute = document.querySelector('.profile__visitor-attribute');

const formElementEdit = document.querySelector('.popup-edit__window');

const inputTitleEdit = formElementEdit.querySelector('.popup__input_name');
const inputAttributeEdit = formElementEdit.querySelector('.popup__input_about');

function formSubmitHandlerEdit (evt) {
    evt.preventDefault();    
    infoTitle.textContent = inputTitleEdit.value;
    infoAttribute.textContent = inputAttributeEdit.value;
    closePopup (popupEditWindow);
}

formElementEdit.addEventListener ('submit', formSubmitHandlerEdit)

// попап на добавление карточек

const formElementAdd = popupAddWindow.querySelector('.popup-add__window');
const inputAddName = formElementAdd.querySelector('.popup__input_title');
const inputAddLink = formElementAdd.querySelector('.popup__input_link');

function addCard (card) {
    listContainerEl.prepend(card);
} 

function renderCard (evt) {
    evt.preventDefault ();
    addCard (getCard({name: inputAddName.value, link: inputAddLink.value}));
    inputAddName.value = '';
    inputAddLink.value = '';
    closePopup (popupAddWindow);
}

formElementAdd.addEventListener('submit', renderCard)

// удаление карточки

function deleteCard (evt) {
    const targetEl = evt.target;
    const targetItem = targetEl.closest('.element');
    targetItem.remove();
} 

// кнопка лайк

function cardLike (evt) {
  const targetLike = evt.target;
  const targetedLike = targetLike.closest('.element__title-like');
  targetedLike.classList.toggle('element__title-like_set');
}

// переменные просмотрщика карточек

const viewImage = document.querySelector('.popup-view__image');
const viewTitle = document.querySelector('.popup-view__title');

render ();