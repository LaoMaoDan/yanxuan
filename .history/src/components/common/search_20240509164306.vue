<template>
  <div class="search_input">
    <i class="iconfont icon-search"></i>
    <input
      type="text"
      @change=""
      v-model="value"
      placeholder="请输入搜索关键词"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },
  methods: {
    add() {
      this.$emit("add", this.value);
      this.value = "";
    },
  },
};
</script>

<style scoped lang="scss">
.search_input {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .icon-search {
    font-size: 0.42667rem;
    color: black;
  }
  input {
    padding-left: 0.1333rem;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 0.2667rem;
    background: rgba($color: #000000, $alpha: 0);
  }
}
</style>
