export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popupElement = document.querySelector(popupSelector);
        this._escClose = this._handleEscClose.bind(this);
        this._close = this.close.bind(this);
        this._clickCLoseFunction = this._clickClose.bind(this);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this._close();
        }
    }

    _clickClose(evt) {
        if ((evt.target === this._popupElement.querySelector(`${this._popupSelector}__close`)) || (evt.target === evt.currentTarget)) {
            this.close();
        }
    }

    open() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keyup', this._escClose);
    }    

    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._escClose);
    }

   setEventListeners() {
        this._popupElement.addEventListener('click', this._clickCLoseFunction);        
    }
}