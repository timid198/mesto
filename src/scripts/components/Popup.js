export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popupElement = document.querySelector(popupSelector);
        this._escClose = this._handleEscClose.bind(this);
        this._close = this.close.bind(this);
    }

    open() {
        this._popupElement.classList.add('popup_opened');
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this._close();
        }
    }

    close() {
        this._popupElement.classList.remove('popup_opened');
        this._removeEventListeners();
    }

    _removeEventListeners() {
        this._popupElement.querySelector(`${this._popupSelector}__close`).removeEventListener('click', (evt) => { this.close()});
        this._popupElement.removeEventListener('click', (evt) =>  { if (evt.target === evt.currentTarget) { this.close() }});
        document.removeEventListener('keyup', this._escClose);
    }



   setEventListeners() {
        this._popupElement.querySelector(`${this._popupSelector}__close`).addEventListener('click', (evt) => { this.close()});
        this._popupElement.addEventListener('click', (evt) =>  { if (evt.target === evt.currentTarget) { this.close() }});
        document.addEventListener('keyup', this._escClose);
    }
}