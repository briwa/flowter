// Libraries
import Vue from 'vue'
Vue.config.productionTip = false

// App to render
import App from './src'

// Types
import { EdgeMarker, EdgeType } from '@flowter/types'
import { DEFAULT_FONT_SIZE, DEFAULT_STROKE_COLOR } from '@flowter/constants'

// tslint:disable-next-line
new Vue({
  render: (h) => h(App, {
    props: {
      /**
       * The identifier of the from point.
       */
      from: 'a',

      /**
       * The identifier of the from point.
       */
      to: 'b',

      /**
       * The point of where the edge is from.
       */
      fromPosition: { x: 0, y: 50 },

      /**
       * The point of where the edge is to.
       */
      toPosition: { x: 100, y: 50 },

      /**
       * The direction of the edge.
       * Follows the cardinal direction.
       */
      direction: 's',

      /**
       * Whether the edge is rendered on one side or the other.
       */
      side: 'w',

      /**
       * Whether the edge is circular or not.
       * This is only an edge case when the edge happens to connect to itself.
       */
      isCircular: false,

      /**
       * The edge text's font size.
       * This would either have its own size, or derived from the flowchart's.
       */
      fontSize: DEFAULT_FONT_SIZE,

      /**
       * The text of the edge (optional).
       */
      text: 'I am an edge',

      /**
       * The side of the marker that will be rendered (optional).
       */
      marker: EdgeMarker.END,

      /**
       * The type of the edge being rendered (optional).
       */
      type: EdgeType.BENT,

      /**
       * The color of the edge (optional).
       */
      color: DEFAULT_STROKE_COLOR,

      /**
       * The namespace to be appended for the ids (optional).
       * Only when there are identical ids and this is to avoid conflict.
       */
      namespace: '',
    }
  })
}).$mount('#app')
