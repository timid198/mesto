export default class Section {
    constructor( { items, renderer }, containerSelector ) {
        this._items = items;
        this._renderer = renderer;
        this._form = document.querySelector(containerSelector);
    }    

    renderItems() {
        this._items.forEach(item => this._renderer(item));
    }  

    setItem(element) {
        this._form.prepend(element);
      }
}