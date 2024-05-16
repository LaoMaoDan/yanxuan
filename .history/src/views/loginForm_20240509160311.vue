<template>
  <div class="box">
    <el-message :title="title" v-if="show"></el-message>
    <topTitle title="登录" :show="true"></topTitle>
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
            v-model.trim="userInfo.phone"
            type="text"
            placeholder="请输入手机号"
          />
        </div>
        <div v-otherCheck="{ num: userInfo.password, text: '请输入密码' }">
          <span>密码</span>
          <input
            autocomplete="off"
            v-model.trim="userInfo.password"
            type="password"
            placeholder="请输入密码"
          />
        </div>
      </form>
    </div>
    <div class="btnBox">
      <button class="btn" v-throttle="(login, 500)">登录</button>
    </div>
    <div class="pBox">
      <p @click="register" class="moblie">注册</p>
    </div>
  </div>
</template>

<script>
import topTitle from "@/components/common/top-title.vue";
import { postLoginApi } from "../api/postLogin.js";
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
        password: "",
      },
      // 控制登录失败提示
      show: false,
      title: "",
      timer: null,
      check: false,
      other: [],
    };
  },
  methods: {
    // 返回
    back() {
      this.$router.go(-1);
    },
    getcheckPhone(val) {
      this.check = val;
    },
    getcheckOther(val) {
      this.other.push(val);
    },
    async login() {
      // 校验是否通过
      let other = false;
      if (this.other.length >= 1) {
        other = this.other.every((item) => {
          return item;
        });
      }
      if (this.check && other) {
        await postLoginApi(this.userInfo).then((res) => {
          // 校验账号密码是否正确 不正确提示登录失败
          if (res.code != 200) {
            clearTimeout(this.timer);
            this.show = true;
            this.title = "账号或密码不正确";
            // 提示完成后为了下次提示把show重新赋值
            this.timer = setTimeout(() => {
              this.show = false;
            }, 1500);
            return;
          }
          localStorage.setItem("token", res.list.token);
          localStorage.setItem("userInfo", JSON.stringify(res));
          this.$router.push({ name: "index", params: { show: true } });
        });
      } else {
        this.show = true;
        this.title = "请输入账号密码";
      }
    },
    thor (fn, delay) {
    let valid = true
    return function () {
        if (!valid) {
            return false
        }
        valid = false
        setTimeout(() => {
            fn()
            valid = true
        }, delay);
    }
},
    register() {
      this.$router.push("/register");
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
    justify-content: center;
    img {
      width: 300px;
    }
  }
  .loginForm {
    padding: 20px;
    display: flex;
    width: $width;
    flex-wrap: wrap;
    justify-content: center;
    div {
      position: relative;
      height: 50px;
      line-height: 50px;
      margin-bottom: 20px;
      padding-left: 20px;
      span {
        display: inline-block;
        width: 80px;
        height: 100%;
      }
      input {
        width: auto;
        border-width: 0 0 1px 0;
        border-color: #eee;
        outline: none;
        height: 100%;
        font-size: 15px;
      }
      .ipt::placeholder {
        color: red;
      }
      .ipt {
        border-color: red;
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
  .pBox {
    display: flex;
    justify-content: center;
    align-items: center;
    width: $width;
    p {
      width: 150px;
      margin: 0;
      text-align: center;
      border: 1px solid #ccc9c9;
      height: 30px;
      line-height: 30px;
      border-radius: 50px;
      color: #909399;
    }
  }
}
</style>
