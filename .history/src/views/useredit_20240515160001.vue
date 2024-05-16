<template>
  <div class="box">
    <tips v-if="show" :title="title"></tips>
    <top-title :show="true" title="编辑会员信息"></top-title>
    <div class="form">
      <div class="item">
        <span>用户昵称</span>
        <input
          type="text"
          v-model="userInfo.nickname"
          placeholder="请填写用户昵称"
        />
      </div>
      <div class="item">
        <span>会员头像</span>
        <div class="left" style="flex-wrap: wrap; margin-bottom: 0.1333rem">
          <div class="iptBox" v-for="(item, index) in imgArr" :key="index">
            <div class="imgBox">
              <i class="iconfont icon-guanbi" @click="clearImg(index)"></i>
              <img :src="item.url" alt="" />
            </div>
          </div>
          <div class="iptBox" ref="img">
            <input class="file" @change="getimg" type="file" />
            <i class="iconfont icon-xiangji"></i>
          </div>
        </div>
      </div>
      <div class="item">
        <span>性别</span>
        <div class="left">
          <div class="c">
            <span>
              <input type="radio" v-model="userInfo.sex" value="1" /><span>
                男
              </span>
            </span>
            <span>
              <input type="radio" v-model="userInfo.sex" value="2" /><span>
                女
              </span>
            </span>
          </div>
        </div>
      </div>
      <div class="item">
        <span>生日</span>
        <div class="sheng" @click="opencalendar">
          <span v-show="!dateStr">请选择日期</span>
          <span class="hei" v-show="dateStr">{{ dateStr }}</span>
        </div>
      </div>
      <div class="item" @click="openSelect">
        <span>地区</span>
        <div class="sheng">
          <span class="hei" v-show="userInfo.region"
            >{{ userInfo.region }}
          </span>
          <span v-show="!userInfo.region">选择省 / 市 / 区</span>
        </div>
        <i class="iconfont icon-back-copy"></i>
      </div>
    </div>
    <btnVue @dian="submit" title="提交"></btnVue>
    <!-- 地区 -->
    <maskVue :dis="dis" @editShow="editShow" radius="0.2667rem" height="370px">
      <div class="maskBox">
        <div class="top">
          <span @click="no">取消</span>
          <span @click="ok">确认</span>
        </div>
        <div class="content">
          <div class="addressMask">
            <div></div>
            <div class="addressTall"></div>
            <div></div>
          </div>
          <pulldown @num="editNum" :prop="city"></pulldown>
          <pulldown @num="editNum" :prop="two"></pulldown>
          <pulldown @num="editNum" :prop="three"></pulldown>
        </div>
      </div>
    </maskVue>
    <!-- 日历 -->
    <maskVue :dis="dis1" @editShow="editShow" height="580px">
      <div class="maskBox">
        <div class="head">
          <div class="date">日期选择 <i class="iconfont"></i></div>
          <div class="currentDate">
            {{ 2024 + "年" + 5 + "月" }}
          </div>
          <div class="weekdays">
            <span>日</span>
            <span>一</span>
            <span>二</span>
            <span>三</span>
            <span>四</span>
            <span>五</span>
            <span>六</span>
          </div>
        </div>
        <div class="bottom" @touchstart="startBottom" ref="bottom">
          <div class="contentBox" ref="content">
            <div v-for="(item, index) in Dates" :key="index" class="year">
              <div
                class="month"
                v-for="(item1, index1) in item.months"
                :key="index1"
              >
                <div class="bgfont">{{ item1.month + 1 }}</div>
                <div class="title">
                  {{ item.year }}年{{ item1.month + 1 }}月
                </div>
                <div class="days">
                  <div
                    :class="
                      index == time[0] && index1 == time[1] && index2 >= time[2]
                        ? 'jinyong'
                        : ''
                    "
                    @click.stop="
                      index == time[0] && index1 == time[1] && index2 >= time[2]
                        ? null
                        : acitve(index, index1, index2)
                    "
                    ref="day"
                    :style="
                      item2 == 1
                        ? {
                            marginLeft:
                              getWeek(item.year, item1.month, 1) * 14.285 + '%',
                          }
                        : ''
                    "
                    class="day"
                    v-for="(item2, index2) in item1.days"
                    :key="index2"
                  >
                    {{ item2 }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="btnbox1">
          <btnVue title="确定" @dian="getDatestr"></btnVue>
        </div>
      </div>
    </maskVue>
  </div>
</template>

<script>
import tips from "@/components/common/tips.vue";
import city from "@/assets/js/address.js";
import maskVue from "@/components/common/mask.vue";
import topTitle from "@/components/common/top-title.vue";
import pulldown from "@/components/common/pulldown.vue";
import btnVue from "@/components/common/btn.vue";
import { getUserInfo } from "@/api/getUserInfo";
import { postinfoedit } from "@/api/postinfoedit";
export default {
  name: "userInfo",
  components: {
    btnVue,
    topTitle,
    maskVue,
    pulldown,
    tips,
  },
  data() {
    return {
      dis: false,
      numArr: [],
      two: [],
      three: [],
      city: city,
      valArr: [],
      show: false,
      title: "",
      userInfo: {},
      imgArr: [],
      files: {},
      dis1: false,
      Dates: [],
      preY: 0,
      moveY: 0,
      prev: [],
      time: [],
      dateStr: "",
    };
  },
  async created() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo")).list;
    await getUserInfo({ uid: userInfo.uid }).then((res) => {
      if (res.code == 200) {
        this.userInfo = res.list[0];
        this.imgArr.push({
          url: "http://43.138.15.137:4000/" + res.list[0].avatarurl,
        });
      } else {
        this.$router.push("/login");
      }
    });
  },
  methods: {
    kg() {
      if (this.userInfo.status) {
        this.userInfo.status = 0;
        this.$refs.ballBox.style.background = "#dcdfe6";
        this.$refs.ballBox.style.borderColor = "#dcdfe6";
        this.$refs.ball.style.left = "0";
      } else {
        this.userInfo.status = 1;
        this.$refs.ballBox.style.borderColor = "#409eff";
        this.$refs.ballBox.style.background = "#409eff";
        this.$refs.ball.style.left = ".6667rem";
      }
    },
    openSelect() {
      this.dis = true;
    },
    editShow(val) {
      this.dis = val;
      this.dis1 = val;
    },
    editNum(val) {
      if (val.num > -1) {
        // 后四位是0000 代表省
        if (val.item.code.substr(2) == "0000") {
          this.two = val.item.children;
          this.valArr[0] = val.item.name;
          this.three = [];
        } else {
          // 后两位 00 代表市
          if (val.item.code.substr(4) == "00") {
            this.three = this.two[val.num].children;
            this.valArr[1] = val.item.name;
          }
          if (val.item.code.substr(4) != "00") {
            this.valArr[2] = val.item.name;
          }
        }
      }
      if (val.num > 30) {
        this.two = [];
        this.three = [];
      }

      if (val.num == -1) {
        if (val.item[0].code.substr(2) == "0000") {
          this.two = [];
          this.three = [];
        } else if (val.item[0].code.substr(2) == "0100") {
          this.three = [];
        }
      }
    },
    ok() {
      this.userInfo.location = "";
      if (this.valArr.length > 2) {
        this.userInfo.location = this.valArr.join("/");
        this.userInfo.region = this.valArr.join("/");
        this.dis = false;
      } else {
        this.tishi("请选择地区");
      }
    },
    no() {
      this.userInfo.location = "";
      this.dis = false;
    },
    tishi(val) {
      this.show = true;
      this.title = val;
      setTimeout(() => {
        this.show = false;
      }, 1000);
    },
    getimg(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      if (!/(jpeg|png)/i.test(files[0].type)) {
        alert("上传的图片只能是jpg或png的");
        e.target.value = "";
        return;
      }
      if (files[0].size > 2 * 1024 * 1024) {
        alert("只能上传不大于2MB的图片");
        return;
      }
      this.files = files[0];
      let file = new FileReader();
      file.readAsDataURL(files[0]);
      file.addEventListener("loadend", (e) => {
        this.imgArr.push({ url: e.target.result });
      });
    },
    async submit() {
      if (!this.userInfo.nickname) {
        this.tishi("请输入用户昵称");
      }
      if (!this.userInfo.avatarurl.length) {
        this.tishi("请上传头像");
      }

      let formData = new FormData();
      formData.append("nickname", this.userInfo.nickname);
      formData.append("avatarurl", this.files);
      formData.append("sex", this.userInfo.sex);
      formData.append("birthday", "2005-9-15");
      formData.append("id", this.userInfo.id);
      await postinfoedit(formData).then((res) => {
        this.tishi("编辑成功");
        setTimeout(() => {
          this.$router.go(-1);
        }, 1000);
      });
    },
    clearImg(val) {
      this.imgArr.splice(val, 1);
    },
    startBottom() {
      let bottom = this.$refs.bottom;
      let content = this.$refs.content;
      let year = content.fie
      // console.log(year);
      bottom.addEventListener("scroll", (e) => {
        console.log(bottom.scrollTop / );
      });
    },
    opencalendar() {
      this.dis1 = true;
      let content = this.$refs.content;
      let bottom = this.$refs.bottom;

      this.$nextTick((_) => {
        let Y = content.scrollHeight - bottom.clientHeight;
        bottom.scrollTop = Y;
      });
      this.getDate();
      this.getToday();
      this.acitve(this.time[0], this.time[1], this.time[2] - 1);
    },
    // 获取日期
    getDays(year, month) {
      return new Date(year, month, 0).getDate();
    },
    getToday() {
      let today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth();
      let day = today.getDate();
      this.time = [];
      this.Dates.map((item, index) => {
        if (item.year == year) {
          this.time.push(index);
          item.months.map((item1, index1) => {
            if (item1.month == month) {
              this.time.push(index1);
              this.time.push(day);
            }
          });
        }
      });
    },
    getDate() {
      let date = new Date();
      let currentDate = date.getFullYear();
      let currentMonth = date.getMonth();
      let arr = [];
      // 获取年
      for (let i = 1990; i <= currentDate; i++) {
        arr.push({ year: i, months: [] });
      }
      // 获取月
      arr.map((item) => {
        if (item.year == currentDate) {
          for (let i = 0; i <= currentMonth; i++) {
            item.months.push({ month: i, days: [] });
          }
        } else {
          for (let i = 0; i <= 11; i++) {
            item.months.push({ month: i, days: [] });
          }
        }
      });
      // 获取日
      arr.map((item) => {
        item.months.map((item1) => {
          item1.days = this.getDays(item.year, item1.month);
        });
      });
      this.Dates = arr;
    },
    acitve(year, month, day) {
      let el = this.$refs.content;

      setTimeout(() => {
        if (this.prev.length) {
          el.children[this.prev[0]].children[this.prev[1]].children[2].children[
            this.prev[2]
          ].classList.remove("active");
        }
        el.children[year].children[month].children[2].children[
          day
        ].classList.add("active");
        this.prev = [year, month, day];
      }, 0);
    },
    getDatestr() {
      if (!this.prev.length) {
        this.show = true;
        this.title = "请选择日期";
        return;
      }

      let str =
        this.Dates[this.prev[0]].year +
        "-" +
        (this.Dates[this.prev[0]].months[this.prev[1]].month + 1) +
        "-" +
        (this.prev[2] + 1);
      this.dateStr = str;
      this.dis1 = false;
    },
  },
  computed: {
    // 获取每月一日是周几
    getWeek() {
      return (year, month, day) => new Date(year, month, 1).getDay();
    },
  },
};
</script>

<style scoped lang="scss">
.box {
  padding-top: 1.0667rem;
  padding-bottom: 1.0667rem;
  width: 100%;
  .form {
    padding: 0.2667rem;
    font-size: 0.36rem;
    .item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.2667rem 0.4rem;
      span {
        width: 2.133rem;
        font-size: 0.4rem;
        color: #646566;
      }
      input {
        flex: 1;
        border: 0;
        font-size: 0.3333rem;
        height: 1.0667rem;
        padding: 0;
        margin: 0;
        outline: none;
      }
      input::placeholder {
        color: #cacaca;
      }
      .left {
        flex: 1;
        display: flex;
        .c {
          display: flex;
          align-items: center;
          span {
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 1.0667rem;
            margin-right: 0.4rem;
            span {
              flex: 1;
              padding: 0;
              margin: 0 {
                left: 0.1333rem;
              }
            }
            input {
              flex: 1;
              height: 0.5333rem;
            }
          }
        }

        .iptBox {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          background: #eee;
          margin-right: 0.1333rem;
          .imgBox {
            position: relative;
            width: 2rem;
            height: 2rem;
            overflow: hidden;
            .iconfont {
              position: absolute;
              right: -0.1333rem;
              top: -0.1333rem;
              width: 0.4rem;
              height: 0.4rem;
              font-size: 0.1333rem;
              border-radius: 50%;
              background: rgba($color: #000000, $alpha: 0.6);
            }
            .iconfont::before {
              position: absolute;
              left: 0.0933rem;
              top: 0.1733rem;
            }
            img {
              width: 100%;
              height: 100%;
            }
          }

          .file {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
          }
          i {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
          }
        }
      }

      .sheng {
        flex: 1;
        display: flex;
        align-items: center;
        color: #cacaca;
        height: 1.0667rem;
        font-size: 0.3333rem;
        span {
          color: #cacaca;
          width: 100%;
        }
        .hei {
          color: black;
        }
      }

      .iconfont {
        font-size: 0.6667rem;
        color: #cacaca;
      }
    }
    .item::after {
      content: "";
      position: absolute;
      width: 90%;
      bottom: 0;
      border-bottom: 1px solid #eee;
    }
  }
  .maskBox {
    height: 100%;
    .top {
      width: 100%;
      height: 80px;
      display: flex;
      justify-content: space-between;
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2rem;
        height: 100%;
        font-size: 0.4rem;
      }
    }
    .content {
      position: relative;
      display: flex;
      justify-content: space-around;
      height: 290px;
      overflow: hidden;
      .addressMask {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        pointer-events: none;
        div {
          width: 100%;
        }
        .addressTall {
          position: absolute;
          top: 50%;
          transform: translateY(-40px);
          box-sizing: border-box;
          z-index: 2;
          border: 1px solid #eee {
            left: 0;
            right: 0;
          }
          width: 100%;
          height: 80px;
          background: rgba($color: #fff, $alpha: 0) !important;
          pointer-events: none;
        }
        div:nth-of-type(1) {
          flex: 1;
          background: linear-gradient(
            to bottom,
            rgba($color: #fff, $alpha: 1),
            rgba($color: #fff, $alpha: 0)
          );
        }
        div:nth-of-type(3) {
          flex: 1;
          background: linear-gradient(
            to top,
            rgba($color: #fff, $alpha: 1),
            rgba($color: #fff, $alpha: 0)
          );
        }
      }
    }
    .head {
      width: 100%;
      box-shadow: 0 0.05333rem 0.26667rem rgba(125, 126, 128, 0.16);

      .date {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.42667rem;
        height: 1.17333rem;
      }
      .currentDate {
        font-size: 0.3733rem;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.17333rem;
      }
      .weekdays {
        font-size: 0.42667rem;
        display: flex;
        align-items: center;
        height: 0.8rem;
        justify-content: space-between;
        span {
          flex: 1;
          font-size: 0.3467rem;
          text-align: center;
        }
      }
    }
    .bottom {
      height: 100%;
      overflow: auto;
      .contentBox {
        .year {
          width: 100%;
          height: auto;
          .month {
            position: relative;
            width: 100%;
            .bgfont {
              position: absolute;
              z-index: -100;
              display: flex;
              justify-content: center;
              align-items: center;
              left: 0;
              top: 0;
              font-size: 5rem;
              width: 100%;
              height: 100%;
              color: #eee;
              pointer-events: all;
            }
            .title {
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 0.48rem;
              height: 1.17333rem;
            }
            .days {
              display: flex;
              justify-content: left;
              z-index: 100;
              flex-wrap: wrap;
              .jinyong {
                color: #eee;
              }
              .day {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 14.285%;
                height: 1.5rem;
                font-size: 0.42667rem;
              }
              .active {
                background: red;
                color: #fff;
                border-radius: 10px;
              }
            }
          }
        }
        .year:last-child {
          padding-bottom: 5rem;
        }
      }
    }
    .btnbox1 {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1.6rem;
      background: #fff;
    }
  }
}
</style>
