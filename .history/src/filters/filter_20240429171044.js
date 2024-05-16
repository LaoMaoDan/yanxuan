
export const getgRedStr = (val, value) => {
    let num = val.indexOf(value)
    // console.log(num);
    let str = val
    if (num != -1) {
        str = str.replaceAll(value,`<span class="c">${}`)
    }
    console.log(str);
    return val

}