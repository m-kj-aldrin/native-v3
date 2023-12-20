import { com_chain } from "../chain/element";
import template from "./template.html?inline";

export class com_network extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = template;

    this.shadowRoot.adoptedStyleSheets = document.adoptedStyleSheets;
  }

  add_chain() {
    /**@type {com_chain} */
    let new_chain = document.createElement("com-chain");
    new_chain.slot = "chains";
    this.appendChild(new_chain);

    return new_chain;
  }
}
