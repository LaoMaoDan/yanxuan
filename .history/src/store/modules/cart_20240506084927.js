import { getCartList } from "@/api/getCartList.js";
import { postEditCart } from "@/api/editCart";
import { postCartDelete } from '@/api/cartDelete';
let cart = ({
    state: {
        list: JSON.parse(localStorage.getItem('cartList')) || [],
        code: 0,
        checkedAll: false
    },
    getters: {
        // 当前选中商品的总价
        getPrice(state) {
            let price = 0
            state.list.map(item => {
                if (item.checked) {
                    price += item.num * item.price
                }
            })
            return price
        },
    },
    mutations: {
        // 单选
        setChecked(state, payload) {
            console.log(123);
            state.list.map(item => {
                if (item.id == payload) {
                    item.checked = item.checked
                }
            })
            let aa = state.list.some(item => {
                return item.checked
            })
            state.checkedAll = aa
        },
        // 全选
        setCheckedAll(state, payload) {
            state.checkedAll = false
            state.list.map(item => {
                item.checked = state.checkedAll
            })
        },
        setList(state, payload) {
            payload.list.map(item => {
                item.checked = false
            })
            state.list = payload.list
            state.code = payload.code
        },
        // 添加商品的数量
        addNum(state, payload) {

            state.list.map(item => {
                if (item.id == payload) {
                    item.num++
                }
            })
        },
        // 减商品数量
        reduce(state, payload) {
            state.list.map(item => {
                if (item.id == payload) {
                    item.num--
                }
            })
        },

    },
    actions: {
        // 获取数据
        async getList(context) {
            let uid = JSON.parse(localStorage.getItem("userInfo")).list.uid;

            let res = await getCartList({
                uid: uid,
            });
            if (!res.list) {
                res.list = []
            }

            context.commit('setList', res)
        },
        // 添加商品数量或减少商品数量
        async editCart(context, payload) {
            let res = await postEditCart({
                uid: JSON.parse(localStorage.getItem("userInfo")).list.uid,
                id: payload.id,
                type: payload.type,
            });
        },
        // 删除购物车商品
        async delCart(context, payload) {
            let res = await postCartDelete({ id: payload.id })
        }
    },

    namespaced: true,

})

export default cart

