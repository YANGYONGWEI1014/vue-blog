// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from './App'
import Routes from './routes'
import axios from 'axios'

//富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式　
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// axios.defaults.headers.common['token']="53814a64daaf5a02620e889fff19eb86"
axios.defaults.headers.get["Content-type"]="application/json"
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(VueRouter)

//富文本编辑器
Vue.use(VueQuillEditor)

//全局随机色
Vue.directive("rainbow",{
    bind(el,bind,vnode){
      el.style.color = '#' + Math.random().toString(16).slice(2,8);//随机颜色
    }
})
//创建路由
const router = new VueRouter({
  routes: Routes,
  mode: "history",　//用于去掉引号

  // scrollBehavior(to, from, sacedPosition) { 显示位置
  //   return { x: 0, y: 100 }//x轴为0 y轴为100
  // }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router: router
})
