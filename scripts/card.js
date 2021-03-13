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

class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this.cardLike = this._cardLike.bind(this);
        this.deleteCard = this._deleteCard.bind(this);
        this.generateCard = this.generateCard.bind(this);
        this.viewverCard = this._viewverCard.bind(this);
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

    _viewverCard() {
        openPopup(popupViewWindow);
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

initialCards.forEach((item) => {
    const card = new Card(item, '.template__element_simple');
    const cardElement = card.generateCard();

    document.querySelector('.elements').append(cardElement);
})