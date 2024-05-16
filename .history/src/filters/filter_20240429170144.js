export const getgRedStr = (val, value) => {
    if (val == value) {
        console.log(123);
        let str = `<span style="color='red';">${val}</span>`
        return str
    } else {
        return val

    }
}