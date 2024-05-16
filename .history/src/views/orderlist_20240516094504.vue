<template>
  <div class="box" v-pullup="getDataFn">
    <topTitle :show="true" title="订单列表"></topTitle>
    <ul>
      <div class="block" ref="block"></div>
      <li @click="getList(0, $event)">待付款</li>
      <li @click="getList(1, $event)">待发货</li>
      <li @click="getList(2, $event)">待收货</li>
      <li @click="getList(3, $event)">全部订单</li>
    </ul>
    <div class="content" v-show="list.length > 0">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="top">
          <div class="dingdan">{{ item.ordernumber }}</div>
          <div class="status">{{ getStatus(item.status) }}</div>
        </div>
        <div class="center">共计3件商品 合计￥1806</div>
        <div class="bottom">
          <div class="btn">继续付款</div>
          <div class="btn">取消交易</div>
          <div class="btn">查看物流</div>
        </div>
      </div>
    </div>
    <div v-show="!list.length" class="none">
      <img src="https://img01.yzcdn.cn/vant/empty-image-default.png" alt="" />
      <p>暂无订单</p>
    </div>
  </div>
</template>

<script>
import topTitle from "@/components/common/top-title.vue";
import { getorderlist } from "@/api/getorderlist.js";
export default {
  components: {
    topTitle,
  },
  data() {
    return {
      status: 0,
      list: [],
      page: 1,
      size: 5,
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    async getlist() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo")).list;
      let res = await getorderlist({
        page: this.page,
        size: this.size,
        status: this.status,
        uid: userInfo.uid,
      });
      if (res.list) {
        this.list = res.list.data;
      } else {
        this.list = [];
      }
    },
    getList(val, ev) {
      this.status = val;
      this.getlist();
      let div = this.$refs.block;
      let left = ev.target.offsetLeft + ev.target.offsetWidth / 2;
      let htmlFontSize = document.documentElement.clientWidth / 10;
      console.log(htmlFontSize);
      div.style.transform = `translateX(${
        left / htmlFontSize
      }rem) translateX(-50%)`;
    },
    getDataFn() {
      this.siz;
      this.getlist();
    },
  },
  computed: {
    getStatus() {
      return (val) => {
        if (val.status == 0) {
          return "待支付";
        } else if (val.status == 1) {
          return "待发货";
        } else {
          return "待收货";
        }
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  background: #eee;
  height: 100%;
  ul {
    position: relative;
    display: flex;
    justify-content: space-around;
    margin: 0;
    padding: 0 {
      top: 1.0667rem;
    }
    background: #fff;
    list-style: none;
    border-bottom: 1px solid #eee;
    li {
      display: flex;
      align-items: center;
      font-size: 0.4rem;
      height: 1.0667rem;
    }
    .block {
      position: absolute;
      bottom: 0;
      left: 0;
      background: red;
      width: 1.06667rem;
      height: 0.08rem;
      border-radius: 0.08rem;
      transform: translateX(1.17333rem) translateX(-50%);
      transition: all 0.3s;
    }
  }
  .content {
    padding: 0 0.2667rem;
    overflow: hidden;
    .item {
      font-size: 0.4rem;
      background: #fff;
      margin: 0.2667rem 0;
      border-radius: 0.1333rem;
      padding: 0.2667rem 0.6667rem;
      .top {
        display: flex;
        justify-content: center;
        height: 0.8rem;
        margin-bottom: 0.5333rem;

        div {
          flex: 1;
          display: flex;
          align-items: center;
        }
        div:nth-of-type(2) {
          justify-content: right;
          color: #c3c3c3;
        }
      }
      .center {
        display: flex;
        justify-content: right;
        margin-bottom: 0.5333rem;
        font-size: 0.3333rem;
      }
      .bottom {
        display: flex;
        justify-content: space-around;
        div {
          padding: 0.1333rem 0.2667rem;
          border: 1px solid #dbdbdb;
          font-size: 0.3333rem;
          border-radius: 0.5333rem;
        }
      }
    }
  }
  .none {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background: #eee;
    p {
      margin-top: 0.42667rem;
      padding: 0 1.6rem;
      color: #969799;
      font-size: 0.37333rem;
      line-height: 0.53333rem;
    }
  }
}
</style>
