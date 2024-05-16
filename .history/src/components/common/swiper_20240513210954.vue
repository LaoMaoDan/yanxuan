<template>
  <div class="swiperBox">
    <ul class="swiperUl" ref="ul" @touchstart.prevent="startMove($event)">
      <li ref="li" v-for="item in imgs" :key="item.id">
        <img v-if="getImg" :src="item.img" alt="" />
        <img v-else :src="'http://43.138.15.137:4000//' + item.img" alt="" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    imgs: {
      required: true,
      type: Array,
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      num: 0,
      // 定时器
      timer: null,
      // 当前屏幕宽度
      width: 0,
      //
      dragging: false,
      // 当前滑动的距离
      x: 0,
      // 之前滑动的距离
      preX: 0,
      startX: 0,
      moveX: 0,
    };
  },

  mounted() {
    this.updateScreenWidth();
    window.addEventListener(
      "resize",
      this.debounce(this.updateScreenWidth, 500)
    );
  },
  updated() {
    let first = this.$refs.li[0].cloneNode(true);
    let last = this.$refs.li[this.$refs.li.length - 1].cloneNode(true);
    last.style.position = "absolute";
    last.style.left = -this.width + "px";
    last.style.height = 100 + "%";
    this.$refs.ul.appendChild(first);
    this.$refs.ul.insertBefore(last, this.$refs.li[0]);
  },
  methods: {
    // 防抖 是指任务频繁触发的情况下，只有任务触发的间隔超过指定间隔的时候，任务才会执行；
    debounce(fn, delay) {
      let timer = null;
      return function () {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(fn, delay);
      };
    },
    // 获取屏幕宽度
    updateScreenWidth() {
      this.clearTimer();
      this.width = document.documentElement.clientWidth;
      if (this.autoplay) {
        this.start();
      }
    },
    // 定时轮播
    start() {
      this.timer = setInterval(() => {
        this.num++;
        this.wufeng();
      }, 1000);
    },
    // 清除定时器
    clearTimer() {
      clearInterval(this.timer);
      this.timer = null;
    },
    startMove(e) {
      this.clearTimer();
      this.$refs.ul.style.transition = "none";
      this.startX = e.changedTouches[0].clientX;
      document.addEventListener("touchmove", this.move);
      document.addEventListener("touchend", this.end);
    },
    move(e) {
      this.moveX = e.changedTouches[0].clientX - this.startX;
      this.$refs.ul.style.left = this.moveX + this.preX + "px";
    },
    end(e) {
      this.endX = e.changedTouches[0].clientX - this.startX;
      if (this.endX > 40) {
        this.num--;
      }
      if (this.endX < -40) {
        this.num++;
      }

      this.$emit("pagenum", this.num);
      this.wufeng();
      this.yidong("all 0.3s");
      document.removeEventListener("touchmove", this.move);
      document.removeEventListener("touchend", this.end);
    },
    yidong(guodu) {
      this.$refs.ul.style.transition = guodu;
      let x = this.num * this.width;
      this.$refs.ul.style.left = -x + "px";
      this.preX = -x;
    },
    wufeng() {
      console.log(123);
      if (this.num == this.imgs.length) {
        this.yidong("all 0.3s");
        setTimeout(() => {
          this.num = 0;
          this.yidong("none");
        }, 300);
      }
      if (this.num == -1) {
        this.yidong("all 0.3s");
        setTimeout(() => {
          this.num = this.imgs.length - 1;
          this.yidong("none");
        }, 300);
      }
    },
  },
  computed: {
    getImg() {
      let boolean = this.imgs.some((item) => {
        return item.img.slice(0, 4) == "http";
      });
      return boolean;
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateScreenWidth);
    this.clearTimer();
  },
};
</script>

<style scoped lang="scss">
.swiperBox {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  ul {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    height: 100%;
    margin: 0;
    padding: 0;
    transition: all 0.2s;
    list-style: none;
    li {
      width: 10rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.box::-webkit-scrollbar {
  display: none;
}
</style>
