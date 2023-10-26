export const Local = function (key, value) {
    if (value === null) {
        localStorage.removeItem(key);
    } else if (value) {
        localStorage.setItem(key, JSON.stringify({ value }));

    } else {
        const v = localStorage.getItem(key);
        if (v) {
            return JSON.parse(v).value;
        } else return undefined;
    }

}