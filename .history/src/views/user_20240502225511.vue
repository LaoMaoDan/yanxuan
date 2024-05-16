<template>
  <div>
    <div class="head">
      <div class="head_userInfo">
        <img
          v-if="imgShow"
          :src="'http://43.138.15.137:4000/' + userInfo.list.avatarurl"
          alt=""
        />
        <img v-else :src="userInfo.avatarurl" alt="" />
        <div class="userInfo_name">
          <span @click="login">{{ userInfo.list.nickname }}</span>
          <span class="perfect" @click="setUserInfo">完善资料让我更懂你</span>
        </div>
      </div>
      <div class="userInfo_menu">
        <ul>
          <li>
            <span>12</span>
            <p>我的收藏</p>
          </li>
          <li>
            <span>12</span>
            <p>浏览记录</p>
          </li>
          <li>
            <span>￥0</span>
            <p>我的红包</p>
          </li>
          <li>
            <span>12</span>
            <p>优惠券</p>
          </li>
        </ul>
      </div>
      <div class="myform">
        <div class="myform_top">
          <span class="myform_text">我的订单</span>
          <span class="myform_all">
            全部订单 <i class="iconfont icon-back-copy"></i>
          </span>
        </div>
        <div class="myform_content">
          <ul>
            <li @click="goDingdan">
              <img src="../assets/img/daifukuan.png" alt="" />
              待付款
            </li>
            <li @click="goDingdan">
              <img src="../assets/img/daifahuo.png" alt="" />
              待发货
            </li>
            <li @click="goDingdan">
              <img src="../assets/img/daiqueren.png" alt="" />
              待确认
            </li>
            <li @click="goDingdan">
              <img src="../assets/img/shouhou.png" alt="" />
              售后/退款
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="detail">
      <ul>
        <li @click="goAddressList">
          <span>
            <img src="../assets/img/dizhi.png" alt="" />
            <strong style="margin-left: 0.2667rem">地址管理</strong>
          </span>
          <span>
            <i style="font-size: 0.5333rem" class="iconfont icon-back-copy"></i>
          </span>
        </li>
        <li>
          <span>
            <img src="../assets/img/qianbao.png" alt="" />
            <strong style="margin-left: 0.2667rem">我的钱包</strong>
          </span>
          <span>
            <i style="font-size: 0.5333rem" class="iconfont icon-back-copy"></i>
          </span>
        </li>
        <li>
          <span>
            <img src="../assets/img/erweima.png" alt="" />
            <strong style="margin-left: 0.2667rem">我的二维码</strong>
          </span>
          <span>
            <i style="font-size: 0.5333rem" class="iconfont icon-back-copy"></i>
          </span>
        </li>
        <li>
          <span>
            <img src="../assets/img/pengyou.png" alt="" />
            <strong style="margin-left: 0.2667rem">我的小伙伴</strong>
          </span>
          <span>
            <i style="font-size: 0.5333rem" class="iconfont icon-back-copy"></i>
          </span>
        </li>
        <li>
          <span>
            <img src="../assets/img/shiyong.png" alt="" />
            <strong style="margin-left: 0.2667rem">0元试用</strong>
          </span>
          <span>
            <i style="font-size: 0.5333rem" class="iconfont icon-back-copy"></i>
          </span>
        </li>
        <li>
          <span>
            <img src="../assets/img/shiyong.png" alt="" />
            <strong style="margin-left: 0.2667rem">    <div @click="outLogin">退出</div>
</strong>
          </span>
          <span>
            <i style="font-size: 0.5333rem" class="iconfont icon-back-copy"></i>
          </span>
        </li>
      </ul>
    </div>
    <div @click="outLogin">退出</div>
    <footerNavVue></footerNavVue>
  </div>
</template>

<script>
import footerNavVue from "@/components/common/footer-nav.vue";
export default {
  components: {
    footerNavVue,
  },
  data() {
    return {
      userInfo: {
        list: {
          nickname: "请登录",
          avatarurl: "http://43.138.15.137:8086/static/img/01.42fb414c.png",
        },
      },
      // 控制图片显示
      imgShow: false,
    };
  },
  methods: {
    login() {
      let userInfo = localStorage.getItem("userInfo");
      if (!userInfo) {
        this.$router.push("/login");
      }
    },
    goAddressList() {
      this.$router.push("/addresslist");
    },
    goDingdan() {
      this.$router.push("/orderlist");
    },
    setUserInfo() {
      this.$router.push("/useredit");
    },
    outLogin() {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
    },
  },
  created() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      this.userInfo = userInfo;
      this.imgShow = true;
    }
  },
};
</script>

<style scoped lang="scss">
.head {
  width: 100%;
  height: 5.6rem;
  background: linear-gradient(#ff6040, #ff8a80);
  overflow: hidden;
  .head_userInfo {
    display: flex;
    margin-top: 0.2667rem;
    img {
      width: 1.70667rem;
      height: 1.70667rem;
      margin-left: 0.26667rem;
      border-radius: 100%;
      background: #fff;
    }
    .userInfo_name {
      display: flex;
      margin-left: 0.2667rem;
      flex-direction: column;
      justify-content: center;
      span {
        color: #fff;
        font-size: 0.4rem;
      }
      .perfect {
        font-size: 0.3467rem;
        padding: 0 0.1333rem;
        border: 1px solid #fff;
      }
    }
  }
  .userInfo_menu {
    height: 1.70667rem;
    width: 100%;
    margin-top: 0.26667rem;
    position: relative;
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 100%;
      li {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size: 0.32rem;
        color: #fff;
        p {
          margin: 0;
        }
        span {
          font-size: 0.4667rem;
        }
      }
    }
  }
  .myform {
    width: 9.46667rem;
    height: 2.74667rem;
    background-color: white;
    border-radius: 0.06667rem;
    position: absolute;
    left: 0.26667rem;
    top: 4rem;
    .myform_top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.4rem;
      margin: 0.26667rem 0.26667rem 0 0.26667rem;
      .myform_text {
        font-size: 0.4667rem;
        font-weight: 700;
      }
      .myform_all {
        color: #ff6040;
      }
    }
    .myform_content {
      margin-top: 0.4rem;
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        justify-content: space-around;
        li {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          font-size: 0.4rem;
          img {
            width: 0.5333rem;
          }
        }
      }
    }
  }
}
.detail {
  margin-top: 1.3333rem;
  padding: 0 0.5333rem;
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    li {
      font-size: 0.5333rem;
      height: 1.0667rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        display: flex;
        align-items: center;
        height: 100%;
        strong {
          font-size: 0.4rem;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
