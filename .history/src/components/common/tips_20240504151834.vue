<template>
  <div :class="messageS ? 'message messageS' : 'message'">
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: ["title", "message"],
  data() {
    return {
      messageS: false,
    };
  },
  mounted() {
    // 显示提示
    this.$emit("msg", true);
    setTimeout(() => {
      this.messageS = true;
      setTimeout(() => {
        this.messageS = false;
        setTimeout(() => {
          this.$emit("msg", false);
        }, 300);
      }, 2000);
    }, 0);
  },
};
</script>

<style scoped lang="scss">
.message {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  width: 2rem;
  height: 0.5333rem;
  font-size: 0.2667rem;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 0.2667rem;
  border-radius: 0.1333rem;
  background: rgba($color: #000000, $alpha: 0.3);
  opacity: 0;
  transition: all 0.3s;
  z-index: 1001;
  span {
    text-align: center;
  }
}
.messageS {
  opacity: 1;
}
</style>
