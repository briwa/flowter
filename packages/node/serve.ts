// Libraries
import Vue from 'vue'
Vue.config.productionTip = false

// App to render
import App from './src'

// Types
import { NodeSymbol } from '@flowter/types'
import { DEFAULT_FONT_SIZE } from '@flowter/constants'

// tslint:disable-next-line
new Vue({
  render: (h) => h(App, {
    props: {
      /**
       * Id of the node.
       *
       * This is mainly used as an identifier
       * when sending out events to the parent.
       */
      id: 'flowter-node',
    
      /**
       * The x position of the node.
       */
      x: 0,
    
      /**
       * The y position of the node.
       */
      y: 0,
    
      /**
       * The width of the node.
       */
      width: 100,
    
      /**
       * The height of the node.
       */
      height: 100,
    
      /**
       * Node symbol.
       */
      symbol: NodeSymbol.RECTANGLE,
    
      /**
       * Node background color.
       */
      bgcolor: '#ffffff',
    
      /**
       * Node's text.
       */
      text: 'I am a node',
    
      /**
       * Node's font size.
       */
      fontSize: DEFAULT_FONT_SIZE
    }    
  })
}).$mount('#app')
