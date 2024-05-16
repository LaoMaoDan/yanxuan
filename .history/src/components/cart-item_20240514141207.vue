<template>
  <div v-silde class="pox">
    <div class="cart-item">
      <div class="check">
        <div class="checkbox" @click="editChekced">
          <div
            :class="item.checked ? 'ipt iconfont icon-xuanzhong' : 'ipt'"
          ></div>
        </div>
      </div>
      <div class="imgbox">
        <img :src="'http://43.138.15.137:4000' + item.img" alt="" />
      </div>
      <div class="right">
        <div class="item_title">
          {{ item.goodsname }}
        </div>
        <div class="item_bottom">
          <span>￥{{ item.price }}</span>
          <div class="Stepper">
            <button @click="jian(item)">-</button>
            <input type="text" v-model="item.num" />
            <button @click="add(item)">+</button>
          </div>
        </div>
      </div>
      <div class="del" @click="openDel(item)">删除</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  props: ["item", "show"],
  methods: {
    async add(val) {
      this.addNum(val.id);
      this.editCart({ id: val.id, type: 2 });
    },
    jian(val) {
      if (val.num > 1) {
        this.reduce(val.id);
        this.editCart({ id: val.id, type: 1 });
      }
    },
    openDel(val) {
      this.$emit("open", val);
    },
    editChekced() {
      this.setChecked(this.item.id);
    },
    ...mapActions("cart", ["editCart"]),
    ...mapMutations("cart", ["addNum", "reduce", "del", "setChecked"]),
  },
  watch: {
    item() {
      this.setChecked();
    },
    
  },
};
</script>

<style scoped lang="scss">
.pox {
  width: 100%;
  transition: 0.3s;

  .cart-item {
    position: relative;
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 0.2667rem;
    padding: 0.2667rem 0;
    background: #fff;
    .imgbox {
      width: 2.2933rem;
      height: 2.2933rem;
      overflow: hidden;
      border-radius: 0.1333rem;
      margin-right: 0.2667rem;
      margin-left: 0.2667rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .check {
      width: 1.3333rem;
      display: flex;
      align-items: center;
      justify-content: center;

      .checkbox {
        position: relative;
        text-align: center;
        line-height: 0.4rem;
        width: 0.3733rem;
        height: 0.3733rem;
        margin: 0.2667rem {
          right: 0;
          top: 0;
          bottom: 0;
        }
        border: 1px solid #c8c8c8;
        border-radius: 50%;
        overflow: hidden;
        .ipt {
          position: absolute;
          left: -0.0267rem;
          top: -0.0267rem;
          width: 0.4267rem;
          height: 0.4267rem;
          border: 1px solid #fff;
          margin: 0;
          font-size: 0.4rem;
          color: #409eff;
        }
      }
    }

    .right {
      font-size: 0.2933rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .item_title {
        width: 100%;
      }
      .item_bottom {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .Stepper {
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid #eee;
          margin-right: 0.5333rem;
          button {
            flex: 1;
            width: 0.5333rem;
            border: none;
            background: #fff;
            font-size: 0.5333rem;
            font-weight: 400;
            line-height: 0.5333rem;
            padding: 0;
            margin: 0;
          }
          input {
            flex: 1;
            width: 0.4rem;
            height: 0.52rem;
            border: none;
            text-align: center;
            outline: none;
            font-size: 0.2667rem;
            border-left: 1px solid #eee;
            border-right: 1px solid #eee;
          }
        }
      }
    }
    .del {
      position: absolute;
      right: -1.6rem;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1.6rem;
      height: 100%;
      background: red;
      color: #fff;
      font-size: 0.2667rem;
    }
  }
}
</style>
