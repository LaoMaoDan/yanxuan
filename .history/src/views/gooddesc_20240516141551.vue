<template>
  <div class="box">
    <Tips v-if="message" @msg="msg" :title="title"></Tips>
    <topTitleVue :show="true" title="商品详情"></topTitleVue>
    <div class="pox">
      <img
        :src="'http://43.138.15.137:4000' + list1.img"
        :key="list1.id"
        alt=""
      />
      <p>商品名称：{{ list1.goodsname }}</p>
      <p>商品价格：￥{{ list1.price }}</p>
      <div class="xiangqingbox" v-html="fwb"></div>
    </div>
    <footer>
      <div class="fox">
        <i class="iconfont icon-xinxi"></i>
        客服
      </div>
      <router-link tag="div" to="/cart" class="fox">
        <div class="num" v-if="list.length">{{ list.length }}</div>
        <i class="iconfont icon-gouwuche"></i>
        购物车
      </router-link>
      <div class="fox">
        <div class="num">12</div>
        <i class="iconfont icon-dianpu"></i>
        店铺
      </div>
      <div class="btnBox">
        <button class="add" @click="openMask">加入购物车</button>
        <button class="buy">立即购买</button>
      </div>
    </footer>
    <maskVue @editShow="editShow" :dis="dis">
      <div class="norms">
        <div class="attr_top">
          <span class="close" @click="closeMask">
            <i class="iconfont icon-guanbi"></i
          ></span>
          <div class="imgbox" @click.stop="openImg">
            <img :src="imgArr[attributes.idx].img" alt="" />
          </div>
          <div class="goodsInfo">
            <span class="jiage"
              >￥<i>{{ obj.price }}</i>
            </span>
            <span class="num">
              还剩
              <span :class="obj.number < 40 ? 'red' : ''">{{
                obj.number
              }}</span>
              件
            </span>
            <span class="good_attr">
              <span v-if="num == 0 || num1 == 0">
                <span>请选择</span>
                <span v-if="num == 0">颜色</span>
                <span v-if="num1 == 0">内存</span>
              </span>
              <span v-else>
                <span>已选</span>
                <span>{{ obj.color }}</span>
                <span>{{ obj.memory }}</span>
              </span>
            </span>
          </div>
        </div>
        <div class="container">
          <div class="center">
            <div class="top">颜色</div>
            <div class="color" ref="box">
              <span
                v-for="(item, index) in imgArr"
                :key="index"
                @click="on(index)"
                v-show="index != 0"
              >
                <i @click.stop="openImg" class="iconfont icon-fangda"></i>
                <div class="item_img">
                  <img :src="item.img" alt="" />
                </div>
                <div class="color_img">{{ item.color }}</div>
              </span>
            </div>
            <div class="top">内存</div>
            <div class="color" ref="color">
              <div
                :class="
                  index == attributes.memory ? 'neicun neicunActive' : 'neicun'
                "
                v-show="index != 0"
                v-for="(item, index) in memoryArr"
                :key="index"
                @click="getMemory(index)"
              >
                {{ item }}
              </div>
            </div>
            <div class="number">
              <span>购买数量</span>
              <span>
                <button @click="jian">-</button>
                <input
                  type="number"
                  @change="getGoodsNumber"
                  v-model="goodsNumber"
                />
                <button @click="add">+</button>
              </span>
            </div>
          </div>
        </div>
        <div class="btns">
          <button @click="inCart">加入购物车</button>
          <button>立即购买</button>
        </div>
      </div>
    </maskVue>
    <div
      v-if="maskBlackShowC"
      :class="maskBlackShowB == true ? 'maskBlack showMask' : 'maskBlack'"
      @click="maskBlackShow"
    >
      <span class="pagenum">{{ pagenumber }} / {{ imgArr.length }}</span>
      <div class="swiper">
        <swiper @pagenum="pagenum" :autoplay="false" :imgs="imgArr"></swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import swiper from "@/components/common/swiper.vue";
import { postCartAdd } from "@/api/addCart.js";
import { getGoodDesc } from "@/api/getGoodDesc.js";
import topTitleVue from "@/components/common/top-title.vue";
import Tips from "@/components/common/tips.vue";
import MaskVue from "@/components/common/mask.vue";
export default {
  components: {
    topTitleVue,
    swiper,
    Tips,
    MaskVue,
  },

  data() {
    return {
      // 详情的的数据
      list1: {},
      // 放图片的数组
      imgArr: [
        {
          img: "",
          color: "",
        },
        {
          img: "https://img14.360buyimg.com/n0/jfs/t1/131776/9/23287/325305/621f295fE9dc6a3ce/117b4d1ed262266a.jpg",
          color: "蓝色",
        },
        {
          img: "https://img14.360buyimg.com/n0/jfs/t1/195251/28/503/70907/608a8bc4E87eaf1ae/9aa39ad669ed7f39.jpg",
          color: "粉色",
        },
      ],
      // 图片选中多少次
      num: 0,
      // 内存选中多少次
      num1: 0,
      attributes: {
        // 当前选中颜色的下标
        idx: 0,
        // 当前选中的内存
        memory: 0,
      },
      // 轮播图的当前页数
      pagenumber: 1,
      // 控制黑色框过渡
      maskBlackShowB: false,
      // 控制黑色框出现
      maskBlackShowC: false,
      // 内存数组
      memoryArr: ["", "4G", "8G"],
      // 商品属性
      obj: {},
      // 要购买的商品数量
      goodsNumber: 1,
      // 控制提示
      message: false,
      title: "",
      dis: false,

      fwb: "",
    };
  },
  methods: {
    openMask() {
      this.dis = true;
    },
    editShow(val) {
      this.dis = val;
    },
    closeMask() {
      this.dis = false;
    },
    // 选择img
    on(val) {
      this.attributes.idx = val;
      this.$nextTick((_) => {
        let box = this.$refs.box;
        if (val == this.num) {
          this.attributes.idx = 0;
          box.children[1].className = "";
          box.children[2].className = "";
          this.num = 0;
          return;
        }
        if (val == 1) {
          box.children[1].className = "active";
          box.children[2].className = "";
          this.num = val;
        } else if (val == 2) {
          box.children[2].className = "active";
          box.children[1].className = "";
          this.num = val;
        }
      });
    },
    // 选择内存
    getMemory(val) {
      this.attributes.memory = val;
      this.$nextTick((_) => {
        let box = this.$refs.color;
        if (val == this.num1) {
          this.attributes.memory = 0;
          box.children[1].className = "neicun";
          box.children[2].className = "neicun";
          this.num1 = 0;
          return;
        }
        if (val == 1) {
          box.children[1].className = "neicun neicunActive";
          box.children[2].className = "neicun";
          this.num1 = val;
        } else if (val == 2) {
          box.children[2].className = "neicun neicunActive";
          box.children[1].className = "neicun";
          this.num1 = val;
        }
      });
    },

    // 获取当前播放的图的位置
    pagenum(val) {
      if (val == this.imgArr.length) {
        val = 0;
      }
      if (val == -1) {
        val = this.imgArr.length - 1;
      }
      this.pagenumber = val + 1;
    },
    // 打开黑色轮播图
    openImg() {
      // 先开启黑色框
      this.maskBlackShowC = true;

      setTimeout(() => {
        // 再进行过渡
        this.maskBlackShowB = true;
      }, 0);
    },
    // 关闭黑色轮播图
    maskBlackShow() {
      // 先过渡
      this.maskBlackShowB = false;
      setTimeout(() => {
        // 过渡完成后再关闭
        this.maskBlackShowC = false;
      }, 300);
    },

    // 规格
    getGuige() {
      if (this.num == 1 && this.num1 == 1) {
        this.obj = {
          price: "2000.00",
          number: "110",
          color: "蓝色",
          memory: "4G",
        };
      }
      if (this.num == 2 && this.num1 == 2) {
        this.obj = {
          price: "3000.00",
          number: "60",
          color: "粉色色",
          memory: "8G",
        };
      }
      if (this.num == 1 && this.num1 == 2) {
        this.obj = {
          price: "3200.00",
          number: "30",
          color: "蓝色",
          memory: "8G",
        };
      }
      if (this.num == 2 && this.num1 == 1) {
        this.obj = {
          price: "2800.00",
          number: "200",
          color: "粉色",
          memory: "4G",
        };
      }
      if (this.num == 0 && this.num1 == 1) {
        this.obj = {
          price: "3000.00",
          number: "400",
          color: "",
          memory: "4G",
        };
      }
      if (this.num == 0 && this.num1 == 2) {
        this.obj = {
          price: "3000.00",
          number: "400",
          color: "",
          memory: "4G",
        };
      }

      if (this.num == 1 && this.num1 == 0) {
        this.obj = {
          price: "3000.00",
          number: "400",
          color: "",
          memory: "4G",
        };
      }
      if (this.num == 2 && this.num1 == 0) {
        this.obj = {
          price: "3000.00",
          number: "400",
          color: "",
          memory: "4G",
        };
      }
    },
    // 添加商品数量
    add() {
      if (this.goodsNumber >= this.obj.number) {
        this.goodsNumber = this.obj.number;
        this.openShow("库存不足");
      } else {
        this.goodsNumber++;
      }
    },
    jian() {
      if (this.goodsNumber > 1) {
        this.goodsNumber--;
      } else {
        this.openShow("至少选择一件商品");
      }
    },
    getGoodsNumber() {
      if (this.goodsNumber == 0) {
        this.goodsNumber = 1;
      }
      if (this.goodsNumber > this.obj.number) {
        this.goodsNumber = this.obj.number;
      }
    },
    async inCart() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) {
        this.$router.push("/login");
        return;
      }

      this.getList();

      if (this.num == 0 && this.num1 == 0) {
        this.message = true;
        this.title = "请选择商品规格";
        return;
      }
      if (this.num == 0) {
        this.message = true;
        this.title = "请选择商品颜色";
        return;
      }
      if (this.num1 == 0) {
        this.message = true;
        this.title = "请选择商品内存";
        return;
      }
      this.closeMask();
      let res = await postCartAdd({
        uid: JSON.parse(localStorage.getItem("userInfo")).list.uid,
        goodsid: this.$route.query.id,
        num: this.goodsNumber,
      });
      if (res.list.cartCount > 0) {
        this.message = true;
        this.title = "添加成功";
      } else {
        this.message = true;
        this.title = res.msg;
        setTimeout(() => {
          this.$router.push("/login");
        }, 1500);
      }
      setTimeout(() => {
        this.getList();
      }, 0);
    },
    msg(val) {
      console.log(val);
      this.message = val;
    },
    isObjectEqual(obj1, obj2) {
      for (let key in obj1) {
        for (let k in obj2) {
          if (key === k) {
            if (obj1[key] !== obj2[key]) {
              return false;
            }
          }
        }
      }
      return true;
    },

    ...mapActions("cart", ["getList"]),
  },
  computed: {
    ...mapState("cart", ["list"]),
  },
  watch: {
    num() {
      this.getGuige();
    },
    num1() {
      this.getGuige();
    },
    goodsNumber() {
      if (this.goodsNumber > this.obj.number) {
        this.goodsNumber = this.obj.number;
      }
    },
    obj: {
      handler(val, oVal) {
        if (this.goodsNumber >= val.number) {
          this.goodsNumber = val.number;
        }
      },
      deep: true,
    },
  },

  async created() {
    let res = await getGoodDesc({ id: this.$route.query.id });
    let flag = this.isObjectEqual(
      JSON.parse(localStorage.getItem("goodListAttributes")),
      res.list[0]
    );
    console.log(this.$store.state.routerFrom);
    this.list1 = res.list[0];
    // 当前详情页的图片
    this.imgArr[0].img = "http://43.138.15.137:4000" + this.list1.img;
    this.obj = res.list[0];

    if (res.list[0].description) {
      function convertPxToRem(str) {
        // 计算html的fontsize
        const htmlFontSize = 75;
        // 匹配所有的px值
        const reg = /(\d+)px/g;
        // 将匹配到的px值转换成rem
        return str.replace(
          reg,
          ($0, $1) => `${parseFloat($1) / htmlFontSize}rem`
        );
      }
      // 要修改的富文本
      const richText = res.list[0].description;

      this.fwb = convertPxToRem(richText);
    }
  },
};
</script>

<style scoped lang="scss">
@mixin flex() {
  display: flex;
  justify-content: center;
  align-items: center;
}
$fillup: 100%;

.box {
  .pox {
    margin-top: 1.0667rem;
    padding-bottom: 1.3333rem;
    img {
      width: 10rem;
    }
    p {
      margin: 0;
      font-size: 0.4rem;
    }
  }
  footer {
    @include flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    width: $fillup;
    height: 1.33333rem;
    left: 0;
    background: #fff;
    z-index: 1000;
    .fox {
      position: relative;
      @include flex;
      flex-direction: column;
      padding: 0 0.1333rem;
      font-size: 0.2667rem;
      i {
        font-size: 0.48rem;
      }
      .num {
        @include flex;
        position: absolute;
        right: 0.0667rem;
        top: -0.0667rem;
        width: 0.2667rem;
        height: 0.2667rem;
        background: red;
        border-radius: 0.1333rem;
        color: #fff;
        font-size: 0.2rem;
      }
    }
    .btnBox {
      @include flex;

      width: 5.8667rem;
      button {
        width: 50%;
        padding: 0;
        margin: 0;
        border: none;
        height: 1.0667rem;
        color: #fff;
        font-size: 0.3333rem;
      }
      .add {
        border-top-left-radius: 26.64rem;
        border-bottom-left-radius: 26.64rem;
        background: linear-gradient(to right, #ffd01e, #ff8917);
      }
      .buy {
        margin-right: 0.13333rem;
        border-top-right-radius: 26.64rem;
        border-bottom-right-radius: 26.64rem;
        background: linear-gradient(to right, #ff6034, #ee0a24);
      }
    }
  }
  .norms {
    @include flex;

    flex-direction: column;
    height: $fillup;
    .attr_top {
      margin-top: 0.2667rem;
      z-index: 1000;
      display: flex;
      align-items: end;
      width: 90%;
      height: 3.0667rem;
      padding-bottom: 0.1333rem;
      border-bottom: 1px solid #eee;
      .close {
        @include flex;

        position: absolute;
        width: 0.3333rem;
        height: 0.3333rem;
        right: 0.2667rem;
        top: 0.3333rem;
        font-size: 0.5333rem;
      }
      .imgbox {
        width: 2.56rem;
        height: 2.56rem;
        overflow: hidden;
        border-radius: 0.2667rem;
        img {
          object-fit: cover;
          width: $fillup;
          height: $fillup;
        }
      }
      .goodsInfo {
        // @include flex;
        display: flex;
        flex-direction: column;
        font-size: 0.32rem;
        margin-left: 0.2667rem;
        span {
          display: flex;
          align-items: center;
          height: 0.6667rem;
          margin-right: 0.1333rem;
        }
        .jiage {
          font-size: 0.4267rem;
          color: red;
          i {
            font-style: normal;
            font-size: 0.5867rem;
          }
        }
        .num {
          color: #969799;
          span {
            margin: 0;
          }
          .red {
            color: red;
          }
        }
        .good_attr {
          color: #969799;
        }
      }
    }
    .container {
      width: 10rem;
      padding-top: 0.32rem;
      font-size: 0.32rem;
      overflow: auto;
      .center {
        margin: 0 0.42667rem 0.32rem;
        .top {
          font-size: 0.36rem;
          padding-bottom: 0.32rem;
        }
        .color {
          display: flex;
          border-bottom: 1px solid #eee;
          margin-bottom: 0.5333rem;
          padding-bottom: 0.5333rem;
          span {
            border-radius: 0 0 0.0667rem 0.0667rem;
            position: relative;
            background: #f7f8fa;
            border: 0.02667rem solid transparent;
            i {
              position: absolute;
              right: 0;
              color: #fff;
              font-size: 0.5333rem;
              background: rgba($color: #000000, $alpha: 0.3);
            }
            .item_img {
              width: 2.9333rem;
              height: 2.9333rem;
              img {
                width: $fillup;
              }
            }
            .color_img {
              display: flex;
              align-items: center;
              height: 0.6667rem;
              justify-content: center;
            }
          }
          .active {
            border: 0.02667rem solid #fde6e9;
            color: #ee0a24;
            background: #fde6e9;
          }
          .neicun {
            z-index: 1;
            border-radius: 0.1333rem;
            padding: 0.21333rem;
            margin-right: 0.2667rem;
            background: #f7f8fa;
          }
          .neicunActive {
            color: #ee0a24;
            background: #fde6e9;
          }
        }
        .number {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 0.42667rem 0 0.42667rem;
          overflow: hidden;
          line-height: 0.8rem;
          span:nth-last-of-type(1) {
            display: flex;
            justify-content: center;
            align-items: center;
            button {
              color: #323233;
              background-color: #f7f8fa;
              border-radius: 0.10667rem 0 0 0.10667rem;
              border: none;
              width: 0.74667rem;
              height: 0.74667rem;
              font-size: 0.4rem;
            }
            input {
              box-sizing: border-box;
              width: 0.85333rem;
              height: 0.74667rem;
              margin: 0 0.05333rem;
              padding: 0;
              color: #323233;
              font-size: 0.37333rem;
              line-height: normal;
              text-align: center;
              vertical-align: middle;
              background-color: #f2f3f5;
              border: 0;
              border-width: 0.02667rem 0;
              border-radius: 0;
              outline: none;
            }
          }
        }
      }
    }
    .btns {
      display: flex;
      padding: 0.21333rem 0.42667rem;
      button {
        width: 4rem;
        height: 1.06667rem;
        font-weight: 500;
        font-size: 0.37333rem;
        border: none;
        color: #fff;
        border-radius: 0;
      }
      button:first-of-type {
        border-top-left-radius: 0.53333rem;
        border-bottom-left-radius: 0.53333rem;
        background: linear-gradient(to right, #ffd01e, #ff8917);
      }
      button:last-of-type {
        border-top-right-radius: 0.53333rem;
        border-bottom-right-radius: 0.53333rem;
        background: linear-gradient(to right, #ff6034, #ee0a24);
      }
    }
  }
  .maskBlack {
    position: fixed;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    background: black;
    width: $fillup;
    height: $fillup;
    opacity: 0;
    z-index: 10000;
    .pagenum {
      color: #fff;
      position: absolute;
      top: 50px;
      font-size: 20px;
    }
    .swiper {
      width: $fillup;
      height: 60%;
      background: #fff;
    }
  }
  .showMask {
    opacity: 1;
  }
  .closeMessage {
    display: none;
  }
}
</style>
