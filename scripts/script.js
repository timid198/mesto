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

  let getCard =  function (item) {
    const newCard = templateEl.content.cloneNode(true);
    const elImage = newCard.querySelector('.element__image');
    elImage.src = item.link;
    elImage.alt = item.name;
    const elTitle = newCard.querySelector('.element__title-text');
    elTitle.textContent = item.name;

    return newCard;
}

function render () {
    const html = initialCards
    .map(getCard);

    listContainerEl.append(...html);
}

render ();

let buttonEditOpen = document.querySelector('.profile__edit-button');
let buttonEditClose = document.querySelector('.popup-edit__action-close');
let popupEditWindow = document.querySelector('.popup-edit');

let popUpEditFunc = function (evt) {
    evt.preventDefault ();
    popupEditWindow.classList.toggle('popup-edit_active');
}

buttonEditOpen.addEventListener ('click', popUpEditFunc);
buttonEditClose.addEventListener ('click', popUpEditFunc);

let popUpEditClose = function (evt) {
if (evt.target === evt.currentTarget) {
   popUpEditFunc (evt)
}
}

popupEditWindow.addEventListener ('click', popUpEditClose);

let infoTitle = document.querySelector('.profile__visitor-name');
let infoAttribute = document.querySelector('.profile__visitor-attribute');

let formElementEdit = document.querySelector('.popup-edit__action-window');

let inputTitleEdit = formElementEdit.querySelector('.popup-edit__profile_name');
let inputAttributeEdit = formElementEdit.querySelector('.popup-edit__profile_attribute');

let nameInput = "";
let jobInput = "";

inputTitleEdit.value = infoTitle.textContent;
inputAttributeEdit.value = infoAttribute.textContent;

function formSubmitHandlerEdit (evt) {
    evt.preventDefault();    
    nameInput = inputTitleEdit.value;
    jobInput = inputAttributeEdit.value;
    infoTitle.textContent = nameInput;
    infoAttribute.textContent = jobInput;
    popupEditWindow.classList.toggle('popup-edit_active');
}

formElementEdit.addEventListener ('submit', formSubmitHandlerEdit)

let buttonAddOpen = document.querySelector('.profile__add-button');
let buttonAddClose = document.querySelector('.popup-add__action-close');
let popupAddWindow = document.querySelector('.popup-add');

let popUpAddFunc = function (evt) {
    evt.preventDefault ();
    popupAddWindow.classList.toggle('popup-add_active');
}

buttonAddOpen.addEventListener ('click', popUpAddFunc);
buttonAddClose.addEventListener ('click', popUpAddFunc);

let popUpAddClose = function (evt) {
if (evt.target === evt.currentTarget) {
   popUpAddFunc (evt)
}
}

popupAddWindow.addEventListener ('click', popUpAddClose);

// let infoTitle = document.querySelector('.profile__visitor-name');
// let infoAttribute = document.querySelector('.profile__visitor-attribute');

// let formElementEdit = document.querySelector('.popup-edit__action-window');

// let inputTitleEdit = formElement.querySelector('.popup-edit__profile_name');
// let inputAttributeEdit = formElement.querySelector('.popup-edit__profile_attribute');

// let nameInput = "";
// let jobInput = "";

// inputTitleEdit.value = infoTitle.textContent;
// inputAttributeEdit.value = infoAttribute.textContent;

// function formSubmitHandlerEdit (evt) {
//     evt.preventDefault();    
//     nameInput = inputTitleEdit.value;
//     jobInput = inputAttributeEdit.value;    
//     infoTitle.textContent = nameInput;
//     infoAttribute.textContent = jobInput;
//     popupEditWindow.classList.toggle('popup-edit_active');
// }

// formElementEdit.addEventListener ('submit', formSubmitHandlerEdit)