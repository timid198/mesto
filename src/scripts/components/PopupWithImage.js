import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popupElement.querySelector('.popup-view__image');
        this._title = this._popupElement.querySelector('.popup-view__title');
    }

    handleCardClick(name, link) {
        super.open();
        this.setEventListeners();
        this._image.src = link;
        this._image.alt = name;
        this._title.textContent = name;       
    }
}