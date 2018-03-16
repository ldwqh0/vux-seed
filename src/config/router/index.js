import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: () => import('@/components/module1/index')
  }, {
    path: '/p2',
    name: 'index',
    component: () => import('@/components/module2/index')
  }]
})
