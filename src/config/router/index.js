import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: CONTEXT_PATH,
  mode: 'history',
  routes: [{
    path: '/',
    name: 'index',
    component: () => import('@/components/module1/index')
  }, {
    path: '/p2',
    name: 'module2',
    component: () => import('@/components/module2/index')
  }]
})
