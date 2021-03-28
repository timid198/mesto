export default class Card {
    constructor({name, link}, cardSelector, handleCardClick) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._viewverCard = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);

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

    _setEventListeners() {
        this.buttonLike.addEventListener('click', () => this._cardLike(this));
        this.buttonDelete.addEventListener('click', () => this._deleteCard(this));
        this.cardImage.addEventListener('click', () => this._viewverCard(this._name, this._link));
    }
}