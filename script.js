let buttonOpen = document.querySelector('.profile__edit-button');
let buttonClose = document.querySelector('.popup__action-close');
let popupWindow = document.querySelector('.popup');

let popUpFunc = function (evt) {
    evt.preventDefault ();
    popupWindow.classList.toggle('popup_active');
}

buttonOpen.addEventListener ('click', popUpFunc);
buttonClose.addEventListener ('click', popUpFunc);

let popUpClose = function (evt) {
if (evt.target === evt.currentTarget) {
   popUpFunc (evt)
}
}

popupWindow.addEventListener ('click', popUpClose);

let infoTitle = document.querySelector('.profile__visitor-name');
let infoAttribute = document.querySelector('.profile__visitor-attribute');

let inputTitle = document.querySelector('.popup__profile-name');
let inputAttribute = document.querySelector('.popup__profile-attribute');

let formElement = document.querySelector('.popup__action-window');
let nameInput = "";
let jobInput = "";

inputTitle.value = infoTitle.textContent;
inputAttribute.value = infoAttribute.textContent;

function formSubmitHandler (evt) {
    evt.preventDefault();    
    nameInput = inputTitle.value;
    jobInput = inputAttribute.value;    
    infoTitle.textContent = nameInput;
    infoAttribute.textContent = jobInput;
    popupWindow.classList.toggle('popup_active');
}

formElement.addEventListener ('submit', formSubmitHandler)