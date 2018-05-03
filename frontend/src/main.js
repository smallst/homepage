// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Snotify, {SnotifyPosition} from 'vue-snotify';
import 'vue-snotify/styles/simple.css';
// import VueKatex from 'vue-katex'

// import axios from 'axios'
import utils from '@/utils'
// window.axios=axios;
global.utils = utils;

// Vue.use(VueKatex)
const notifyOptions = {
    toast:{
        position: SnotifyPosition.rightTop,
        showProgressBar: false
    }
}
Vue.use(Snotify,notifyOptions)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
