export default class Card {
  constructor({ name, link, _id, likes, owner }, { myId, handlerRemoveClick, handlerLikesClick }, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._likes = likes;
    this._owner = owner;
    this.myId = myId;
    this._cardSelector = cardSelector;
    this._viewverCard = handleCardClick;
    this._handlerRemoveClick = handlerRemoveClick;
    this.handlerLikesClick = handlerLikesClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this.buttonLike = this._element.querySelector('.element__title-like');
    this.counterLike = this._element.querySelector('.element__title-counter');
    this.buttonDelete = this._element.querySelector('.element__trash');
    this.cardImage = this._element.querySelector('.element__image');
    this._element.querySelector('.element__title-counter').textContent = this._likes.length;
    this.cardImage.src = this._link;
    this.cardImage.alt = this._name;
    this._element.id = this._id;
    this._element.querySelector('.element__title-text').textContent = this._name;
    this.updateLike();
    this._setEventListeners();

    return this._element;

  }

  isShowDelete() {
    return !this._owner._id === this.myId;
  }

  setDeleteHidden() {
    if (this.isShowDelete(this)) {
      this.buttonDelete.style.display = "none";
      this.buttonDelete.setAttribute('disabled', true);
    }
  }

  renderCard() {
    if (!this._owner === this.myId) {
      this.buttonDelete.style.display = "none";
      this.buttonDelete.setAttribute('disabled', true);
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  isLiked() {
    return !!this._likes.find((like) => like._id === this.myId);
  }

  updateLike() {
    this._element.querySelector('.element__title-counter').textContent = this._likes.length;
    if (this.isLiked()) {
      this.buttonLike.classList.add('element__title-like_set');
    } else {
      this.buttonLike.classList.remove('element__title-like_set');
    }
  }

  setLikes(data) {
    this._likes = data.likes;
    this.updateLike();
  }

  _setEventListeners() {
    if (!(this._owner._id === this.myId)) {
      this.buttonDelete.classList.add('element__trash_unset');
      this.buttonDelete.setAttribute('disabled', true)
    }
    this.buttonLike.addEventListener('click', () => this.handlerLikesClick());
    this.buttonDelete.addEventListener('click', () => { this._handlerRemoveClick(), this.setDeleteHidden() });
    this.cardImage.addEventListener('click', () => this._viewverCard(this._name, this._link));
  }
}