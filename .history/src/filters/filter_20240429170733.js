import { set } from "core-js/core/dict";

export const getgRedStr = (val, value) => {
    let num = val.indexOf(value)
    console.log(num);
    let str = ''
    if (num != -1) {
        str = val.slice(num)
    }
    console.log(str);
    return val

}