
export const getgRedStr = (val, value) => {
    if(!value)
    let num = val.indexOf(value)
    // console.log(num);
    let str = val
    if (num != -1) {
        str = str.replaceAll(value, `<span style="color: red">${value}</span> `)
    }
    console.log(str);
    return str

}