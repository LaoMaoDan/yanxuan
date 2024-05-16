<template>
  <div class="title">
    <span v-show="show" @click="$router.go(-1)"
      ><i class="iconfont icon-back"></i>返回</span
    >
    {{ title }}
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "首页",
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.title {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 1.0667rem;
  line-height: 1.0667rem;
  background: #ff6040;
  font-size: 0.4rem;
  text-align: center;
  color: #fff;
  z-index: 888;
  span {
    position: absolute;
    left: 0.1333rem;
    top: 0;
    i {
      font-size: 0.4rem;
    }
  }
}
</style>
