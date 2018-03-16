import Vue from 'vue'
import FastClick from 'fastclick'

import router from './config/router'
import App from './App'
import store from './vuex'
import './config/http'

console.log('Create by ldwqh0@outlook.com')
FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
