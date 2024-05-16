
export const getgRedStr = (val, keywords) => {
    if (!keywords) return val
    let num = val.includes(keywords)
    let str = val
    if (num) {
        str = str.replaceAll(keywords, `<span style="color: red">${keywords}</span>`)
    }
    return str

}