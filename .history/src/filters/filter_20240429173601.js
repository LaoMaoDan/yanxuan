
export const getgRedStr = (val, value) => {
    if (!value) return val
    let num = val.includes(value)
    let str = val
    if (num) {
        console.log(str.replaceAll(value, `<span style="color: red">${value}</span> `));
    }
    return str

}