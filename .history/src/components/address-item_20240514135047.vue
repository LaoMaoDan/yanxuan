<template>
  <div class="itemBox" @click="setChecked">
    <div class="item" v-silde>
      <div class="check">
        <div class="checkbox">
          <!-- <input type="checkbox" v-model="checked" /> -->
          <div :class="'ipt' ? 'itp checked' : 'ipt'"></div>
        </div>
      </div>
      <div class="right">
        <div class="moren" v-if="item.status == 1">默认</div>
        <div><span>姓名:</span>{{ item.username }}</div>
        <div><span>手机:</span>{{ item.userphone }}</div>
        <div><span>地址:</span>{{ item.location }}</div>
      </div>
      <i class="iconfont icon-bianji" @click.stop="goEdit"></i>
      <div class="del" @click.stop="open">删除</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      checked: false,
    };
  },
  created() {
    this.checked = this.item.checked;
  },
  methods: {
    setChecked() {
      this.$emit("checked", this.item.id);
      setTimeout(() => {
        this.$router.go(-1);
      }, 1000);
    },
    goEdit() {
      let str = JSON.stringify(this.item);
      this.$router.push({
        path: "/editAddress",
        query: { item: str },
      });
    },
    open() {
      this.$emit("open", this.item.id);
    },
  },
  watch: {
    item: {
      handler() {
        this.checked = this.item.checked;
      },
      deep: true,
    },
  },
};
</script>

<style scoped lang="scss">
.itemBox {
  position: relative;
  margin: 0.32rem;
  overflow: hidden;
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
    .check {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.3333rem;
      height: 100%;

      margin: 0;
      .checkbox {
        position: relative;
        text-align: center;
        line-height: 0.4rem;
        width: 0.3733rem;
        height: 0.3733rem;
        margin: 0.2667rem {
          left: 0;
          top: 0;
          bottom: 0;
        }
        border: 1px solid #c8c8c8;
        border-radius: 50%;
        overflow: hidden;
        input[type="checkbox"] {
          position: absolute;
          left: -0.0267rem;
          top: -0.0267rem;
          width: 0.4267rem;
          height: 0.4267rem;
          border: 1px solid #fff;
          margin: 0;
        }
      }
    }
    .right {
      position: relative;
      font-size: 0.3467rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin: 0;
      .moren {
        position: absolute;
        left: 1.7333rem;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.0667rem;
        font-size: 0.2667rem;
        padding: 0.0667rem;
        color: #fff;
        font-weight: 700;
        background-color: red;
      }
    }
    div {
      display: flex;
      justify-content: left;
      margin-bottom: 0.1333rem;
      span {
        width: 0.8rem;
      }
    }
    div:nth-of-type(3) {
      margin-bottom: 0;
    }
    .iconfont {
      font-size: 0.5333rem;
    }
    .del {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: -1.6rem;
      width: 1.0667rem;
      height: 100%;
      background: red;
      font-size: 0.2667rem;
      color: #fff;
    }
  }
}
</style>
