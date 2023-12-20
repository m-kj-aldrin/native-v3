import template from "./template.html?inline";

export class input_number extends HTMLElement {
    #len = 0;
    #_max_length = 10;
    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = template;

        this.shadowRoot.adoptedStyleSheets = document.adoptedStyleSheets;

        let action_keys = /Enter|Backspace|ArrowLeft|ArrowRight|Tab/;

        this.shadowRoot.addEventListener("change", (e) => {
            this.dispatchEvent(new InputEvent("change", { bubbles: true }));
        });

        this.shadowRoot.addEventListener(
            "keydown",
            /**@param {KeyboardEvent & {target:HTMLInputElement}} e */
            (e) => {
                if (action_keys.test(e.key)) return;

                if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) return;

                if (!parseFloat(e.key)) {
                    e.preventDefault();
                }

                if (this.#len >= this.#_max_length) {
                    e.preventDefault();
                }
            }
        );

        this.shadowRoot.addEventListener(
            "input",
            /**@param {InputEvent & {target:HTMLInputElement}} e */
            (e) => {
                this.#len = e.target.value.length;

                e.target.style.width = `${this.#len + 1}ch`;
            }
        );
    }

    get value() {
        return +this.shadowRoot.querySelector("input").value;
    }

    /**@param {number} v */
    set value(v) {
        let input = this.shadowRoot.querySelector("input");
        input.value = v.toString();
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));
    }

    /**@param {number} v */
    set max_length(v) {
        this.#_max_length = Math.max(1, v);
        this.value = +this.value.toString().slice(0, this.#_max_length);
    }

    connectedCallback() {
        if (this.hasAttribute("max-length")) {
            this.max_length = +this.getAttribute("max-length");
        }
    }
    disconnectedCallback() {}
}
