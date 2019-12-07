import VueRouter from 'vue-router'
import Home from '@/components/home'

const routes = [
  { path: '/', name: 'home', component: Home },
]

export default new VueRouter({
  linkExactActiveClass: 'is-active',
  routes
})