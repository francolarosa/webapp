/**
 * @Method
 * @description will fire an event
 * this.e(selector, event, method callback)
 * 
 * @Method
 * @description return the dom element by selector
 * this.findSelector(selector)
 * 
 * @Method
 * @description return all the dom elements by selector
 * this.allSelectors(selector)
 * 
 * @Method
 * @description will fire a custom event
 * this.fireEvent(event, detail)
 * 
 * @Object
 * this.{{camelCase property observer}}() use to change the value from an observer component
 * @example this.propertyObserver(value)
 * 
 * 
 *
  this.on('#btn', 'click').do(() => {
    this.sarasa(true);
  });
  this.on('button', 'click').emit('set-copy', {
    copied: false
  });

  this.htmlRender('.div').add(`
    <div>another div ${newValue}</div>
  `);
  this.htmlRender('.div').set(`
    <button>Click</button>
  `);

  this.cssStyle('.div', 'color', 'red')


 * 
 */
class Component extends HTMLElement {

  static get observedAttributes() {
    const arrProps = [];
    for (const key in this.properties) {
      arrProps.push(key)
    }
    return arrProps;
  }

  constructor() {
    super();
    window.webComponentClass = this;
    window.observers = {};
    this.cssPath = window.location.pathname.replace('index.html', `components/${this.constructor.is}/${this.constructor.is}.css`);
    this.link = `<link rel="stylesheet" type="text/css" href="${this.cssPath}">`;
    this.$ = {};
    console.log(this.constructor.is)
    this._template = document.createElement("template");
    this._shadowroot = this.attachShadow({ mode: "open" });
    this._template.innerHTML = `
                ${this.constructor.is != 'page-manager-template' ? this.link : ''}
                <div id="main">${this.render()}</div>`;
    this._shadowroot.appendChild(this._template.content.cloneNode(true));

    this.constructor.observedAttributes.forEach(element => {
      const attrFormating = (value) => {
        const attr = value.split('-');
        const arrFormatted = [];
        attr.forEach((val, index) => {
          if (index === 0) {
            arrFormatted.push(val);
          } else if (index !== 0) {
            const upperWord = val.charAt(0).toUpperCase() + val.slice(1);
            arrFormatted.push(upperWord);
          }
        });
        return arrFormatted.join('');
      };
      Object.defineProperty(this.$, attrFormating(element), {
        value: function(value){
          if (value) {
            if (typeof value === 'object') {
              window.webComponentClass.setAttribute(element, JSON.stringify(value));
              return;
            } else {
              window.webComponentClass.setAttribute(element, value);
            }
          } else {
            try {
              return JSON.parse(window.webComponentClass.getAttribute(element));
            } catch (e) {
              return window.webComponentClass.getAttribute(element);
            }
          }
        },
        writable: true,
        enumerable: true,
        configurable: true
      });
    });
  }

  findSelector(selector){
    return this.shadowRoot.querySelector(selector);
  }

  render() { return ``; }

  cssStyle(selector, prop, value) {
    this.shadowRoot.querySelector(`#main ${selector}`).style[prop] = value;
  }

  htmlRender(selector) {
    return {
      add: (value) => {
        this.shadowRoot.querySelector(`#main ${selector}`).innerHTML += value;
      },
      set: (value) => {
        this.shadowRoot.querySelector(`#main ${selector}`).innerHTML = value;
      }
    };
  }

  allSelectors(selector){
    return this.shadowRoot.querySelectorAll(selector);
  }

  fireEvent(custom, detail) {
    this.dispatchEvent(new CustomEvent(custom,{
      bubbles: true,
      composed: true,
      detail
    }));
  }

  on(selector, type) {
    const element = this.shadowRoot.querySelector(selector);
    return {
      emit: (custom, detail) => {
        element.addEventListener(type, () => {
          this.fireEvent(custom, detail);
        })
      },
      do: (something) => {
        element.addEventListener(type, () => {
          something()
        })
      }
    }
  }

  jsonConvert(value, to) {
    if(to === 'string') {
      return JSON.stringify(value);
    }
    return JSON.parse(value);
  }
}