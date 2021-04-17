export default class Api {
    constructor({address, token, groupID}) {
        this._address = address;
        this._token = token;
        this._groupID = groupID;
    }


    getCards() {
        return fetch(`${this._address}v1/${this._groupID}/cards`, {
            headers: {
            authorization: `${this._token}`
            }
        })
        .then(res => {
            if (res.ok) {
            return res.json();}
        return Promise.reject(`Ошибка ${res.status}`)})
       }

    getUserData() {
        return fetch(`${this._address}v1/${this._groupID}/users/me`, {
            headers: {
            authorization: `${this._token}`
            }
        }) 

        .then(res => {
            if (res.ok) {
            return res.json();}
        return Promise.reject(`Ошибка ${res.status}`)})
        }

    pushUserData(data) {
        return fetch(`${this._address}v1/${this._groupID}/users/me`, {
            method: 'PATCH',
            headers: {
            authorization: `${this._token}`,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${data.name}`,
                about: `${data.about}`,
            })
        })

        .then(res => {
            if (res.ok) {
            return res.json();}
        return Promise.reject(`Ошибка ${res.status}`)})
        }

    pushAddCardData(data) {
        return fetch(`${this._address}v1/${this._groupID}/cards`, {
            method: 'POST',
            headers: {
            authorization: `${this._token}`,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${data.name}`,
                link: `${data.link}`,
            })
        })

        .then(res => {
            if (res.ok) {
            return res.json();}
        return Promise.reject(`Ошибка ${res.status}`)})
        }

    changeCardLikes(id, isLike) {
        const status = isLike ? 'DELETE' : 'PUT';
        return fetch(`${this._address}v1/${this._groupID}/cards/likes/${id}`, {
            method: status,
            headers: {
            authorization: `${this._token}`
            }
        })
           .then(res => {
            if (res.ok) {
            return res.json();}
        return Promise.reject(`Ошибка ${res.status}`)})
    }
}