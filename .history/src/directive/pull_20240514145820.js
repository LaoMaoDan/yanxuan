import { getGoodsList } from "@/api/getGoodsList.js";

const pull = {
    update(el, binding, vnode) {
        el.addEventListener('touchstart', e => {
            let startY = e.changedTouches[0].clientY
            // 加载提示
            let box = document.querySelector('.loadingBox')
            let title = document.querySelector('.pullTitle')
            let Y = 0


            function jieliu(fn, delay) {
                let flag = true
                return function () {
                    if (!flag) {
                        return false
                    }
                    flag = false
                    setTimeout(fn, delay);
                }

            }

            const move = e => {
                let moveY = e.changedTouches[0].clientY
                Y = moveY - startY
                if (Y < 0) {
                    title.style.display = 'none'
                    title.style.height = '0px'
                } else {
                    title.style.display = 'flex'
                    title.style.height = Y + 'px'
                }
            }

            const end = jieliu
            async function getData() {
                let res = await getGoodsList(binding.value)
                console.log(123, 'pull');
                return res
            }

            document.addEventListener('touchmove', move)
            document.addEventListener('touchend', end)
        })
    }
}
export default pull