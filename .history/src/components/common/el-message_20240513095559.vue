<template>
  <div ref="title" :class="`message ${type}`">{{ title }}</div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "消息提示",
    },
    type: {
      type: String,
      default: "info",
    },
  },
  methods: {},
  mounted() {
    let div = this.$refs.title;
    setTimeout(() => {
      // 显示
      div.style.top = "20px";
      // div.style.transform = "translateY(0)";
      setTimeout(() => {
        div.style.top = "0";
        // div.style.transform = "translateY(-100%)";
      }, 1000);
    }, 0);
  },
};
</script>

<style scoped lang="scss">
.message {
  position: fixed;
  left: 50%;
  margin-left: -2rem;
  top: 0;
  transform: translateY(-100%);
  width: 4rem;
  border-radius: 5px;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  padding: 15px 15px 15px 20px;
  font-size: 14px;
  transition: transform 0.3s, top 0.3s;
}
.info {
  color: #909399;
  background: #edf2fc;
  border: 1px solid #edf2fc;
}
.success {
  background: #f0f9eb;
  border: #f0f9eb;
  color: #67c28a;
}
.error {
  background: #fef0f0;
  border: #fef0f0;
  color: #f56c6c;
}
</style>
