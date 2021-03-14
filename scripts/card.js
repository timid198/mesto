const viewImage = document.querySelector('.popup-view__image');
const viewTitle = document.querySelector('.popup-view__title');
const popupViewWindow = document.querySelector('.popup-view');

export default class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this.cardLike = this._cardLike.bind(this);
        this.deleteCard = this._deleteCard.bind(this);
        this.generateCard = this.generateCard.bind(this);
        this.viewverCard = this._viewverCard.bind(this);
        this.openPopup = this._openPopup.bind(this);
        this.escapeClose = this._escapeClose.bind(this);
        this.closePopup = this._closePopup.bind(this);
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();

        this.buttonLike = this._element.querySelector('.element__title-like');
        this.buttonDelete = this._element.querySelector('.element__trash');
        this.cardImage = this._element.querySelector('.element__image');
        this.cardImage.src = this._link;
        this.cardImage.alt = this._name;
        this._element.querySelector('.element__title-text').textContent = this._name;
        this._setEventListeners();

        return this._element;
    }


    _deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _cardLike() {
        this.buttonLike.classList.toggle('element__title-like_set');
    }

    _escapeClose(evt) {
        if (evt.keyCode === 27) {
            this.closePopup(document.querySelector('.popup_opened'));
        }
    }

    _openPopup(popup) {
        popup.classList.add('popup_opened');
        document.addEventListener('keydown', this.escapeClose);
    }

    _closePopup(popup) {
        popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this.escapeClose);
    }

    _viewverCard() {
        this.openPopup(popupViewWindow);
        viewImage.src = this.cardImage.src;
        viewImage.alt = this.cardImage.alt;
        viewTitle.textContent = this.cardImage.alt;
    }

    _setEventListeners() {
        this.buttonLike.addEventListener('click', this.cardLike);
        this.buttonDelete.addEventListener('click', this.deleteCard);
        this.cardImage.addEventListener('click', this.viewverCard);
    }
}