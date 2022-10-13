declare type DeepPartial<T extends object> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

declare type simpleListener<K extends keyof HTMLElementTagNameMap, key extends keyof HTMLElementEventMap> = (this: HTMLElementTagNameMap[K], ev: HTMLElementEventMap[key]) => void;

declare type optionsListener<K extends keyof HTMLElementTagNameMap, key extends keyof HTMLElementEventMap> = {
    callback: simpleListener<K, key>;
    options?: boolean | AddEventListenerOptions;
};

declare function makeElement<K extends keyof HTMLElementTagNameMap>(
    key: K,
    properties?: DeepPartial<HTMLElementTagNameMap[K]>,
    children?: string | Node | (string | Node)[],
    listeners?: {
        [key in keyof HTMLElementEventMap]?: simpleListener<K, key> | optionsListener<K, key> | (simpleListener<K, key> | optionsListener<K, key>)[];
    }
): HTMLElementTagNameMap[K];