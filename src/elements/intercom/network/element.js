import { com_chain } from "../chain/element";
import template from "./template.html?inline";

export class com_network extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = template;

        this.shadowRoot.adoptedStyleSheets = document.adoptedStyleSheets;
    }

    /**
     * @param {import("../types.js").chain_config} config
     * @returns {com_chain}
     */
    add_chain(config) {
        let new_chain = document.createElement("com-chain");
        new_chain.slot = "chains";

        new_chain.index = this.chains.length;

        if (config?.inputs) {
            new_chain.inputs = config.inputs;
        }

        if (config.modules.length) {
            let new_modules = config.modules.map((module, i) => {
                let new_module = document.createElement("com-module");
                new_module.type = module.type;
                new_module.index = i;
                new_module.slot = "modules";
                new_module.attach();
                return new_module;
            });

            new_chain.append(...new_modules);
        }

        this.appendChild(new_chain);

        new_chain.attach();

        return new_chain;
    }

    get chains() {
        return this.querySelectorAll("com-chain");
    }
}
