import { input_number } from "./input/number/element.js";
import { com_chain } from "./intercom/chain/element";
import { com_module } from "./intercom/module/element";
import { com_network } from "./intercom/network/element";
import { op_lfo } from "./intercom/operators/lfo/element.js";

// intercom

customElements.define("com-network", com_network);
customElements.define("com-chain", com_chain);
customElements.define("com-module", com_module);

// operators

customElements.define("com-op-lfo", op_lfo);

// inputs

customElements.define("input-number", input_number);
