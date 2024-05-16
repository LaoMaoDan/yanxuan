function init() {
    let width = document.documentElement.clientWidth || document.body.clientWidth
    document.documentElement.style.fontSize = width / 10 + 'px'
}

init()
window.onresize = init