<template>
  <div class="box">
    <topTitle title="首页"></topTitle>
    <div class="header">
      <div class="search">
        <i class="iconfont icon-weibiaoti-3"></i>
        <p>严选商城</p>
        <div @click="gosearch" class="inputbox">
          <search></search>
        </div>
        <i class="iconfont icon-dianpu"></i>
      </div>
      <div class="cate">
        <div class="left">
          <ul>
            <li @click="goGoodsList(item)" v-for="item in list" :key="item.id">
              <span>{{ item.catename }}</span>
            </li>
          </ul>
        </div>
        <div class="right">
          <i class="iconfont icon-fenlei"></i>
          <span style="margin-left: 10px"> 分类 </span>
        </div>
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="swiper">
      <swiper :autoplay="true" :imgs="imgs"></swiper>
    </div>
    <div class="nav">
      <div>
        <img src="../assets/img/png1.png" alt="" />
        <span>限时秒杀</span>
      </div>
      <div>
        <img src="../assets/img/png2.png" alt="" />
        <span>畅销商品</span>
      </div>
      <div>
        <img src="../assets/img/png3.png" alt="" />
        <span>品质大牌</span>
      </div>
      <div>
        <img src="../assets/img/png4.png" alt="" />
        <span>商城自营</span>
      </div>
      <div>
        <img src="../assets/img/png5.png" alt="" />
        <span>积分商城</span>
      </div>
    </div>
    <div class="seckill">
      <div class="leftseckill">
        <div class="seckillTitle">
          <span
            style="
              color: #85a642;
              font-size: 0.34667rem;
              font-weight: 700;
              margin: 0.26667rem 0 0.13333rem 0.26667rem;
            "
            >限时秒杀</span
          >
          <span
            style="
              font-size: 0.2rem;
              color: #555555;
              margin: 0.26667rem 0.26667rem 0 0;
              line-height: 0.56rem;
            "
            >查看更多 <i class="iconfont icon-back-copy"></i
          ></span>
        </div>
        <div
          style="
            margin-left: 0.26667rem;
            color: #323233;
            font-size: 0.37333rem;
            line-height: 0.53333rem;
          "
        >
          <span class="block">0</span>
          <span class="colon">:</span>
          <span class="block">0</span>
          <span class="colon">:</span>
          <span class="block">0</span>
        </div>
      </div>
      <div class="rightseckill">
        <div class="pox top">
          <div>新品上新</div>
          <div>9点整,抢打牌</div>
          <div>疯抢红包</div>
        </div>
        <div class="pox bottom">
          <div>新品上新</div>
          <div>9点整,抢打牌</div>
          <div>疯抢红包</div>
        </div>
      </div>
    </div>
    <div class="tuijian">
      <div class="tuijianTitle">
        <span class="active">双十一尖货预购</span>
        <span>全球畅购</span>
      </div>
      <div class="tuijiancontent">
        <div>
          <img
            src="http://43.138.15.137:8086/static/img/01.42fb414c.png"
            alt=""
          />
        </div>
        <div>
          <img
            src="http://43.138.15.137:8086/static/img/02.d7493534.png"
            alt=""
          />
        </div>
        <div>
          <img
            src="http://43.138.15.137:8086/static/img/03.68c909a1.png"
            alt=""
          />
        </div>
        <div>
          <img
            src="http://43.138.15.137:8086/static/img/04.4417ee32.png"
            alt=""
          />
        </div>
        <div>
          <img
            src="http://43.138.15.137:8086/static/img/05.74faaf2f.png"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="hort">
      <div class="tabs">
        <div
          @click="getTabs(0, '热门推荐')"
          :class="tabIndex == 0 ? 'active tab' : 'tab '"
        >
          热门推荐
        </div>
        <div
          @click="getTabs(1, '上新推荐')"
          :class="tabIndex == 1 ? 'active tab' : 'tab'"
        >
          上新推荐
        </div>
        <div
          @click="getTabs(2, '所有商品')"
          :class="tabIndex == 2 ? 'active tab' : 'tab'"
        >
          所有商品
        </div>
      </div>
      <div class="contnet" style="color: black">
        <tabpanel
          v-for="(item, index) in tabData"
          :key="index"
          :item="item"
          :text="text"
        ></tabpanel>
      </div>
    </div>
    <footerNav></footerNav>
  </div>
</template>

<script>
import footerNav from "@/components/common/footer-nav.vue";
import tabpanel from "@/components/common/tabpanel.vue";
import swiper from "@/components/common/swiper.vue";
import { gethortgoods } from "@/api/gethortgoods.js";
import { getBanner } from "@/api/banner.js";
import { getIndexNavCate } from "../api/indexNavCate.js";
import topTitle from "@/components/common/top-title.vue";
import search from "@/components/common/search.vue";
export default {
  name: "index",
  components: {
    swiper,
    tabpanel,
    footerNav,
    topTitle,
    search,
  },
  data() {
    return {
      // 导航
      list: [],
      // 轮播图
      imgs: [],
      // 热门 上新 所有
      tabsData: [],
      // 单个
      tabData: [],
      text: "热门推荐",
      tabIndex: 0,
      // show: false,
    };
  },
  async created() {
    let list = await getIndexNavCate();
    let imgs = await getBanner();
    let tabsData = await gethortgoods();
    this.list = list.list;
    this.imgs = imgs.list;
    this.tabsData = tabsData.list;
    this.getTabs(0, "热门推荐");
  },

  methods: {
    getTabs(val, text) {
      this.text = text;
      this.tabIndex = val;
      this.tabData = this.tabsData[val].content;
    },
    goGoodsList(val) {
      this.$router.push({
        path: "/goodsList",
        query: { type: 1, cateid: val.id },
      });
    },
    gosearch() {
      this.$router.push("/indexSearch");
    },
  },
};
</script>

<style scoped lang="scss">
$orange: #ff854c;
.box {
  color: #fff;
  background: #f3f3f3;
  padding-bottom: 1.0667rem;
  .header {
    margin-top: 1.0667rem;
    width: 100%;
    overflow: hidden;
    background: linear-gradient(#ff6040, #ff8a80);
    .search {
      height: 1.0667rem;
      line-height: 1.0667rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      .icon-weibiaoti-3 {
        font-size: 0.53333rem;
      }
      p {
        margin: 0;
        font-size: 0.2933rem;
      }
      .inputbox {
        width: 4.53333rem;
        height: 0.85333rem;
        border-radius: 0.10667rem;
        padding: 0.06667rem 0.26667rem;
        background-color: white;
      }
      .icon-dianpu {
        font-size: 0.53333rem;
      }
    }

    .cate {
      display: flex;
      font-size: 0.3733rem;
      justify-content: space-between;

      .left {
        flex: 1;
        overflow: auto;
        ul {
          display: flex;
          width: 100vw;
          flex-wrap: wrap;
          margin: 0;
          padding: 0;
          list-style: none;
          height: 1.1733rem;

          li {
            padding: 0 0.32rem;
            height: 1.1733rem;
            line-height: 1.1733rem;
          }
        }
      }
      .left::-webkit-scrollbar {
        display: none;
      }
      .right {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1.73333rem;
        .iconfont {
          font-size: 0.3467rem;
        }
      }
    }
  }
  .swiper {
    height: 5.8667rem;
  }
  .nav {
    width: 100%;
    height: 1.86667rem;
    display: flex;
    background: #fff;
    margin-top: 10px;
    justify-content: space-between;
    align-items: center;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      font-size: 0.2rem;
      color: black;
      img {
        height: 0.8667rem;
        width: 0.8667rem;
        margin-bottom: 0.1333rem;
      }
      span {
        width: 100%;
        text-align: center;
      }
    }
  }
  .seckill {
    height: 4.66667rem;
    background-color: #f1f1f1;
    margin-right: 0.1333rem;
    display: flex;
    justify-content: space-between;
    margin: 0.2667rem 0.2667rem;
    .leftseckill {
      flex: 1;
      background: url(../assets/img/green.png) no-repeat;
      background-size: cover;
      .seckillTitle {
        display: flex;
        justify-content: space-between;
      }
      div {
        .block {
          display: inline-block;
          width: 0.46667rem;
          color: #fff;
          font-size: 0.16rem;
          text-align: center;
          background-color: #5d7e37;
          border-radius: 0.04rem;
        }
        .colon {
          display: inline-block;
          margin: 0 0.05333rem;
          color: #ee0a24;
        }
      }
    }
    .rightseckill {
      flex: 1;
      margin-left: 0.1333rem;

      .top {
        overflow: hidden;
        height: 2.2667rem;
        background: url(../assets/img/pink.png) no-repeat;
        background-size: cover;
        div:nth-of-type(1) {
          color: #ff6040;
          font-weight: bold;
          font-size: 0.34667rem;
          margin: 0.26667rem 0 0.13333rem 0.26667rem;
        }
        div:nth-of-type(2) {
          color: #ff6040;
          font-size: 0.2rem;
          margin: 0.26667rem 0 0 0.26667rem;
        }
        div:nth-of-type(3) {
          font-size: 0.2rem;
          color: white;
          margin: 0.13333rem 0 0 0.26667rem;
          background: linear-gradient(#ff6040, #ff9878);
          border-top-right-radius: 0.4rem;
          border-bottom-right-radius: 0.4rem;
          width: 1.66667rem;
          line-height: 0.53333rem;
          text-align: center;
        }
      }
      .bottom {
        margin-top: 0.1333rem;
        overflow: hidden;
        height: 2.2667rem;
        background: url(../assets/img/zi.png) no-repeat;
        background-size: cover;
        div:nth-of-type(1) {
          color: #af40ff;
          font-weight: bold;
          font-size: 0.34667rem;
          margin: 0.26667rem 0 0.13333rem 0.26667rem;
        }
        div:nth-of-type(2) {
          color: #af40ff;
          font-size: 0.2rem;
          margin: 0.26667rem 0 0 0.26667rem;
        }
        div:nth-of-type(3) {
          font-size: 0.2rem;
          color: white;
          margin: 0.13333rem 0 0 0.26667rem;
          background: linear-gradient(#af40ff, #ef85ff);
          border-top-right-radius: 0.4rem;
          border-bottom-right-radius: 0.4rem;
          width: 1.66667rem;
          line-height: 0.53333rem;
          text-align: center;
        }
      }
    }
  }
  .tuijian {
    width: 9.46667rem;
    height: 4rem;
    margin: 0 0.26667rem 0;
    background-color: white;
    .tuijianTitle {
      height: 1.14667rem;
      width: 100%;
      display: flex;
      align-items: center;
      color: #999999;
      span {
        flex: 1;
        text-align: center;
        font-size: 0.37333rem;
      }
      .active {
        font-weight: bold;
        color: #ff6040;
        font-size: 0.42667rem;
      }
    }
    .tuijiancontent {
      width: 9.2rem;
      white-space: nowrap;
      overflow-y: auto;
      margin: 0 0.13333rem 0 0.13333rem;
      div {
        display: inline-block;
        height: 100%;
        margin: 0 0 0 0.13333rem;
        img {
          width: 2.13333rem;
          height: 2.20693rem;
        }
      }
    }
  }
  .hort {
    margin: 0.2667rem 0.26667rem 0;
    background: #f3f3f3;
    .tabs {
      display: flex;
      box-sizing: border-box;
      height: 0.8rem;
      background: #fff;
      .tab {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ff6040;
        font-size: 0.3733rem;
      }
      .active {
        background: #ffa500 !important;
        color: white !important;
      }
    }
  }
  .contnet {
    background: #f7f6f6;
  }
}
</style>
