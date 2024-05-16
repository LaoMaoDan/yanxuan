<template>
  <div class="box">
    <el-message v-if="show1" :type="type" :title="msg"></el-message>
    <tips v-if="show" :title="title"></tips>
    <top-title :show="true" title="添加收货地址"></top-title>
    <div class="form">
      <div class="item">
        <span>姓名</span>
        <input
          type="text"
          v-model="userInfo.username"
          placeholder="收件人姓名"
        />
      </div>
      <div
        class="item"
        v-jiaoyan="{ phone: userInfo.userphone, text: '请输入手机号' }"
      >
        <span>电话</span>
        <input
          type="text"
          v-model="userInfo.userphone"
          placeholder="收件人手机号"
        />
      </div>
      <div class="item" @click="openSelect">
        <span>地区</span>
        <div class="sheng">
          <span class="hei" v-show="userInfo.location != ''">
            {{ userInfo.location }}
          </span>
          <span v-show="userInfo.location == ''">选择省 / 市 / 区</span>
        </div>
        <i class="iconfont icon-back-copy"></i>
      </div>
      <div class="item">
        <span>详细地址</span>
        <input
          type="text"
          v-model="userInfo.useraddress"
          placeholder="街道门牌、楼层房间号等信息"
        />
      </div>
      <div class="item moren">
        <span>设为默认地址</span>
        <div @click="kg" ref="ballBox" class="switch">
          <span ref="ball"></span>
        </div>
      </div>
    </div>
    <btnVue @dian="addAddress"></btnVue>
    <maskVue :dis="dis" @editShow="editShow" radius="0.2667rem" height="370px">
      <div class="maskBox">
        <div class="top">
          <span @click="no">取消</span>
          <span @click="ok">确认</span>
        </div>
        <div class="content">
          <div class="addressMask">
            <div></div>
            <div class="addressTall"></div>
            <div></div>
          </div>
          <pulldown @num="editNum" :prop="city"></pulldown>
          <pulldown @num="editNum" :prop="two"></pulldown>
          <pulldown @num="editNum" :prop="three"></pulldown>
        </div>
      </div>
    </maskVue>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import tips from "@/components/common/tips.vue";
import city from "@/assets/js/address.js";
import maskVue from "@/components/common/mask.vue";
import topTitle from "@/components/common/top-title.vue";
import pulldown from "@/components/common/pulldown.vue";
import btnVue from "@/components/common/btn.vue";
import { postAddressAdd } from "@/api/postAddressAdd.js";
import ElMessage from "@/components/common/el-message.vue";

export default {
  components: { btnVue, topTitle, maskVue, pulldown, tips, ElMessage },
  data() {
    return {
      dis: false,
      numArr: [],
      two: [],
      three: [],
      city: city,
      valArr: [],
      show: false,
      title: "",
      userInfo: {
        uid: JSON.parse(localStorage.getItem("userInfo")).list.uid || "",
        username: "",
        userphone: "",
        location: "",
        useraddress: "",
        status: 0,
      },
      type: "success",
      msg: "",
      show1: false,
    };
  },
  methods: {
    kg() {
      if (this.userInfo.status) {
        this.userInfo.status = 0;
        this.$refs.ballBox.style.background = "#dcdfe6";
        this.$refs.ballBox.style.borderColor = "#dcdfe6";
        this.$refs.ball.style.left = "0";
      } else {
        this.userInfo.status = 1;
        this.$refs.ballBox.style.borderColor = "#409eff";
        this.$refs.ballBox.style.background = "#409eff";
        this.$refs.ball.style.left = ".6667rem";
      }
    },
    openSelect() {
      this.dis = true;
    },
    editShow(val) {
      this.dis = val;
    },
    editNum(val) {
      if (val.num > -1) {
        // 后四位是0000 代表省
        if (val.item.code.substr(2) == "0000") {
          this.two = val.item.children;
          this.valArr[0] = val.item.name;
          this.three = [];
        } else {
          // 后两位 00 代表市
          if (val.item.code.substr(4) == "00") {
            this.three = this.two[val.num].children;
            this.valArr[1] = val.item.name;
          }
          if (val.item.code.substr(4) != "00") {
            this.valArr[2] = val.item.name;
          }
        }
      }
      if (val.num > 30) {
        this.two = [];
        this.three = [];
      }

      if (val.num == -1) {
        if (val.item[0].code.substr(2) == "0000") {
          this.two = [];
          this.three = [];
        } else if (val.item[0].code.substr(2) == "0100") {
          this.three = [];
        }
      }
    },
    ok() {
      this.userInfo.location = "";
      if (this.valArr.length > 2) {
        this.userInfo.location = this.valArr.join("/");
        this.dis = false;
      } else {
        this.tishi("请选择地区");
      }
    },
    no() {
      this.userInfo.location = "";
      this.dis = false;
    },
    tishi(val) {
      this.show = true;
      this.title = val;
      setTimeout(() => {
        this.show = false;
      }, 1000);
    },
    async addAddress() {
      if (!this.userInfo.username) {
        this.tishi("请输入输入收件人姓名");
        return;
      }
      if (!this.userInfo.userphone) {
        this.tishi("请输入输入收件人手机号");
        return;
      }
      if (!this.userInfo.useraddress) {
        this.tishi("请输入输入地区");
        return;
      }
      if (!this.userInfo.useraddress) {
        this.tishi("请输入输入详情地址");
        return;
      }
      // 添加地址
      let res = await postAddressAdd(this.userInfo);
      if (res.code == 200) {
        this.show1 = true;
        this.type = "success";
        this.msg = res.msg;
        setTimeout(() => {
          this.show1 = false;
          this.$router.go(-1);
        }, 1000);
      }
    },
    ...mapActions("aaa", ["addAddAddress"]),
  },
  watch: {},
};
</script>

<style scoped lang="scss">
@fillup:''
.box {
  padding-top: 1.0667rem;
  padding-bottom: 1.0667rem;
  width: 100%;
  .form {
    padding: 0.2667rem;
    font-size: 0.36rem;
    .item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.2667rem 0.4rem;
      span {
        width: 2.133rem;
        font-size: 0.4rem;
        color: #646566;
      }
      input {
        flex: 1;
        border: 0;
        font-size: 0.3333rem;
        height: 1.0667rem;
        padding: 0;
        margin: 0;
        outline: none;
      }
      input::placeholder {
        color: #cacaca;
      }
      .sheng {
        flex: 1;
        display: flex;
        align-items: center;
        color: #cacaca;
        height: 1.0667rem;
        font-size: 0.3333rem;
        span {
          color: #cacaca;
          width: 100%;
        }
        .hei {
          color: black;
        }
      }

      .iconfont {
        font-size: 0.6667rem;
        color: #cacaca;
      }
    }
    .item::after {
      content: "";
      position: absolute;
      width: 90%;
      bottom: 0;
      border-bottom: 1px solid #eee;
    }
    .moren {
      display: flex;
      justify-content: center;
      height: 1.0667rem;
      align-items: center;
      span {
        flex: 1;
      }
      .switch {
        position: relative;
        width: 1.3333rem;
        height: 0.6667rem;
        background: #fff;
        border: 0.02667rem solid #dcdfe6;
        border-radius: 0.6667rem;
        transition: all 0.3s;
        span {
          position: absolute;
          left: 0;
          top: 0;
          width: 0.6667rem;
          height: 0.6667rem;
          border-radius: 50%;
          box-sizing: border-box;
          background: #fff;
          border: 1px solid #dcdfe6;
          transition: all 0.3s;
        }
      }
    }
  }
  .maskBox {
    height: 100%;
    .top {
      width: 100%;
      height: 80px;
      display: flex;
      justify-content: space-between;
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2rem;
        height: 100%;
        font-size: 0.4rem;
      }
    }
    .content {
      position: relative;
      display: flex;
      justify-content: space-around;
      height: 290px;
      overflow: hidden;
      .addressMask {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        pointer-events: none;
        div {
          width: 100%;
        }
        .addressTall {
          position: absolute;
          top: 50%;
          transform: translateY(-40px);
          box-sizing: border-box;
          z-index: 2;
          border: 1px solid #ccc {
            left: 0;
            right: 0;
          }
          width: 100%;
          height: 80px;
          background: rgba($color: #fff, $alpha: 0) !important;
          pointer-events: none;
        }
        div:nth-of-type(1) {
          flex: 1;
          background: linear-gradient(
            to bottom,
            rgba($color: #fff, $alpha: 1),
            rgba($color: #fff, $alpha: 0)
          );
        }
        div:nth-of-type(3) {
          flex: 1;
          background: linear-gradient(
            to top,
            rgba($color: #fff, $alpha: 1),
            rgba($color: #fff, $alpha: 0)
          );
        }
      }
    }
  }
}
</style>
