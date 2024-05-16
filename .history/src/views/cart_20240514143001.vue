<template>
  <div class="box">
    <Tips v-if="message" @msg="msg" title="请选择至少一件商品"></Tips>
    <topTitle title="购物车"></topTitle>
    <div v-show="list.length == 0" class="none">
      <img src="https://img01.yzcdn.cn/vant/empty-image-default.png" alt="" />
      <p>暂无订单</p>
    </div>
    <div v-show="list.length > 0" class="content">
      <cartItem
        :show="show"
        v-for="item in list"
        :item="item"
        :key="item.id"
        @open="open"
      ></cartItem>
    </div>
    <div class="submit" v-show="list.length > 0">
      <div class="checked">
        <div class="check">
          <div class="checkbox" @click="eidtCheckedAll">
            <div :class="all ? 'ipt iconfont icon-xuanzhong' : 'ipt'"></div>
          </div>
        </div>
        全选
      </div>
      <div class="right">
        <div class="heji">
          合计：<span
            >￥<i>{{ getPrice }}</i></span
          >
        </div>
        <button @click="submit" class="submitBtn">提交订单</button>
      </div>
    </div>
    <footerNavVue title="购物车"></footerNavVue>
    <confirmMaskVue :display="show" @close="close" @del="del"></confirmMaskVue>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import topTitle from "@/components/common/top-title.vue";
import footerNavVue from "@/components/common/footer-nav.vue";
import cartItem from "@/components/cart-item.vue";
import Tips from "@/components/common/tips.vue";
import confirmMaskVue from "@/components/common/confirmMask.vue";
export default {
  components: {
    footerNavVue,
    topTitle,
    cartItem,
    confirmMaskVue,
    Tips,
  },
  data() {
    return {
      // 要删除的商品
      delGood: "",
      message: false,
      all: false,
      show: false,
    };
  },
  created() {
    this.getList();
    this.all = this.checkedAll;
  },
  methods: {
    ...mapActions("cart", ["getList", "delCart"]),
    ...mapMutations("cart", ["setCheckedAll", "setChecked"]),

    eidtCheckedAll() {
      this.all = !this.all;
      this.setCheckedAll(this.all);
    },
    open(val) {
      this.delGood = val;
      this.show = true;
    },
    del() {
      this.delCart(this.delGood);
      setTimeout(() => {
        this.getList();
      }, 100);
    },
    close(val) {
      this.show = val;
    },
    submit() {
      let good = this.list.some((item) => {
        return item.checked;
      });
      if (good) {
        this.$router.push("/orderconfirm");
      } else {
        this.message = true;
      }
    },
    msg(val) {
      this.message = val;
    },
  },
  computed: {
    ...mapState("cart", ["list", "code", "checkedAll"]),
    ...mapGetters("cart", ["getPrice"]),
  },
  watch: {
    checkedAll() {
      this.all = this.checkedAll;
    },
    list: {
      handler() {
        let all = this.list.every((item) => item.checked);
        
        this.$store.state.checkedAll = all;
      },
      deep: true,
    },
  },
};
</script>

<style scoped lang="scss">
@mixin flex() {
  display: flex;
  justify-content: center;
  align-items: center;
}
$twenty: 0.2667rem;
.box {
  height: 100vh;
  width: 100vw;
  background: #eee;
  .none {
    flex-direction: column;
    @include flex;
    width: 100%;
    height: 100%;
    background: #eee;
    p {
      margin-top: 0.42667rem;
      padding: 0 1.6rem;
      color: #969799;
      font-size: 0.37333rem;
      line-height: 0.53333rem;
    }
  }
  .content {
    overflow: hidden;
    padding-bottom: 2.4rem;
    padding-top: 1.0667rem;
  }
  .submit {
    @include flex;
    justify-content: space-between;
    position: fixed;
    bottom: 1.0667rem;
    width: 100%;
    background: #fff;
    height: 1.3333rem;
    .checked {
      @include flex;

      font-size: $twenty;
      .check {
        @include flex;
        margin-left: $twenty;
        margin-right: 0.1333rem;
        .checkbox {
          position: relative;
          text-align: center;
          line-height: 0.4rem;
          width: 0.3733rem;
          height: 0.3733rem;
          margin: 0.2667rem {
            left: 0;
            top: 0;
            bottom: 0;
          }
          border: 1px solid #c8c8c8;
          border-radius: 50%;
          overflow: hidden;
          .ipt {
            position: absolute;
            left: -0.0267rem;
            top: -0.0267rem;
            width: 0.4267rem;
            height: 0.4267rem;
            border: 1px solid #fff;
            margin: 0;
            font-size: 0.4rem;

            color: #409eff;
          }
        }
      }
    }
    .right {
      @include flex;
      margin-right: $twenty;
      .heji {
        font-size: $twenty;
        margin-right: $twenty;
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
