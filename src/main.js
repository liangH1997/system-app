import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI, { size: 'small', zIndex: 3000 });

Vue.config.productionTip = false

// 引入
import router from './router'
import store from '@/store/index.js'
import api from '@/utils/api.js'

Vue.prototype.$api = api

new Vue({
  // 挂载路由
  router,
  store,
  render: h => h(App),
}).$mount('#app')
