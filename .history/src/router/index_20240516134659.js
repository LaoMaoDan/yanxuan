import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
// views
import login from "@/views/login.vue";
import index from '@/views/index.vue'
import loginForm from '@/views/loginForm.vue'
import smsLogin from "@/views/smsLogin.vue";
import register from '@/views/register.vue'
import cate from '@/views/cate.vue'
import cart from '@/views/cart.vue'
import user from '@/views/user.vue'
import goodsList from '@/views/goodsList.vue';
import gooddesc from '@/views/gooddesc.vue';
import addressList from '@/views/addresslist.vue';
import orderconfirm from "@/views/orderconfirm.vue";
import addAddress from "@/views/addAddress.vue";
import indexSearch from "@/views/indexSearch.vue";
import editAddress from '@/views/editAddress.vue'
import orderadd from "@/views/orderadd.vue";
import orderlist from "@/views/orderlist.vue";
import useredit from '@/views/useredit.vue'
Vue.use(VueRouter)
const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: "/login",
            component: login
        },
        {
            path: "/loginForm",
            component: loginForm
        },
        {
            path: "/smsLogin",
            component: smsLogin
        },
        {
            path: "/register",
            component: register
        },
        {
            name: 'index',
            path: "/index",
            component: index
        },
        {
            path: "/cate",
            component: cate
        },
        {
            path: "/cart",
            component: cart
        },
        {
            path: "/user",
            component: user
        },
        {
            path: '/goodsList',
            component: goodsList
        },
        {
            name: 'gooddesc',
            path: '/gooddesc',
            component: gooddesc
        },
        {
            name: 'addresslist',
            path: '/addresslist',
            component: addressList
        },
        {
            path: '/orderconfirm',
            component: orderconfirm
        },
        {
            path: "/addAddress",
            component: addAddress
        },
        {
            path: "/indexSearch",
            component: indexSearch
        },
        {
            path: "/editAddress",
            component: editAddress
        },
        {
            path: "/orderadd",
            component: orderadd
        },
        {
            path: '/orderlist',
            component: orderlist
        },
        {
            path: '/useredit',
            component: useredit
        }
    ]
})
router.beforeEach((to, from, next) => {
    if (from.path == '/cate' && to.path == '/goodsList') {
        to.meta.routerFrom = true
        // store.state.routerFrom = true
    } else {
        store.state.routerFrom = false
    }

    if (to.path == '/cart') {
        if (localStorage.getItem('token')) {
            next()
        } else {
            next('/login')
        }
    }
    if (to.path == '/orderlist') {
        if (localStorage.getItem('token')) {
            next()
        } else {
            next('/login')
        }
    }
    if (to.path == '/useredit') {
        if (localStorage.getItem('token')) {
            next()
        } else {
            next('/login')
        }
    }
    next()

})


export default router