<template>
  <div class="box">
    <el-message :title="title" v-if="show"></el-message>
    <topTitle title="手机号登录" :show="true"></topTitle>
    <div class="imgbox">
      <img
        src="http://43.138.15.137:8086/static/img/orange.05e0f3f6.png"
        alt=""
      />
    </div>
    <div class="loginForm">
      <form action="">
        <div v-jiaoyan="{ phone: userInfo.phone, text: '请输入手机号' }">
          <span>手机号</span>
          <input
            v-model="userInfo.phone"
            type="text"
            placeholder="请输入手机号"
          />
        </div>
        <div v-otherCheck="{ num: userInfo.code, text: '请输入验证码' }">
          <span>短信验证码</span>
          <input
            autocomplete="off"
            v-model="userInfo.code"
            type="password"
            placeholder="请输入验证码"
          />

          <button class="getCode" :disabled="disabled" @click="getCode">
            {{ getCodeText }}
          </button>
        </div>
      </form>
    </div>
    <div class="btnBox">
      <button class="btn" @click="login">登录</button>
    </div>
  </div>
</template>

<script>
import { getSms } from "../api/getCode.js";
import { postSmsLogin } from "../api/smsLogin.js";
import topTitle from "@/components/common/top-title.vue";
import ElMessage from "@/components/common/el-message.vue";
export default {
  components: {
    topTitle,
    ElMessage,
  },
  data() {
    return {
      // 用户登录
      userInfo: {
        phone: "",
        code: "",
      },
      code: "",
      show: false,
      getCodeText: "获取验证码",
      disabled: false,
    };
  },
  methods: {
    async login() {
      let other = false;
      if (this.other.length >= 2) {
        other = this.other.every((item) => {
          return item;
        });
      }
      if (other && this.check) {
        let res = await postSmsLogin(this.userInfo);
        localStorage.setItem("token", res.token);
        localStorage.setItem("userInfo", JSON.stringify(res));
        this.$router.push({ name: "index", params: { show: true } });
      }
      if (this.code != this.userInfo.code) {
        this.title = "验证码错误";
        this.show = true;
      }
    },
    async getCode() {
      let phone = this.userInfo.phone;

      if (this.check) {
        let res = "";
        try {
          res = await getSms({ phone });
        } catch {}
        this.code = res.code;
        this.disabled = true;
        let num = 59;
        setInterval(() => {
          this.getCodeText = `还剩：${num--}`;
          if (this.num == 0) {
            this.disabled = true;
          }
        }, 1000);
      } else {
        this.title = "请输入手机号";
        this.show = true;
      }
    },
  },
};
</script>

<style scoped lang="scss">
$width: 100%;
$orange: #ff854c;
.box {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  font-size: 16px;
  padding-top: 50px;
  .top {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: $width;
    background: $orange;
    height: 50px;
    line-height: 50px;
    color: #fff;
    .back {
      position: absolute;
      left: 20px;
      top: 0;
      height: 100%;
    }
    p {
      flex: 1;
      text-align: center;
      margin: 0;
    }
  }
  .imgbox {
    width: $width;
    display: flex;
    margin-top: 1.0667rem;
    justify-content: center;
    img {
      width: 300px;
    }
  }
  .loginForm {
    padding: 0.2667rem;
    display: flex;
    width: $width;
    flex-wrap: wrap;
    justify-content: center;
    div {
      position: relative;
      height: 50px;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      span {
        display: flex;
        align-items: center;
        width: 80px;
        height: 100%;
        padding-right: 20px;
      }
      input {
        width: auto;
        border-width: 0 0 1px 0;
        border-color: #eee;
        outline: none;
        height: 100%;
        font-size: 16px;
      }
      .ipt::placeholder {
        color: red;
      }
      .ipt {
        border-color: red;
      }
      .getCode {
        position: absolute;
        right: 0px;
        top: 5px;
        background: $orange;
        border: none;
        color: #ffff;
        border-radius: 5px;
        padding: 10px 10px;
      }
    }
  }
  .btnBox {
    display: flex;
    justify-content: center;
    width: $width;
    align-items: center;
    .btn {
      display: block;
      width: 180px;
      height: 40px;
      font-size: 20px;
      padding: 0;
      margin: 0;
      background: $orange;
      border: 0;
      color: #fff;
      border-radius: 10px;
      box-shadow: 10px 10px 5px #ff854c30;
      margin-bottom: 20px;
    }
  }
}
</style>
