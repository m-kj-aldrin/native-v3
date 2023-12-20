import "./dom";
import "./elements";
import style from "./styles/style.css?inline";
import "./styles/light.css";
import { com_network } from "./elements/intercom/network/element";

let style_sheet0 = new CSSStyleSheet();
style_sheet0.replaceSync(style);

document.adoptedStyleSheets = [style_sheet0];

/**@type {com_network} */
let network = document.createElement("com-network");
document.body.appendChild(network);

let c0 = network.add_chain({
    inputs: {
        cv: { pid: 0, channel: 100 },
        gate: { pid: 4, channel: 2 },
    },
    modules: [{ type: "PTH" }, { type: "LFO" }],
});
// c0.insert_module("PTH");
// c0.insert_module("LFO");
