<template>
  <div class="box">
    <elMessage :title="title" v-if="megshow" :type="type"></elMessage>
    <TopTitle :show="true" title="地址列表"></TopTitle>
    <div class="content">
      <addressItem
        v-for="item in data"
        :key="item.id"
        :item="item"
        @checked="checked"
        @open="open"
      ></addressItem>
    </div>
    <btnVue @dian="goaddaddress"></btnVue>
    <confirmMaskVue @close="close" @del="del" :display="show"></confirmMaskVue>
  </div>
</template>

<script>
import elMessage from "@/components/common/el-message.vue";
import { mapState, mapActions, mapMutations } from "vuex";
import TopTitle from "@/components/common/top-title.vue";
import addressItem from "@/components/address-item.vue";
import btnVue from "@/components/common/btn.vue";
import confirmMaskVue from "@/components/common/confirmMask.vue";
export default {
  components: {
    TopTitle,
    addressItem,
    btnVue,
    confirmMaskVue,
    elMessage,
  },
  data() {
    return {
      data: [],
      show: false,
      addressId: 0,
    };
  },
  async created() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo")).list;
    await this.getAddressData({ uid: userInfo.uid });
  },
  methods: {
    checked(val) {
      this.setChecked(val);
    },
    // 添加收货地址
    goaddaddress() {
      this.$router.push("/addAddress");
    },
    open(val) {
      this.addressId = val;
      this.show = true;
    },
    del(val) {
      this.show = val;
      this.postAddressDel(this.addressId);
      setTimeout(() => {
        let userInfo = JSON.parse(localStorage.getItem("userInfo")).list;
        this.getAddressData({ uid: userInfo.uid });
      }, 100);
    },
    close(val) {
      this.show = val;
    },
    ...mapActions("orderconfirm", ["getAddressData", "postAddressDel"]),
    ...mapMutations("orderconfirm", ["setChecked"]),
  },
  computed: {
    ...mapState("orderconfirm", ["list", "megshow", "title", "type"]),
  },
  watch: {
    list: {
      handler() {
        this.data = this.list;
      },
      deep: true,
    },
  },
};
</script>

<style scoped lang="scss">
$eight
.box {
  padding-bottom: ;
  padding-top: 1.0667rem;
  .content {
    padding: 0.2667rem;
    overflow: hidden;
  }
  .btnBox {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0.2667rem;
    left: 0;
    width: 100%;
    height: 1.0667rem;
    .addAddress {
      width: 80%;
      height: 1.0667rem;
      color: #fff;
      border: none;
      background: linear-gradient(to right, #ffc003, #ff6040);
      font-size: 0.4rem;
      border-radius: 0.6667rem;
    }
  }
}
</style>
