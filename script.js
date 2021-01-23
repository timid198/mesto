const buttonOpen = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__action-close');
const popupWindow = document.querySelector('.popup');

const popUpFunc = function (evt) {
    evt.preventDefault ();
    popupWindow.classList.toggle('popup_active');
}

buttonOpen.addEventListener ('click', popUpFunc);
buttonClose.addEventListener ('click', popUpFunc);

const popUpClose = function (evt) {
if (evt.target === evt.currentTarget) {
   popUpFunc (evt)
}
}

popupWindow.addEventListener ('click', popUpClose);

const infoTitle = document.querySelector('.profile__visitor-name');
const infoAttribute = document.querySelector('.profile__visitor-attribute');

const inputTitle = document.querySelector('.popup__profile-name');
const inputAttribute = document.querySelector('.popup__profile-attribute');

const saveButton = document.querySelector('.popup__commit');



// inputTitle.setAttribute('placeholder', infoTitle.textContent);
// inputAttribute.setAttribute('placeholder', infoAttribute.textContent);
// inputTitle.value = infoTitle.textContent
//     inputAttribute.value = infoAttribute.textContent
// const fillInput = function () {
//     inputTitle.value = infoTitle.textContent
//     inputAttribute.value = infoAttribute.textContent
// }

// fillInput

inputTitle.value = infoTitle.textContent
inputAttribute.value = infoAttribute.textContent

// const otherTitle = function (evt) {
//     evt.preventDefault(evt)
    
//     if (inputTitle.value !== "" || inputAttribute.value !== "") {
//         infoTitle.textContent = inputTitle.value
//         infoAttribute.textContent = inputAttribute.value        
//     }
//     popupWindow.classList.toggle('popup_active');
// }

// // const otherAttribute = function (evt) {
    
// // }

// saveButton.addEventListener ('submit', otherTitle)
// let formElement = document.querySelector('.popup__input-container');


// function formSubmitHandler (evt) {
//     evt.preventDefault(evt)
//     if (inputTitle.value !== "" || inputAttribute.value !== "") {
//                 infoTitle.textContent = inputTitle.value
//                 infoAttribute.textContent = inputAttribute.value                
//             }
//         popupWindow.classList.toggle('popup_active');
//         }

//         formElement.addEventListener ('submit', formSubmitHandler)

let formElement = document.querySelector('.popup__action-window');
let nameInput = String;
let jobInput = String;

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameInput = inputTitle.value;
    jobInput = inputAttribute.value;
    if (saveButton.addEventListener ('click', true) ) {
        infoTitle.textContent = nameInput
        infoAttribute.textContent = jobInput
    }
}

// function saveEdit () {
//     formSubmitHandler
//     infoTitle.textContent = nameInput
//     infoAttribute.textContent = jobInput
//     popUpClose
// }




// saveButton.addEventListener ('click', saveEdit)