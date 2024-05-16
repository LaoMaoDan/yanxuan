const silde = {
    bind(drag) {
        let start = 0
        drag.addEventListener('touchstart', e => {
            start = e.targetTouches[0].clientX
            drag.addEventListener('touchmove', e => {
                let x = e.targetTouches[0].clientX - start
                if (x < -120) x = -120
                if (x > -120 && x < -60) x = -120
                if (x > -60 && x < 0) x = 0
                if (x > 0) x = 0
                drag.style.transform = `translate(${x / 75 + 'rem'})`
            })
        })
    }
}
export default silde