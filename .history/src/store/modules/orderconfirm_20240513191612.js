import { getAddressList } from "@/api/getAddressList";
import { postAddressremove } from "@/api/postAddressremove.js";

let orderconfirm = ({
    state: {
        list: JSON.parse(localStorage.getItem('orderconfirmList')) || [],
        megshow: false,
        title: '',
        type: ''
    },
    getters: {

    },
    mutations: {
        getList(state, payload) {
            payload.list.map(item => {
                item.checked = false
            })
            state.list = payload.list
        },
        setChecked(state, payload) {
            state.list.map(item => {
                if (item.id == payload) {
                    item.checked = true
                } else {
                    item.checked = false
                }
            })
        },
        delAddress(state, payload) {
            if (payload.code == 200) {
                state.megshow = true
                this.$message.show({ title: '删除成功', type: "success" })
            } else {
                state.megshow = true
                state.title = '删除失败'
                state.type = 'error'
            }
            setTimeout(() => {
                state.megshow = false
            }, 1000);
        }
    },
    actions: {

        // 获取地址列表数据
        async getAddressData(context, payload) {
            let res = await getAddressList({ uid: payload.uid });
            context.commit('getList', res)
        },
        // 删除地址列表数据
        async postAddressDel(context, payload) {
            let res = await postAddressremove({ id: payload });
            context.commit('delAddress', res)
        }
    },
    namespaced: true
})
export default orderconfirm