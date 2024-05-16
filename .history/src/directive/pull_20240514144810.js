import { getGoodsList } from "@/api/getGoodsList.js";
import { del } from "vue";
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
async function getData() {
    console.log(123, 111);
    let res = await getGoodsList(binding.value)
    return res
}
const pull = {
    update(el, binding, vnode) {
        el.addEventListener('touchstart', e => {
            let startY = e.changedTouches[0].clientY
            // 加载提示
            let box = document.querySelector('.loadingBox')
            let title = document.querySelector('.pullTitle')
            let Y = 0


            document.addEventListener('touchmove', move)
            document.addEventListener('touchend', end)
        })
    }
}
export default pull