class Section {
    constructor(renderer, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(element, isStart = false) {
        if (isStart) {
            this._container.prepend(element);
        } else {
            this._container.append(element);
        }
    }

    renderItems(items) {
        items.forEach((item) => {
            this._renderer(item);
        });
    }

}

export { Section };