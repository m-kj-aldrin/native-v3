/**
 * @this {HTMLElement}
 * @param {string} name
 * @param {any} detail
 */
function signal(name, detail = {}) {
    this.dispatchEvent(
        new CustomEvent(name, {
            bubbles: true,
            detail,
        })
    );
}

/**
 * @param {HTMLElement} target
 */
function get_host(target) {
    while (!(target?.parentNode instanceof ShadowRoot)) {
        return get_host(target.parentNode);
    }

    return target.parentNode.host;
}

window.dom = {
    signal,
    get_host,
};
