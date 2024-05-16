<template>
  <div id="app">
    <keep-alive include="cate,index,goodsList,userInfo">
      <transition name="">
        <router-view></router-view>
      </transition>
    </keep-alive>
  </div>
</template>
<script></script>
<style lang="scss">
.routerChange-enter-active .routerChange-leave-active {
  transition: all 0.3s;
}
.routerChange-enter-active .routerChange-leave-to {
  opacity: 0;
}
.routerChange-enter-to .routerChange-leave-active {
  opacity: 1;
}

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
