import template from "./template.html?inline";

export class com_module extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = template;

    this.shadowRoot.adoptedStyleSheets = document.adoptedStyleSheets

  }
}
