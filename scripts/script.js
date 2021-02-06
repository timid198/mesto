const templateEl = document.querySelector('.template__element');
const templatePopup = document.querySelector ('.template__popup');
let buttonOpen = document.querySelector('.profile__edit-button');
let buttonClose = document.querySelector('.popup__action-close');
let popupWindow = document.querySelector('.popup');

const listContainerEl = document.querySelector('.elements');
const page = document.querySelector('.page');

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

const editProfile = [
    { title: 'Редактировать профиль',
      self: 'Имя',
      about: 'О себе',
      button: 'Сохранить'
    }
];

const getPopup =  function (item) {
    const newPopup = templatePopup.content.cloneNode(true);
    const popupTitle = newPopup.querySelector('.popup__title');
    popupTitle.textContent = item.title;
    
    const popupName = newPopup.querySelector('.popup__profile_name');
    popupName.placeholder = item.self;

    const popupAbout = newPopup.querySelector('.popup__profile_attribute');
    popupAbout.placeholder = item.about;

    const popupCommit = newPopup.querySelector('.popup__commit');
    popupCommit.textContent = item.button;

    return newPopup;
}



let popUpFunc = function (evt) {
    evt.preventDefault ();
    const a = editProfile;
    

    page.append(Array.from(a).map(getPopup));
}

buttonOpen.addEventListener ('click', popUpFunc);
// buttonClose.addEventListener ('click', popUpFunc);

// let popUpClose = function (evt) {
// if (evt.target === evt.currentTarget) {
//    popUpFunc (evt)
// }
// }

// popupWindow.addEventListener ('click', popUpClose);

let infoTitle = document.querySelector('.profile__visitor-name');
let infoAttribute = document.querySelector('.profile__visitor-attribute');

let formElement = document.querySelector('.popup__action-window');

// let inputTitle = formElement.querySelector('.popup__profile_name');
// let inputAttribute = formElement.querySelector('.popup__profile_attribute');

let nameInput = "";
let jobInput = "";

// inputTitle.value = infoTitle.textContent;
// inputAttribute.value = infoAttribute.textContent;

function formSubmitHandler (evt) {
    evt.preventDefault();    
    nameInput = inputTitle.value;
    jobInput = inputAttribute.value;    
    infoTitle.textContent = nameInput;
    infoAttribute.textContent = jobInput;
    popupWindow.classList.toggle('popup_active');
}

// formElement.addEventListener ('submit', formSubmitHandler)

