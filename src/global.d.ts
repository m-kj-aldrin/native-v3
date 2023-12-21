interface Dom {
    signal: () => void;
}

declare global {
    interface Window {
        dom: Dom;
    }
}

export {};
