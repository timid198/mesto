export default class Section {
    constructor( { items, renderer }, containerSelector ) {
        this._items = items;
        this._renderer = renderer;
        this._form = document.querySelector(containerSelector);
    }    

    renderItems() {
        this._items.slice(0, 6).forEach(item => this._renderer(item));
    }  

    setItem(element) {
        this._form.append(element);
      }
}