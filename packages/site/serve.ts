// Libraries
import Vue from 'vue'
Vue.config.productionTip = false

// App to render
import App from './src'

// tslint:disable-next-line
new Vue({
  render: (h) => h(App)
}).$mount('#app')
