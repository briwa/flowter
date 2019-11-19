import VueRouter from 'vue-router'
import Home from '@/components/home'
import Api from '@/components/api'
import Examples from '@/components/examples'

const routes = [
  { path: '/', alias: ['/home', '/getting-started'], name: 'home', component: Home },
  { path: '/api', name: 'api', component: Api },
  { path: '/examples', name: 'examples', component: Examples }
]

export default new VueRouter({
  linkExactActiveClass: 'is-active',
  routes
})