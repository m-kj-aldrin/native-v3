import { input_number } from "./input/number/element";
import { com_chain } from "./intercom/chain/element";
import { com_module } from "./intercom/module/element";
import { com_network } from "./intercom/network/element";

declare global {
    interface HTMLElementTagNameMap {
        "com-network": com_network;
        "com-chain": com_chain;
        "com-module": com_module;
        "input-number": input_number;
    }
}
