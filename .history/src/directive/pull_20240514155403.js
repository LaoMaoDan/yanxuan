import { getGoodsList } from "@/api/getGoodsList.js";
const pull = {
    update(el, binding, vnode) {
        let timer = null
        let show = true
        el.addEventListener('touchstart', e => {
            let startY = e.changedTouches[0].clientY
            // 加载提示
            let box = document.querySelector('.loadingBox')
            let title = document.querySelector('.pullTitle')
            let Y = 0

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

            const end = e => {
                title.style.display = 'none'
                if (Y > 30) {
                    box.style.display = 'flex'
                    getData().then(val => {
                        if (val.list.goodData.length && val.list.goodData.length > 0) {
                            box.style.display = 'none'
                            vnode.context.list = val.list.goodData
                            show = false
                            timer = setTimeout(() => {
                                show = true
                            }, 500);
                        }
                    })
                }


                document.removeEventListener('touchmove', move)
                document.removeEventListener('touchend', end)
            }

            async function getData() {
                let res = await getGoodsList(binding.value)
                return res
            }

            document.addEventListener('touchmove', move)
            document.addEventListener('touchend', end)
        })
    }
}
export default pull