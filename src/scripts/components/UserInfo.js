export default class UserInfo {
  constructor({ userNameSelector, userAboutSelector, userAvatarSelector, _id }) {
    this._userName = document.querySelector(userNameSelector);
    this._userAbout = document.querySelector(userAboutSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
    this._id = 0123;
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userAbout: this._userAbout.textContent
    };
  }

  getId() {
    return this._id
  }

  setUserInfoDefault(data) {
    this._userName.textContent = data.name;
    this._userAbout.textContent = data.about;
    this._userAvatar.src = data.avatar;
    this._id = data._id;
  }

  setUserInfo({ name, about, _id }) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
    this._id = _id;
  }

  setUserAvatar(link) {
    this._userAvatar.src = link;
  }
}
