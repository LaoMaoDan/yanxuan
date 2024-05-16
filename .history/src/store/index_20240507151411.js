import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import cart from '@/store/modules/cart.js'
import orderconfirm from '@/store/modules/orderconfirm.js'
import router from '@/router'
let store = new Vuex.Store({
  state: {
    routerFrom:''
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    cart,
    orderconfirm
  },

})
store.subscribe((mutations, state) => {
  localStorage.setItem("cartList", JSON.stringify(state.cart.list));
  localStorage.setItem("orderconfirmList", JSON.stringify(state.orderconfirm.list));
})
export default store
