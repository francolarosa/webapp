class PageManagerTemplate extends Component {
    static get properties() {
      return {
        'url-page': String
      };
    }
  
    static get is() { return 'page-manager-template'; }
  
    constructor() { super(); }
  
    attributeChangedCallback(name, oldValue, newValue) {
      const main = this.shadowRoot.querySelector('#main');
      main.innerHTML = ``;
      if (name && name === 'url-page' && window.pages.length) {
        window.pages.forEach(element => {
          if (newValue === element.page) {
            element.components.forEach(component => {
              const attr = () => {
                let str = '';
                for(const key in component.attributes) {
                  str += `${key}="${component.attributes[key]}" `;
                }
                return str;
              }
              this.shadowRoot.querySelector('#main').innerHTML += `
                <${component.tag} ${attr()}></${component.tag}>
              `
            });
          }
        });
      }
    }
  }
  
  window.customElements.define(PageManagerTemplate.is, PageManagerTemplate)