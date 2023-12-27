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

export const shiftNumberToPrice = (price) => {
    let s = price
    if (!s) {
        return ''
    }
    try {
        s += ""
        if (s.indexOf(".") == -1) s += ".0"; /**如果没有小数点，在后面补个小数点和0**/
        if (/\.\d$/.test(s)) s += "0"; /**正则判断**/
        while (/\d{4}(\.|,)/.test(s)) /**符合条件则进行替换**/
            s = s.replace(/(\d)(\d{3}(\.|,))/, "$1,$2"); /**每隔3位添加一个**/
    } catch (error) {
        console.error(error)
    }
    return s
}