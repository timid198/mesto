export default class Section {
    constructor( { renderer }, containerSelector ) {
        this._renderer = renderer;
        this._form = document.querySelector(containerSelector);
    }    

    renderItems(value) {
        value.forEach((item) => this._renderer(item));
    }  

    setItem(element) {
        this._form.append(element);
      }

    addItem(element) {
        this._form.prepend(element);
      }
}