
export const getgRedStr = (val, keywords) => {
    console.log(val, keywords);
    if (!keywords) return val
    let num = val.includes(keywords)
    let str = val
    if (num) {
        // console.log(123);
        str.replaceAll(keywords, `<span style="color: red">${keywords}</span> `)
        console.log( str.replaceAll(keywords, `<span style="color: red">${keywords}</span> `),123);
    }
    return str

}