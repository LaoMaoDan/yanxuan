<template>
  <div class="box">
    <el-message  title="请先登录"></el-message>
    <p class="title">欢迎登录严选商城</p>
    <div class="imgbox">
      <img
        src="	http://43.138.15.137:8086/static/img/orange.05e0f3f6.png"
        alt=""
      />
    </div>
    <button class="btn" @click="formLogin('/loginForm')">账号密码登录</button>

    <p class="moblie" @click="formLogin('/smsLogin')">手机号短信登录</p>
  </div>
</template>

<script>
import elMessage from "@/components/common/el-message.vue";
export default {
  components: { elMessage },

  methods: {
    formLogin(val) {
      this.$router.push(val);
    },
  },
};
</script>

<style scoped lang="scss">
$fontsize: 20px;
$width: 200px;
$orange: #ff854c;
.box {
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  .title {
    margin-top: 100px;
    margin-bottom: 0;
    font-size: $fontsize;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .imgbox {
    overflow: hidden;
    height: 220px;
    img {
      width: 300px;
    }
  }
  .btn {
    display: block;
    width: $width;
    height: 60px;
    font-size: $fontsize;
    padding: 0;
    margin: 0;
    background: $orange;
    border: 0;
    color: #fff;
    border-radius: 10px;
    box-shadow: 10px 10px 5px #ff854c30;
  }
  .moblie {
    font-size: $fontsize;
  }
}
</style>
