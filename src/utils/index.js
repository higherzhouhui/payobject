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

export const getHashParams = () => {
    const hash = location.hash
    const search = hash.split('?')
    if (search.length == 2) {
      const params = new URLSearchParams('?' + search[1])
       return params
    }
    const r = new Map()
    return r
}
