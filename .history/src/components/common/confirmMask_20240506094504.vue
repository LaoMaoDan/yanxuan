<template>
  <div ref="mask" class="mask" v-show="show" @click="close">
    <div ref="confirm" class="confirm">
      <div class="top">
        <h6>温馨提示</h6>
        <p>是否确定删除？</p>
      </div>
      <div class="bottom">
        <button @click.stop="close">取消</button>
        <button @click.stop="del">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    display: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  watch: {
    display() {
      if (this.display) {
        this.open();
      }
    },
  },
  methods: {
    open() {
      this.show = true;
      this.$nextTick((_) => {
        let mask = this.$refs.mask;
        let confirm = this.$refs.confirm;
        setTimeout(() => {
          confirm.classList.add("confirmShow");
          mask.classList.add("showMask");
        }, 0);
      });
    },
    close() {
      this.$nextTick((_) => {
        let confirm = this.$refs.confirm;
        let mask = this.$refs.mask;
        confirm.classList.remove() = "confirm";
        mask.className = "mask";
        setTimeout(() => {
          this.show = false;
          this.$emit("close", false);
        }, 300);
      });
    },
    del() {
      this.close();
      setTimeout(() => {
        this.$emit("del");
      }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  background: rgba(0, 0, 0, 0);
  transition: background 0.3s;
  .confirm {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 5.3333rem;
    height: 3.333rem;
    background: #fff;
    border-radius: 0.0667rem;
    font-size: 0.4rem;
    overflow: hidden;
    text-align: center;
    opacity: 0;
    .top {
      padding-top: 0.2667rem;
      h6 {
        font-size: 0.4rem;
        margin: 0.2667rem 0 0 0;
        font-weight: 500;
      }
      p {
        color: #646566;
        margin-bottom: 0;
      }
    }
    .bottom {
      margin-top: 0.5333rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 0.8rem;

      button {
        flex: 1;
        background: #fff;
        height: 100%;
        border: 0;
        font-size: 0.2667rem;
        border-top: 1px solid #eee;
      }
      button:nth-of-type(1) {
        border-right: 1px solid #eee;
      }
      button:nth-of-type(2) {
        color: red;
      }
    }
  }
  .confirmShow {
    opacity: 1;
  }
}
.showMask {
  background: rgba(0, 0, 0, 0.3);
}
</style>
