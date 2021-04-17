export default class Card {
    constructor({name, link, _id, likes, owner}, cardSelector, handleCardClick, {handlerRemoveClick}, likerFunc) {
        this._name = name;
        this._link = link;
        this._id = _id;
        this._likes = likes;
        this._owner = owner;
        this._cardSelector = cardSelector;
        this._viewverCard = handleCardClick;
        this._handlerRemoveClick = handlerRemoveClick;
        this._likerFunc = likerFunc;
        this.isLikely = this.isLiked.bind(this);
        // this._liker = this._handlerLikeClick.bind(this);
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
        this._element.querySelector('.element__title-counter').textContent = this._likes.length;
        this.cardImage.src = this._link;
        this.cardImage.alt = this._name;
        this._element.id = this._id;
        this._element.querySelector('.element__title-text').textContent = this._name;
        this._setEventListeners();

        return this._element;
       
    }

    generateCardDelInactive() {
        this._element = this._getTemplate();

        this.buttonLike = this._element.querySelector('.element__title-like');
        this.buttonDelete = this._element.querySelector('.element__trash');
        this.cardImage = this._element.querySelector('.element__image');
        this._element.querySelector('.element__title-counter').textContent = this._likes.length;
        this.cardImage.src = this._link;
        this.cardImage.alt = this._name;
        this._element.id = this._id;
        this._element.querySelector('.element__title-text').textContent = this._name;
        this.buttonDelete.style.display="none";
        this.buttonDelete.setAttribute('disabled',true);
        this._setEventListeners();        

        return this._element;
        
    }

    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    getTrue() {
        return {
            id: this._id,
            value: true}
    }

    getFalse() {
        return {
            id: this._id,
            value: false}
    }

    isLiked() {
        return !this._likes.includes(this._owner);
    }  

    _setEventListeners() {
        this.buttonLike.addEventListener('click', () => this._likerFunc(this));
        this.buttonDelete.addEventListener('click', () => this._handlerRemoveClick());
        this.cardImage.addEventListener('click', () => this._viewverCard(this._name, this._link));
    }
}





























// cardLike() {
//     if (!this._likes.includes(this._owner) === true){
//         this._likes.push(this._owner);
//         this.buttonLike.classList.add('element__title-like_set');
//     } else {
//         this._likes.splice(indexOf(this._owner));
//         this.buttonLike.classList.remove('element__title-like_set');
//     }
// }