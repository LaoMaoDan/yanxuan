import { getGoodsList } from '@/api/getGoodsList'
const pull = {
    inserted(el, binding, vnode) {
        el.addEventListener('touchstart', e => {
            let startY = e.changedTouches[0].clientY
            // 加载提示
            let box = document.querySelector('.loadingBox')
            let titile = document.querySelector('.pullTitle')
            let Y = 0
            const move = e => {
                let moveY = e.changedTouches[0].clientY
                Y = moveY - startY

                if (Y <= 10) {
                    titile.style.display = 'none'
                    el.style.transform = `translateY(${Y}px)`
                } else {
                    titile.style.display = 'flex'
                    titile.style.height = Y + 'px'
                }
            }

            const end = e => {
                if (Y > 30) {
                    box.style.display = 'flex'
                    titile.style.display = 'none'
                }
                document.removeEventListener('touchmove', move)
                document.removeEventListener('touchend', end)
            }

            document.addEventListener('touchmove', move)
            document.addEventListener('touchend', end)
        })
    }
}
export default pull