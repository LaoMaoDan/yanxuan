<template>
  <div class="box">
    <topTitle :show="true" title="订单确认"></topTitle>
    <div class="top" @click="openAddresslist">
      <i class="iconfont icon-wode"></i>
      <div class="userInfo">
        <div class="name">姓名：{{ address.username }}</div>
        <div class="phone">电话：{{ address.userphone }}</div>
      </div>
      <i class="iconfont back icon-back-copy"></i>
    </div>
    <div class="content">
      <div class="cart-item" v-for="item in getList" :key="item.id">
        <div class="imgbox">
          <img :src="'http://43.138.15.137:4000' + item.img" alt="" />
        </div>
        <div class="right">
          <div class="xinxi">
            {{ item.goodsname }}
            <span style="color: #646566">描述信息</span>
          </div>
          <div class="bottom">
            <span>￥{{ item.price }}</span>
            <span>x{{ item.num }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="submit">
      <div class="right">
        <div class="heji">
          合计：<span
            >￥<i>{{ getPrice }}</i></span
          >
        </div>
        <button class="submitBtn" @click="gosubmit">提交订单</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import topTitle from "@/components/common/top-title.vue";
import { postOrderadd } from "@/api/postOrderadd.js";

export default {
  components: {
    topTitle,
  },
  data() {
    return {
      address: {},
      price: 0,
      data: [],
    };
  },
  methods: {
    openAddresslist() {
      this.$router.push("/addressList");
    },
    gosubmit() {
      let goods = JSON.parse(localStorage.getItem("cartList"));
      let address = JSON.parse(localStorage.getItem("orderconfirmList"));

      // 价格
      let price = goods.reduce((up, current, index) => {
        return (up += current.price);
      }, 0);
      this.price = price;
      // 数量
      let num = goods.reduce((up, current) => {
        return (up += current.num);
      }, 0);
      // id
      let idstr = goods.reduce((up, current) => {
        return (up += current.id) + ",";
      }, 0);
      idstr = idstr.slice(0, -1);
      // 地址id
      let addressid = address[0].id;
      let uid = JSON.parse(localStorage.getItem("userInfo")).list.uid;
      this.getDingdan(uid, price, num, addressid, idstr);
      try {
      } catch (error) {}
    },
    async getDingdan(uid, price, num, addressid, idstr) {
      let res = await postOrderadd({
        uid,
        countmoney: price,
        countnumber: num,
        addressid,
        idstr,
      });
      if (res.code == 200) {
        this.$router.push({
          path: "/orderadd",
          query: { outTradeNo: res.list.outTradeNo, price: this.price },
        });
      }
      return res;
    },
    getAddress() {
      let list = this.$store.state.orderconfirm.list;
      let checkedItem = list.filter((item) => {
        return item.checked;
      });
      if (checkedItem.length > 0) {
        if (checkedItem[0].checked) {
          this.address = checkedItem[0];
        }
        return;
      }
      list.map((item) => {
        if (item.status == 1) {
          this.address = item;
        }
      });
    },
    ...mapActions("orderconfirm", ["getAddressData"]),
  },
  computed: {
    getList() {
      let arr = this.$store.state.cart.list.filter((item) => {
        return item.checked;
      });
      return arr;
    },
    ...mapGetters("cart", ["getPrice"]),
    ...mapState("orderconfirm", ["list"]),
    ...mapState("cart", ["list"]),
  },
  beforeMount() {
    this.data = this.$store.state.orderconfirm.list;
  },
  mounted() {
    let list = this.$store.state.orderconfirm.list;
    if (list.length > 0) {
      this.getAddress();
    } else {
      let userInfo = JSON.parse(localStorage.getItem("userInfo")).list;
      this.getAddressData({ uid: userInfo.uid }).then((res) => {
        this.getAddress();
      });
    }
  },
};
</script>

<style scoped lang="scss">
.box {
  padding-top: 1.0667rem;
  padding-bottom: 1.3333rem;
  width: 100vw;
  .top {
    padding: 0.2667rem 0.5333rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    i {
      font-size: 0.5333rem;
      margin-right: 0.2667rem;
    }
    .userInfo {
      flex: 1;
      font-size: 0.3733rem;
    }
    .back {
      color: #969799;
      font-size: 0.6667rem;
      margin: 0;
    }
  }
  .content {
    .cart-item {
      position: relative;
      display: flex;
      width: 100%;
      justify-content: space-between;
      margin-bottom: 0.2667rem;
      padding: 0.2667rem 0;
      background: #fff;
      .imgbox {
        width: 2.2933rem;
        height: 2.2933rem;
        overflow: hidden;
        border-radius: 0.1333rem;
        margin-right: 0.2667rem;
        margin-left: 0.2667rem;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .right {
        font-size: 0.2933rem;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .xinxi {
          display: flex;
          flex-direction: column;
        }
        .bottom {
          display: flex;
          justify-content: space-between;
          span:nth-of-type(2) {
            margin-right: 0.6667rem;
            color: #969799;
          }
        }
      }
    }
  }
  .submit {
    display: flex;
    align-items: center;
    justify-content: right;
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #fff;
    height: 1.3333rem;
    border-top: 1px solid #eee;
    .right {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 0.2667rem;
      .heji {
        font-size: 0.2667rem;
        margin-right: 0.2667rem;
        span {
          color: red;
          i {
            font-style: normal;
            font-size: 0.4rem;
          }
        }
      }
      .submitBtn {
        color: #fff;
        width: 2.1333rem;
        height: 0.8rem;
        border: none;
        border-radius: 0.6667rem;
        font-size: 0.3rem;
        background: linear-gradient(#fe5f33, #ee0b24);
      }
    }
  }
}
</style>
