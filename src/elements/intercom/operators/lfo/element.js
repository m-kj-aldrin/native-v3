import template from "./template.html?inline";

export class op_lfo extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = template;

    this.shadowRoot.adoptedStyleSheets = document.adoptedStyleSheets;
  }
}
