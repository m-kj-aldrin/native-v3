import { com_module } from "../module/element";
import template from "./template.html?inline";

export class com_chain extends HTMLElement {
  #attached = false;
  #_index = -1;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = template;
    this.shadowRoot.adoptedStyleSheets = document.adoptedStyleSheets;

    console.log(this.shadowRoot.adoptedStyleSheets[0]);
  }

  set index(v) {
    if (!(typeof v == "number")) return;
    this.#_index = v;
  }

  get index() {
    return this.#_index;
  }

  add_module() {
    /**@type {com_module} */
    let new_module = document.createElement("com-module");
    new_module.slot = "modules";

    this.appendChild(new_module);

    return new_module;
  }

  attach() {
    if (!this.#attached) {
      this.#attached = true;
      this.signal();
    }
  }

  detach() {
    if (this.#attached) {
      this.#attached = false;
      this.signal();
    }
  }

  signal() {
    let repr_str = `c ${""} ${this.index}`;

    console.log(repr_str);
  }
}
