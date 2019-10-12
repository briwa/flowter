// Libraries
import Vue from 'vue'
Vue.config.productionTip = false

// App to render
import App from './src'

// Fixtures
import simple from './__fixtures__/simple.json'

// tslint:disable-next-line
new Vue({
  render: (h) => h(App, {
    props: {
      nodes: simple.nodes,
      edges: simple.edges
    }    
  })
}).$mount('#app')
