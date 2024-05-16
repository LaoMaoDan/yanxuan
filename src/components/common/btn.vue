<template>
  <div class="btnBox">
    <button class="btn" @click="click">{{ title }}</button>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: "新增地址",
      type: String,
    },
  },
  methods: {
    click() {
      this.$emit("dian");
    },
  },
};
</script>

<style scoped lang="scss">
.btnBox {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0.2667rem;
  left: 0;
  width: 100%;
  height: 1.0667rem;
  .btn {
    width: 80%;
    height: 1.0667rem;
    color: #fff;
    border: none;
    background: linear-gradient(to right, #ffc003, #ff6040);
    font-size: 0.4rem;
    border-radius: 0.6667rem;
  }
}
</style>
