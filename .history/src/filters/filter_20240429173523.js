
export const getgRedStr = (val, value) => {
    if (!value) return val
    let num = val.inclut(value)
    let str = val
    if (num != -1) {
        str.replaceAll(value, `<span style="color: red">${value}</span> `)
    }
    return str

}