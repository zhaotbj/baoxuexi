import Vue from 'vue'
import App from './App.vue'
import './assets/css/public.css'
import './assets/css/common.css'

import router from './router'
import store from './store'
import 'plyr/dist/plyr.css';
// import VuePlyr from 'vue-plyr'
// import 'plyr/dist/plyr.css'
// Vue.use(VuePlyr, {
//   plyr: {
//     fullscreen: { enabled: false }
//   },
//   emit: ['ended']
// })
Vue.config.productionTip = false
import { post,fetch}  from "./assets/js/http";
import HeaderCom from '@/components/Header.vue';

Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;

Vue.component('atgHeader',HeaderCom)



router.beforeEach((to, from, next) => {
  next()
  // if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
  //   if (localStorage.getItem('shop_user')) {// 判断是否登录
  //     next()
  //   } else {// 没登录则跳转到登录界面
  //     next({
  //       path: '/register'
  //     })
  //   }
  // } else {
  //   next()
  // }



})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')




