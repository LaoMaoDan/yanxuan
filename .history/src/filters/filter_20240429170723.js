export const getgRedStr = (val, value) => {
    let num = val.indexOf(value)
    console.log(num);
    let str = ''
    if (num != -1) {
        let str = val.slice(num)
    }
    return val

}