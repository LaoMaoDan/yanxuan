
export const getgRedStr = (val, value) => {
    let num = val.indexOf(value)
    // console.log(num);
    let str = ''
    if (num != -1) {
        str = val.slice(num, 1)
    }
    console.log(str);
    return val

}