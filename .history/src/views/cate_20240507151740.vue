<template>
  <div class="box">
    <topTitleVue title="商品分类"></topTitleVue>
    <div class="pox">
      <div class="side">
        <ul>
          <li
            @click="getIndex(idx, item)"
            :class="index == idx ? 'active' : ''"
            v-for="(item, idx) in list"
            :key="item.id"
          >
            {{ item.catename }}
          </li>
        </ul>
      </div>
      <div class="content">
        <div class="top">
          <div class="border"></div>
          <div class="text">{{ listName }}</div>
          <div class="border"></div>
        </div>
        <div class="container">
          <router-link
            tag="div"
            :to="{
              path: 'goodsList',
              query: { type: 2, cateid: item.id },
            }"
            class="list"
            v-for="item in listItem"
            :key="item.id"
          >
            <img :src="'http://43.138.15.137:4000' + item.img" alt="" />
            <p>{{ item.catename }}</p>
          </router-link>
        </div>
      </div>
    </div>
    <footerNavVue></footerNavVue>
  </div>
</template>

<script>
import { getCates } from "@/api/getCateData";
import footerNavVue from "@/components/common/footer-nav.vue";
import topTitleVue from "@/components/common/top-title.vue";
export default {
  name: "cate",
  components: {
    topTitleVue,
    footerNavVue,
  },
  data() {
    return {
      list: [],
      index: 0,
      listItem: {},
      listName: "",
    };
  },
  async created() {
    let res = await getCates();
    this.list = res.list;
    this.listItem = res.list[0].children;
    this.listName = res.list[0].catename;
  },
  methods: {
    getIndex(index, item) {
      this.index = index;
      this.listItem = item.children;
      this.listName = item.catename;
    },
  },
};
</script>

<style scoped lang="scss">
$fillup: 100%;
$eighty: 1.0667rem;
.box {
  padding-top: $eighty;
  padding-bottom: $eighty;

  .pox {
    display: flex;
    justify-content: center;
    width: $fillup;
    height: 100vh;
    .side {
      width: 3.3333rem;
      height: $fillup;
      overflow: auto;
      background: #f7f7f7;
      border-right: 1px solid #f7f7f7;
      ul {
        margin: 0;
        list-style: none;
        overflow: auto;
        padding: 0;
        li {
          position: relative;
          display: flex;
          align-items: center;
          padding: 0.2667rem;
          font-size: 0.36rem;
          height: 0.6667rem;
        }
        .active {
          background: #fff;
        }
        .active::after {
          position: absolute;
          content: "";
          left: 0;
          top: 50%;
          margin-top: -0.2133rem;
          width: 0.10667rem;
          height: 0.42667rem;
          background: red;
        }
      }
    }
    .side::-webkit-scrollbar {
      display: none;
    }
    .content {
      flex: 1;
      .top {
        display: flex;
        align-items: center;
        width: $fillup;
        margin: 0.4267rem 0 0 0;
        padding-bottom: 0.4267rem;
        height: 0.64rem;
        font-size: 0.3733rem;
        border-bottom: 1px solid #eee;
        .border {
          height: 0;
          width: 20%;
          border: 1px solid rgb(255, 96, 64);
        }
        .text {
          flex: 1;
          text-align: center;
          color: rgb(255, 96, 64);
        }
      }
      .container {
        display: flex;

        .list {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          width: 1.8rem;
          height: 1.4933rem;
          padding: 0.2133rem;
          border: 1px solid #eee;
          img {
            width: $eighty;
          }
          p {
            font-size: 0.2667rem;
            margin: 0;
          }
        }
      }
    }
  }
}
</style>
