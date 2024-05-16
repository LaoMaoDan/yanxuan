<template>
  <div class="box">
    <div class="top">
      订单号:
      {{ outTradeNo }}
    </div>
    <div class="price"><span>￥</span>{{ price }}</div>
    <div class="content">
      <div class="itemBox">请选择支付方式</div>
      <div class="itemBox" @click="xuan(0)">
        <div class="left">
          <img
            src="http://43.138.15.137:8086/static/img/alipay.86fc885c.png"
            alt=""
          />
          <span>支付宝支付</span>
        </div>
        <div class="check">
          <div class="checkbox">
            <input type="checkbox" v-model="arr[0].checked" />
          </div>
        </div>
      </div>
      <div class="itemBox" @click="xuan(1)">
        <div class="left">
          <img
            src="http://43.138.15.137:8086/static/img/wxpay.73bddc7a.png"
            alt=""
          />
          <span>微信支付</span>
        </div>
        <div class="check">
          <div class="checkbox">
            <input type="checkbox" v-model="arr[1].checked" />
          </div>
        </div>
      </div>
    </div>
    <btnVue title="确定支付" @dian="zhifubao"></btnVue>
    <div id="form"></div>
  </div>
</template>

<script>
import { posTalipay } from "@/api/postalipay.js";
import btnVue from "@/components/common/btn.vue";
export default {
  components: {
    btnVue,
  },
  data() {
    return {
      outTradeNo: "",
      title: "",
      message: false,
      show: false,
      timer: null,
      price: 0,
      arr: [
        {
          name: "支付宝",
          checked: false,
        },
        {
          name: "微信",
          checked: false,
        },
      ],
    };
  },
  created() {
    let { outTradeNo, price } = this.$route.query;
    this.outTradeNo = outTradeNo;
    this.price = price;
    this.arr[0].checked = true;
  },
  methods: {
    xuan(val) {
      this.arr[val].checked = true;
      this.arr.map((item, index) => {
        if (index != val) {
          item.checked = false;
        }
      });
    },
    async zhifubao() {
      let res = await posTalipay({
        totalAmount: this.price,
        outTradeNo: this.outTradeNo,
        type: 1,
      });
      if (res.code == 200) {
        let form = document.querySelector("#form");
        form.innerHTML = res.list;
        document.forms[0].submit();
      }
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.box {
  padding: 0.5333rem;
  .top {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 0.5333rem;
    color: #999;
    margin-top: 0.6667rem;
  }
  .price {
    text-align: center;
    font-size: 1.0667rem;
    margin-top: 0.2667rem;
    span {
      font-size: 0.6667rem;
    }
  }
  .content {
    font-size: 0.5333rem;
    margin-top: 80px;
    .itemBox {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.5333rem;
      .left {
        display: flex;
        align-items: center;
        img {
          width: 0.8rem;
          margin-right: 0.5333rem;
        }
      }
      .check {
        width: 1.3333rem;
        display: flex;
        align-items: center;
        justify-content: center;

        .checkbox {
          position: relative;
          text-align: center;
          line-height: 0.4rem;
          width: 0.5067rem;
          height: 0.5067rem;
          margin-left: 0.2667rem;
          border: 1px solid #c8c8c8;
          border-radius: 50%;
          overflow: hidden;
          input[type="checkbox"] {
            position: absolute;
            left: -1px;
            top: -2px;
            width: 0.6rem;
            height: 0.61rem;
            border: 1px solid #fff;
            margin: 0;
          }
        }
      }
    }
  }
}
</style>
