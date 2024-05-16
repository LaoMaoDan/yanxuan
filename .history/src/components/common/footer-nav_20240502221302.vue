<template>
  <div class="footer">
    <ul>
      <router-link tag="li" to="/index">
        <p>首页</p>
        <span>
          <i class="iconfont icon-shouye"></i>
        </span>
      </router-link>
      <router-link tag="li" to="/cate">
        <p>分类</p>
        <span>
          <i class="iconfont icon-fenlei1"></i>
        </span>
      </router-link>
      <router-link tag="li" to="/cart">
        <p>购物车</p>
        <span>
          <i class="iconfont icon-gouwu"></i>
        </span>
      </router-link>
      <router-link tag="li" to="/user">
        <p>我的</p>
        <span>
          <i class="iconfont icon-wode"></i>
        </span>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
$fill-up: 100%;
$flex: ;
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 1.0667rem;
  width: $fill-up;
  background: #fff;
  border-top: 1px solid #eee;
  ul {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
    height: $fill-up;

    li {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: $fill-up;
      flex-direction: column;
      color: black;
      p {
        margin: 0;
        color: #b6b6b6;
        font-size: 0.2667rem;
      }
      span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: $fill-up;
        height: 0.5333rem;
        .iconfont {
          font-size: 0.3733rem;
        }
        .icon-gouwu {
          font-size: 0.32rem;
        }
        .icon-fenlei1 {
          font-size: 0.4267rem;
        }
      }
    }
    .router-link-active {
      // background: #e5f3fe;
      color: #82d6be;
      p {
        color: #82d6be;
      }
    }
  }
}
</style>
