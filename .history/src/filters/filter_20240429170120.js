export const getgRedStr = (val, value) => {
    if (val == value) {
        let str = `<span style="color='red';">${val}</span>`
        return str
    } else {
        return val

    }
}