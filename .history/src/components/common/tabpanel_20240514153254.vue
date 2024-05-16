<template>
  <div class="hotbox" style="">
    <div class="imgbox">
      <div class="tag">
        {{ text }}
      </div>
      <img :src="'http://43.138.15.137:4000' + item.img" alt="" />
    </div>
    <div class="contnet">
      <div class="boxtitle">
        {{ item.goodsname }}
      </div>
      <div class="bottom">
        <span>￥{{ item.price }}</span>
        <del>￥{{ item.market_price }}</del>
        <button class="btn">立即抢购</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      reuqired: true,
      type: Object,
    },
    text: {
      type: String,
      default: "文字",
    },
  },
};
</script>

<style scoped lang="scss">
.hotbox {
  margin-bottom: 0.21333rem;
  padding: 0.2133rem;
  display: flex;
  background: #fff;
  .imgbox {
    position: relative;
    width: 2.34667rem;
    height: 2.34667rem;
    margin-right: 0.21333rem;
    img {
      width: 100%;
      height: 100%;
    }
    .tag {
      position: absolute;
      top: 0.05333rem;
      left: 0;
      background: #ff6040;
      height: 0.4267rem;
      border-radius: 0 26.64rem 26.64rem 0;
      font-size: 0.32rem;
      color: #fff;
      padding: 0 0.1067rem;
    }
  }
  .contnet {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .boxtitle {
      font-size: 0.32rem;
    }
    .bottom {
      font-size: 0.4267rem;
      del {
        font-size: 0.2667rem;
        color: #969799;
        margin-left: 0.1333rem;
      }
      .btn {
        float: right;
        border: none;
        color: #fff;
        border-radius: 0.0667rem;
        background: rgb(255, 96, 64);
        height: 0.85333rem;
        padding: 0 0.21333rem;
        font-size: 0.32rem;
        margin-right: 0.2667rem;
      }
    }
  }
}
</style>
