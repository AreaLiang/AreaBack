import Vue from 'vue'
import App from './App.vue'

//引入axios
import axios from 'axios'
Vue.prototype.axios=axios

//引入router
import VueRouter from 'vue-router'
import router from '@/router'
Vue.use(VueRouter)

//引用 element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router:router
}).$mount('#app')
