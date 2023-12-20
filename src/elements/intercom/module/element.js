import { log_cli } from "../../../com/logger.js";
import { com_chain } from "../chain/element.js";
import template from "./template.html?inline";

export class com_module extends HTMLElement {
    #attached = false;
    /**@type {com_chain} */
    #_parent;
    #_index = -1;

    /**@type {string} */
    #_type;

    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = template;

        this.shadowRoot.adoptedStyleSheets = document.adoptedStyleSheets;
    }

    set index(v) {
        if (!(typeof v == "number")) return;
        this.#_index = v;
    }

    get index() {
        return this.#_index;
    }

    /**@param {string} t */
    set type(t) {
        if (!this.#_type) {
            this.shadowRoot.getElementById("type").textContent = t;
            this.#_type = t;
        }
    }

    toString() {
        return `${this.#_type}`;
    }

    get parent() {
        let parent = this.closest("com-chain");
        if (parent instanceof com_chain) {
            this.#_parent = parent;
            return parent;
        } else if (this.#_parent instanceof com_chain) {
            return this.#_parent;
        }
        return false;
    }

    remove() {
        if (this.parent) {
            this.parent?.remove_module(this);
        }
    }

    attach() {
        if (!this.#attached && this.parent) {
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
        if (this.parent) {
            let repr_str = `m -c ${this.parent.index}`;
            if (this.#attached) {
                repr_str += ` -i ${this.index}`;
            } else {
                repr_str += ` -r ${this.index}`;
            }

            log_cli(repr_str);
        }
    }

    connectedCallback() {
        if (!this.#attached && this.parent) {
            this.#attached = true;
        }
    }

    disconnectedCallback() {
        if (this.#attached && this.parent) {
            this.#attached = false;
            this.signal();
            this.#_parent.index_modules();
        }
    }
}
