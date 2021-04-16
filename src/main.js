import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import fastClick from 'fastclick'
import lazyload from 'vue-lazyload'

Vue.config.productionTip = false
Vue.prototype.$bus= new Vue({})  //new一个vue实例，作为事件总线

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(lazyload,{
  loading:require('./assets/img/common/placeholder.png')
})
// fastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,store
}).$mount('#app')
