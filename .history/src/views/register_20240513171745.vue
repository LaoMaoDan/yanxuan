<template>
  <div class="box">
    <topTitle title="欢迎注册会员" :show="true"></topTitle>
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
        <div v-otherCheck="{ num: userInfo.nickname, text: '请输入昵称' }">
          <span>昵称</span>
          <input
            autocomplete="off"
            v-model="userInfo.nickname"
            type="text"
            placeholder="请输入昵称"
          />
        </div>
        <div v-otherCheck="{ num: userInfo.password, text: '请输入密码' }">
          <span>密码</span>
          <input
            autocomplete="off"
            v-model="userInfo.password"
            type="text"
            placeholder="请输入密码"
          />
        </div>
      </form>
    </div>
    <div class="btnBox">
      <button class="btn" @click="login">注册</button>
    </div>
  </div>
</template>

<script>
import topTitle from "@/components/common/top-title.vue";
import { postRegister } from "../api/register.js";
export default {
  components: {
    topTitle,
  },
  data() {
    return {
      // 用户登录
      userInfo: {
        phone: "",
        password: "",
        nickname: "",
      },
      timer: null,

      check: false,
      other: [],
    };
  },
  methods: {
    getcheckPhone(val) {
      this.check = val;
    },
    getcheckOther(val) {
      this.other.push(val);
    },
    // 返回
    back() {
      this.$router.go(-1);
    },
    async login() {
      // 校验是否通过
      let other = false;
      if (this.other.length >= 2) {
        other = this.other.every((item) => {
          return item;
        });
      }
      if (other && this.check) {
        let res = await postRegister(this.userInfo);
        if (res.code == 200) {
          this.$message.show({
            title: "注册成功请登录",
            type: "success",
          });
          this.$router.push("/loginForm");
        } else {
          this.$message.show({
            title: "注册失败",
            type: "success",
          });
        }
      } else {
        this.$message.show({
          title: "请输入手机号、昵称、密码",
          type: "error",
        });
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
        font-size: 16px;
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
