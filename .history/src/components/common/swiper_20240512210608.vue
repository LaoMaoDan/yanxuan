<template>
  <div class="swiperBox">
    <ul class="swiperUl" ref="ul">
      <li
        @touchstart.prevent="startMove($event)"
        v-for="item in imgs"
        :key="item.id"
      >
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
    setTimeout(() => {
      let ul = document.querySelector(".swiperUl");
      let first = ul.children[0];
      let last = ul.children[ul.children.length - 1];
      console.log(ul);
    }, 0);
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
      let vm = this;
      let ul = null;
      this.$nextTick((_) => {
        ul = vm.$refs.ul;
      });
      this.timer = setInterval(() => {
        vm.num++;
        if (vm.num == vm.imgs.length) {
          vm.num = 0;
        }
        let left = -vm.num * vm.width;
        ul.style.left = left + "px";
        this.preX = left;
      }, 5000);
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
      if (this.endX > 80) {
        this.num--;
      } else {
        this.num++;
      }
      let x = this.num * this.width;
      this.$refs.ul.style.transition = "all 0.3s";
      this.$refs.ul.style.left = -x + "px";
      this.preX = -x;
      document.removeEventListener("touchmove", this.move);
      document.removeEventListener("touchend", this.end);
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
    width: 10rem * 4;
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
