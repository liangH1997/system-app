import fetch from './fetch'

// 注册账号
export function register(data){
    return fetch({
        url : '/user/regist',
        method : 'POST',
        data : data
    })
}

// 登录
export function toLogin(data){
    return fetch({
        url : '/user/login',
        method : 'POST',
        data : data
    })
}

// 添加商品
export function addGood(data){
    return fetch({
        url:'/jd/addGood',
        method:'POST',
        data
    })
}

// 获取推荐商品列表
export function getList(params){
    return fetch({
        url : '/jd/getHotGoodList',
        method : 'GET',
        params : params
    })
}

// 获取商品详情
export function getGoodDesc(params){
    return fetch({
        url : '/jd/getGoodDetail',
        method : 'GET',
        params
    })
}

// 添加到购物车
export function addCartList(data){
    return fetch({
        url : '/jd/addToCart',
        method : 'POST',
        data
    })
}


// 获取购物车列表
export function getCartList(params){
    return fetch({
        url : '/jd/getCartList',
        method : 'GET',
        params
    })
}

// 更改购物车商品数量

export function upDateCart(data){
    return fetch({
        url : '/jd/updateCartNum',
        method : 'POST',
        data
    })
}

// 删除购物车商品

export function deleteCart(params){
    return fetch({
        url : '/jd/delGood',
        method : 'GET',
        params
    })
}

// 提交订单
export function submitCart(data){
    return fetch({
        url : '/jd/submitToCart',
        method : 'POST',
        data
    })
}

// 获取所有品类
export function getAllCates(params){
    return fetch({
        url : '/jd/getAllCates',
        method : 'GET',
        params
    })
}

// 获取对应品类商品列表
export function getCateGoods(params){
    return fetch({
        url : '/jd/getCateGoodList',
        method : 'GET',
        params
    })
}

// 添加banner
export function addBanner(data){
    return fetch({
        url : '/jd/ad',
        method : 'POST',
        data
    })
}
// 获取banner
export function getBanner(params){
    return fetch({
        url : '/jd/getAd',
        method : 'GET',
        params
    })
}

// 删除banner
export function delBanner(params){
    return fetch({
        url : '/jd/delAd',
        method : 'GET',
        params
    })
}

// 修改banner
export function updateBanner(data){
    return fetch({
        url : '/jd/updateAd',
        method : 'POST',
        data
    })
}

// 获取用户信息
export function getInfo(params){
    return fetch({
        url : '/user/getInfo',
        method : 'GET',
        params
    })
}

export default {
    register,
    toLogin,
    addGood,
    getList,
    getGoodDesc,
    addCartList,
    getCartList,
    upDateCart,
    deleteCart,
    submitCart,
    getAllCates,
    getCateGoods,
    addBanner,
    getBanner,
    getInfo,
    delBanner,
    updateBanner
}