customElements.define('flat-app', class extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['page'];
    }

    get page() {
        return this.getAttribute('page');
    }

    set page(value) {
        if (typeof value === 'undefined' || value === '') {
            this.removeAttribute('page');
            return
        }
        this.setAttribute('page', value);
    }

    attributeChangedCallback() {
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        document.querySelectorAll(`flat-page`).forEach((ele) => {
            ele.removeAttribute('active');
        });
        document.querySelector(`#${this.page}`).setAttribute('active', 'true');
    }
});

customElements.define('flat-nav', class extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['label', 'target'];
    }

    get label() {
        return this.getAttribute('label');
    }

    set label(value) {
        this.setAttribute('label', value);
    }

    get target() {
        return this.getAttribute('target');
    }

    set target(value) {
        this.setAttribute('target', value);
    }

    attributeChangedCallback() {
        this.render();
    }

    connectedCallback() {
        this.render();
        this.addEventListener('click', (evt) => {
            evt.preventDefault();
            document.querySelector(`flat-app`).setAttribute('page', `${this.target}`);
        });
    }

    render() {
        this.innerHTML = `${this.label}`;
    }
});

customElements.define('flat-page', class extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['active'];
    }

    get active() {
        return this.hasAttribute('active');
    }

    set active(value) {
        if (typeof value === 'undefined' || value === '') {
            this.removeAttribute('active');
            return
        }
        this.setAttribute('page', value);
    }

    attributeChangedCallback() {
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.classList.remove('active');
        if (this.active) {
            this.classList.add('active');
        }
    }
});