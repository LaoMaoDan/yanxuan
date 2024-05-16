<template>
  <div class="box">
    <topTitleVue title="商品列表" :show="true"></topTitleVue>
    <div class="header">
      <div class="search">
        <div class="search_input">
          <i class="iconfont icon-search"></i>
          <input
            type="text"
            @input="search"
            v-model="value"
            placeholder="请输入搜索关键词"
          />
        </div>
      </div>
      <div class="nav">
        <ul>
          <li>综合排序</li>
          <li>销量</li>
          <li>价格 <i class="iconfont icon-paixu"></i></li>
          <li>好评度</li>
          <li>店铺</li>
          <li>筛选 <i class="iconfont icon-shaixuan"></i></li>
        </ul>
      </div>
    </div>
    <div class="contentBox">
      <div class="pullTitle">下拉刷新</div>
      <div class="loadingBox">
        <span class="loadingIcon">
          <div class="ball"></div>
        </span>
        <span>正在加载</span>
      </div>
      <div class="content" v-pull="obj">
        <div
          class="fox"
          @click="goDetails(item)"
          v-for="item in list"
          :key="item.id"
        >
          <div class="imgbox">
            <img :src="'http://43.138.15.137:4000' + item.img" alt="" />
          </div>
          <div class="right">
            <div class="ms">
              <p
                v-html="$options.filters.getgRedStr(item.goodsname, value)"
              ></p>
              <p>描述信息</p>
            </div>
            <p>
              ￥<i style="font-style: normal; font-size: 0.2933rem">{{
                item.price
              }}</i>
            </p>
          </div>
        </div>
        <div class="nomore">没有更多了</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getgRedStr } from "@/filters/filter";
import { getsearch } from "@/api/getsearch";
import { getGoodsList } from "@/api/getGoodsList.js";
import topTitleVue from "@/components/common/top-title.vue";
export default {
  name: "goodsList",
  filters: {
    getgRedStr,
  },
  components: {
    topTitleVue,
  },
  data() {
    return {
      list: [],
      obj: {},
      value: "",
      timer: null,
    };
  },
  activated() {
    if (this.$store.state.routerFrom) {
      this.getList();
    }
  },
  created() {
    if(this.$rou)
  },
  methods: {
    getList() {
      this.obj = this.$route.query;
      this.obj.page = 1;
      this.obj.size = 100;
      this.fn1().then((res) => {
        this.list = res.list.goodData;
      });
    },
    goDetails(val) {
      this.$router.push({ name: "gooddesc", query: { id: val.id } });
    },
    search() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.fn().then((res) => {
          if (res.code == 200) {
            this.list = res.list;
          }
          if (this.value == "") {
            this.fn1().then((res) => {
              this.list = res.list.goodData;
            });
          }
        });
      }, 500);
    },
    async fn1() {
      let res = await getGoodsList(this.obj);
      return res;
    },
    async fn() {
      let res = await getsearch({ keywords: this.value });
      return res;
    },
  },
};
</script>

<style scoped lang="scss">
.box {
  position: relative;
  padding-top: 3.0667rem;
  .header {
    position: fixed;
    top: 0;
    left: 0;
    margin-top: 1.0667rem;
    width: 100%;
    overflow: hidden;
    z-index: 1000;
    background: linear-gradient(#ff6040, #ff8a80);
    .search {
      height: 1.0667rem;
      line-height: 1.0667rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      .search_input {
        display: flex;
        justify-content: left;
        align-items: center;
        width: 80%;
        height: 0.85333rem;
        background-color: white;
        border-radius: 1.3333rem;
        padding: 0.06667rem 0.26667rem;
        box-sizing: border-box;
        .icon-search {
          font-size: 0.42667rem;
          color: black;
        }
        input {
          padding-left: 0.1333rem;
          width: 100%;
          height: 100%;
          border: none;
          outline: none;
          font-size: 0.2667rem;
        }
      }
    }
    ul {
      display: flex;
      justify-content: center;
      margin: 0;
      padding: 0;
      list-style: none;
      li {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 0.9333rem;
        font-size: 0.2667rem;
        color: #fff;
        i {
          margin-left: 0.0667rem;
        }
      }
    }
  }

  .contentBox {
    .pullTitle {
      display: none;
      justify-content: center;
      align-items: center;
      width: 100%;
      font-size: 0.2667rem;
    }
    .loadingBox {
      display: none;
      font-size: 0.2667rem;
      justify-content: center;
      align-items: center;
      height: 1.3333rem;
      color: #dcdcdc;
      .loadingIcon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 0.2667rem;
        height: 0.2667rem;
        border: 1px solid #dcdcdc;
        margin-right: 0.1333rem;
        border-radius: 50%;
        .ball {
          width: 0;
          height: 0;
          border: 0.2rem solid {
            top: 0.2rem solid transparent;
            right: 0.2rem solid transparent;
            left: 0.2rem solid transparent;
            bottom: 0.2rem solid #fff;
          }

          animation: ball;
          animation-duration: 0.5s;
          animation-iteration-count: infinite;
        }
        @keyframes ball {
          0% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(90deg);
          }
          50% {
            transform: rotate(180deg);
          }
          75% {
            transform: rotate(270deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      }
    }
    .content {
      position: relative;
      margin-top: 0.2667rem;
      .fox {
        display: flex;
        padding: 0 0.2667rem;
        margin-bottom: 0.2667rem;
        height: 2rem;
        .imgbox {
          width: 2.3333rem;
          height: 2rem;
          border-radius: 0.0667rem;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .right {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-left: 0.2667rem;
          justify-content: space-between;
          .ms {
            width: 6.5333rem;
            p {
              margin: 0;
              font-size: 0.2667rem;
              overflow: hidden; /* 隐藏溢出的文本 */
              white-space: nowrap; /* 防止文本换行 */
              margin-bottom: 0.1333rem;
              text-overflow: ellipsis; /* 溢出部分用省略号表示 */
            }
          }
          p {
            width: 100%;
            text-align: left;
            margin: 0;
            font-size: 0.2667rem;
          }
        }
      }
      .nomore {
        color: #969799;
        font-size: 0.37333rem;
        line-height: 1.33333rem;
        text-align: center;
      }
    }
  }
}
</style>
