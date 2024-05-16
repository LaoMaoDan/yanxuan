import { getGoodsList } from "@/api/getGoodsList.js";
const pull = {
    update(el, binding, vnode) {
        el.addEventListener('touchstart', e => {
            let startY = e.changedTouches[0].clientY
            // 加载提示
            let box = document.querySelector('.loadingBox')
            let title = document.querySelector('.pullTitle')
            let Y = 0
            
            const move = e => {
                let moveY = e.changedTouches[0].clientY
                Y = moveY - startY
                if (Y <= 10) {
                    title.style.display = 'none'
                } else {
                    title.style.display = 'flex'
                    title.style.height = Y + 'px'
                }
            }
            const end = e => {
                if (Y > 30) {
                    box.style.display = 'flex'
                    title.style.display = 'none'

                    getData().then(val => {
                        if (val.list.goodData.length && val.list.goodData.length > 0) {
                            box.style.display = 'none'
                            vnode.context.list = val.list.goodData
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