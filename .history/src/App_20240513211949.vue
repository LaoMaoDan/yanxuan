<template>
  <div id="app">
    <transition name="routerChange">
      <keep-alive include="cate,index,goodsList,userInfo">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script></script>
<style lang="scss">
.routerChange
body {
  margin: 0;
  height: 100%;
}
.xiangqingbox {
  width: 100% !important;
  height: 100% !important;
  font-size: 0.5333rem;
}
.xiangqingbox img {
  width: 100% !important;
}
.xiangqingbox div {
  width: 100% !important;
  // height: 100% !important;
}
.xiangqingbox div:nth-of-type(1) {
  padding: 0 !important;
}
</style>
