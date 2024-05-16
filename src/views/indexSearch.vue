<template>
  <div class="searchBox">
    <div class="top">
      <div class="inputBox">
        <search @add="add"></search>
      </div>
      <div class="back"><span @click="back"> 返回 </span></div>
    </div>
    <div class="content">
      <div class="history">
        <ul>
          <li v-for="(item, index) in list" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import search from "@/components/common/search.vue";
export default {
  components: {
    search,
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    add(val) {
      this.list.unshift(val);
    },
  },
  watch: {
    list: {
      handler() {
        if (this.list.length > 10) {
          this.list.pop();
        }
      },
      deep: true,
    },
  },
};
</script>

<style scoped lang="scss">
.searchBox {
  padding: 0.2667rem {
    top: 0;
  }
  .top {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1.3333rem;
    border-bottom: 1px solid #eee;
    .inputBox {
      width: 70%;
      height: 0.5rem;
      border-radius: 0.1333rem;
      margin-left: 0.4rem;
      padding: 0.1667rem;
      background: #f4f4f4;
    }
    .back {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      font-size: 0.2667rem;
      margin-left: 0.2667rem;
      span {
        padding: 0.2rem;
      }
    }
  }
  .content {
    .history {
      ul {
        padding: 0 {
          top: 0.2667rem;
          left: 0.8667rem;
          right: 0.8667rem;
        }
        margin: 0;
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        li {
          padding: 0.1333rem;
          font-size: 0.3rem;
          border: 1px solid #eee;
          border-radius: 0.1333rem;
          background: #e8e8e8;
          color: #fff;
          margin-right: 0.2667rem;
          margin-bottom: 0.2667rem;
        }
      }
    }
  }
}
</style>
