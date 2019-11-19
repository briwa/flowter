// Libraries
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueHighlightJS from 'vue-highlight.js'
import 'highlight.js/styles/vs2015.css'

// Router
import router from './src/router'

// Highlight.js languages (Only required languages)
const css = require('highlight.js/lib/languages/css')
const javascript = require('highlight.js/lib/languages/javascript')
const vue = require('vue-highlight.js/lib/languages/vue')

Vue.use(VueHighlightJS, {
  languages: { css, javascript, vue }
})
Vue.config.productionTip = false
Vue.use(VueRouter)

// App to render
import App from './src'

// tslint:disable-next-line
new Vue({
  render: (h) => h(App),
  router
}).$mount('#app')
