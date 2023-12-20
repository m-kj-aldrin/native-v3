export type Periphial = {
    cv: { pid: number; channel: number };
    gate: { pid: number; channel: number };
};

export type chain_config = {
    inputs?: Partial<Periphial>;
    modules?: module_config[];
};

type module_config = {
    type: string;
};
