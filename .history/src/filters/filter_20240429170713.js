export const getgRedStr = (val, value) => {
    let num = val.indexOf(value)
    console.log(num);
    if (num != -1) {
        val.slice(num)
    }
    return val

}