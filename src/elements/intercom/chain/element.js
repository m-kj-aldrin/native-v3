import { input_number } from "../../input/number/element.js";
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

        this.shadowRoot
            .getElementById("inputs")
            .addEventListener("change", (e) => {
                this.signal();
            });
    }

    /**@param {import("../types.js").Periphial} p */
    set inputs(p) {
        if (p?.cv) {
            let cv = this.shadowRoot.getElementById("cv");
            /**@type {input_number} */
            let cv_pid = cv.querySelector("input-number.pid");
            cv_pid.value = p.cv.pid;

            /**@type {input_number} */
            let cv_channel = cv.querySelector("input-number.channel");
            cv_channel.value = p.cv.channel;
        }

        if (p?.gate) {
            let gate = this.shadowRoot.getElementById("gate");

            /**@type {input_number} */
            let gate_pid = gate.querySelector("input-number.pid");
            gate_pid.value = p.gate.pid;

            /**@type {input_number} */
            let gate_channel = gate.querySelector("input-number.channel");
            gate_channel.value = p.gate.channel;
        }
    }

    get inputs() {
        let cv = this.shadowRoot.getElementById("cv");
        let gate = this.shadowRoot.getElementById("gate");

        /**@type {input_number} */
        let cv_pid = cv.querySelector("input-number.pid");
        /**@type {input_number} */
        let cv_channel = cv.querySelector("input-number.channel");

        /**@type {input_number} */
        let gate_pid = gate.querySelector("input-number.pid");
        /**@type {input_number} */
        let gate_channel = gate.querySelector("input-number.channel");

        return {
            cv: {
                pid: cv_pid.value,
                channel: cv_channel.value,
            },
            gate: {
                pid: gate_pid.value,
                channel: gate_channel.value,
            },
        };
    }

    set index(v) {
        if (!(typeof v == "number")) return;
        this.#_index = v;
    }

    get index() {
        return this.#_index;
    }

    get modules() {
        return this.querySelectorAll("com-module");
    }

    index_modules() {
        this.modules.forEach((module, i) => (module.index = i));
    }

    /**
     * @param {string|com_module} type
     * @param {number} [index]
     * @returns
     */
    insert_module(type, index) {
        let new_module;
        if (type instanceof com_module) {
            new_module = type;
        } else {
            new_module = document.createElement("com-module");
            new_module.type = type;
        }

        new_module.index = this.modules.length;

        new_module.slot = "modules";

        this.appendChild(new_module);

        new_module.attach();

        return new_module;
    }

    /**@param {com_module | number} module */
    remove_module(module) {
        let removed_module;
        if (module instanceof com_module) {
            removed_module = this.removeChild(module);
            removed_module.detach();

            this.index_modules();
        } else {
            this.children.item(module).remove();
        }
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
        let repr_str = `c`;

        if (this.#attached) {
            repr_str += ` -n`;
            let { cv, gate } = this.inputs;

            repr_str += ` cv${cv.pid}:${cv.channel},gt${gate.pid}:${gate.channel}`;

            let modules = this.modules;
            let modules_repr = modules.length
                ? ">" +
                  [...modules].map((module) => module.toString()).join(",")
                : ">";

            repr_str += modules_repr;
        } else {
            repr_str += ` -r`;
        }

        console.log(repr_str);
    }
}
