import Vue from 'vue'

import VueRouter from 'vue-router'
// 注册路由
Vue.use(VueRouter)

const Good = ()=>import('./pages/Good.vue')
const Home = ()=>import('./pages/Home.vue')
const Login = ()=>import('./pages/Login.vue')
const Banner = ()=>import('./pages/Banner.vue')

// 创建路由实例
let router = new VueRouter({
    mode : 'hash',
    routes : [
        
        {
            path : '/3',
            component : Good
        },
        {
            path : '/6',
            component : Banner
        },
        {
            path : '/1-1',
            component : Home
        },
        {
            path : '/login',
            components : {login : Login}
        },
        {
            path : '/',
            component : Home
        },
        {
            path : '*',
            redirect : '/'
        }
    ]
})


// 抛出路由
export default router

router.beforeEach((to,from,next)=>{
    console.log(to,from)
    if(to.path =='/1-1' || to.path=='/'){
        if(localStorage.getItem('token')){
            next()
        }else{
            next('/login')
        }
    }else{
        next()
    }
})