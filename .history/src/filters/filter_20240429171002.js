
export const getgRedStr = (val, value) => {
    let num = val.indexOf(value)
    // console.log(num);
    let str = ''
    if (num != -1) {
        str = str.replaceAll(val)
    }
    console.log(str);
    return val

}