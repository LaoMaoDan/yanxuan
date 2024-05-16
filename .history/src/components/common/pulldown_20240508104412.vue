<template>
  <div class="address">
    <ul
      v-if="show && prop.length > 0"
      ref="ul"
      @touchstart="start($event)"
      @touchmove="move($event)"
      @touchend="end($event)"
    >
      <li></li>
      <li>请选择</li>
      <li ref="li" v-for="item in prop" :key="item.code">
        {{ item.name }}
      </li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    prop: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      startY: 0,
      currentY: 0,
      preY: 0,
      dragging: false,
      show: true,
    };
  },
  methods: {
    start(e) {
      let ul = this.$refs.ul;
      ul.style.transition = "none";
      this.startY = e.changedTouches[0].clientY;
      if (!this.dragging) {
        this.dragging = true;
      }
    },
    move(e) {
      let ul = this.$refs.ul;
      if (this.dragging) {
        this.currentY = this.preY + e.changedTouches[0].clientY - this.startY;
        ul.style.transform = "translateY(" + this.currentY + "px)";
      }
    },
    end(e) {
      this.dragging = false;
      let ul = this.$refs.ul;
      let li = this.$refs.li;

      let maxH = li.length * -li[0].offsetHeight;
      if (this.currentY < maxH) {
        this.currentY = maxH;
      }
      if (this.currentY > 0) {
        this.currentY = 0;
      }

      let num = this.currentY / li[0].offsetHeight;

      if (e.changedTouches[0].clientY < this.startY) {
        num = Math.floor(num);
      } else {
        num = Math.ceil(num);
      }
      this.currentY = num * li[0].offsetHeight;

      let obj = {
        num: Math.abs(num) - 1,
        item: this.prop[Math.abs(num) - 1] || this.prop,
      };
      this.$emit("num", obj);
      ul.style.transition = "all .2s";
      ul.style.transform = "translateY(" + this.currentY + "px)";
      this.preY = this.currentY;
    },
  },
  watch: {
    prop() {
      this.preY = 0;
      // this.show = false;
      // this.$nextTick((_) => {
      // this.show = true;
      // });
    },
  },
};
</script>

<style scoped lang="scss">
.address {
  width: 2.6667rem;
  height: 100%;
  overflow: hidden;
  ul {
    margin: 0 {
      top: 25px;
      bottom: 60px;
    }
    padding: 0;
    list-style: none;
    // transform: translateY(0);
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      color: black;
      height: 80px;
      text-align: center;
      font-size: 0.32rem;
    }
  }
}
</style>
