<template>
  <div class="swiperBox">
    <ul class="swiperUl" ref="ul">
      <li
        @touchstart.prevent="startMove(index, $event)"
        v-for="(item, index) in imgs"
        :key="item.id"
      >
        <img
          v-if="getImg"
          :src="'http://43.138.15.137:4000//' + item.img"
          alt=""
        />
        <img v-else :src="item.img" alt="" />
      </li>
    </ul>
  </div>
</template>

<script>
import func from "vue-editor-bridge";
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
      moveStart: "",
      // 当前屏幕宽度
      width: 0,
      //
      dragging: false,
      // 当前滑动的距离
      x: 0,
      // 之前滑动的距离
      preX: 0,
    };
  },

  mounted() {
    this.updateScreenWidth();
    window.addEventListener("resize", () =>
      this.debounce(this.updateScreenWidth, 500)
    );
  },
  methods: {
    // 节流
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
      // this.clearTimer();
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
        vm.$refs.ul.style.left = -vm.num * vm.width + "px";
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
    // clearTimer() {
    //   clearInterval(this.timer);
    //   this.timer = null;
    // },
    // 开始拖拽
    startMove(index, ev) {
      // 滑动切换轮播图时先清除定时器防止鬼畜
      this.clearTimer();
      let ul = this.$refs.ul;
      // 获取手指放到屏幕上的位置
      let startX = 0;
      if (!this.dragging) {
        this.dragging = true;
        startX = ev.changedTouches[0].clientX;
      }
      // touchmove的函数
      const move = (e) => {
        ul.style.transition = "all 0s";
        if (this.dragging) {
          // 当前位置
          const currentX = e.changedTouches[0].clientX;
          this.x = this.preX + currentX - startX;
          ul.style.left = this.x + "px";
        }
      };
      // touchend的函数
      const end = (e) => {
        this.dragging = false;
        let endX = e.changedTouches[0].clientX - startX;
        if (endX > 30) {
          this.num--;
        } else if (endX < -30) {
          this.num++;
        }
        if (this.num < 0) {
          this.num = 0;
        }
        if (this.num > ul.children.length - 1) {
          this.num = ul.children.length - 1;
        }
        let maxLeft = ul.offsetWidth - ul.children[0].offsetWidth;

        if (this.x > 0) {
          this.x = 0;
        }
        if (this.x < -maxLeft) {
          this.x = -maxLeft;
        }
        ul.style.transition = "all 0.3s";
        let left = -ul.children[0].offsetWidth * this.num;
        ul.style.left = left + "px";
        this.preX = left;

        if (this.autoplay) {
          setTimeout(() => {
            clearTimeout(this.timer);
            this.start();
          }, 5000);
        }

        // 把当前第几个图片传递给父组件
        this.$emit("pagenum", this.num);
        // 移除touchstart事件监听器
        document.removeEventListener("touchmove", move);
        // 移除touchend事件监听器
        document.removeEventListener("touchend", end);
      };

      document.addEventListener("touchmove", move);
      document.addEventListener("touchend", end);
    },
  },
  computed: {
    getImg() {
      let boolean = this.imgs.some((item) => {
        return item.img.slice(0, 4) == "http";
      });
      return !boolean;
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
