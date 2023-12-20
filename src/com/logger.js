export function log_cli(msg) {
    if (settings.log) {
        console.log(msg);
    }
}

export const settings = {
    log: true,
};
