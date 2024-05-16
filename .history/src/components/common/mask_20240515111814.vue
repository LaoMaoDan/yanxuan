<template>
  <div class="mask" v-addMaskShow="showAttr" @click="closeMask" v-show="show">
    <div
      v-addCartShow="showAttr"
      ref="cartAttributes"
      @click.stop
      class="cartAttributes"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dis: {
      default: false,
      type: Boolean,
    },
    height: {
      default: "80%",
      type: String,
    },
    radius: {
      default: "0.6667rem",
      type: String,
    },
  },
  mounted() {
    this.$refs.cartAttributes.style.borderRadius = `${this.radius} ${this.radius} 0 0`;
    this.$refs.cartAttributes.style.height = this.height;
  },
  data() {
    return {
      show: false,
      // 控制属性框出现
      showAttr: false,
    };
  },
  methods: {
    openMask() {
      this.show = true;
      // 0.001s后让 商品属性框出现 为了展现过渡效果
      setTimeout(() => {
        this.showAttr = true;
      }, 0);
      // 禁止body滚动
      document.body.style.overflow = "hidden";
    },
    closeMask() {
      this.showAttr = false;
      // 0.3秒后让mask关闭 maks关闭之前展现过渡效果
      setTimeout(() => {
        this.show = false;
        this.$emit("editShow", false);
      }, 300);
      // 允许body滚动
      document.body.style.overflow = "scroll";
      document.body.style.position = "relative";
    },
  },
  watch: {
    dis() {
      if (this.dis) {
        this.openMask();
      } else {
        this.closeMask();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  background: rgba(0, 0, 0, 0);
  transition: background 0.3s;
  // pointer-events: auto; /* 确保pointer-events为auto */
  .cartAttributes {
    border-radius: 0.6667rem 0.6667rem 0 0;
    transition: 0.3s transform;
    transform: translateY(100%);
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80%;
    background: #fff;
  }
}
</style>
