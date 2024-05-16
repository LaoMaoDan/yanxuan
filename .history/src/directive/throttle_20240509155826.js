const throttle = function (fn, delay) {
    let valid = true
    return function () {
        if (!valid) {
            return false
        }
        valid = false
        setTimeout(() => {
            fn()
            valid = true
        }, delay);
    }
}