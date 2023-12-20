import { input_number } from "./input/number/element.js";
import { com_chain } from "./intercom/chain/element";
import { com_module } from "./intercom/module/element";
import { com_network } from "./intercom/network/element";

// intercom

customElements.define("com-network", com_network);
customElements.define("com-chain", com_chain);
customElements.define("com-module", com_module);

// inputs

customElements.define("input-number", input_number);
