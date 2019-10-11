// Libraries
import { Component, Mixins } from 'vue-property-decorator'

// Components
import FlowterEdge from '@flowter/edge/index.vue'
import FlowterNode from '@flowter/node/index.vue'

// Mixins
import FlowterFlowchartRendererMixin from './mixins/renderer'

/**
 * The Flowter flowchart Vue class component.
 *
 * This class includes Node and Edge component
 * together with its selection component as its children.
 *
 * This component relies on the renderer mixin
 * to shape its props into a rendered flowchart.
 */
@Component({
  components: {
    FlowterEdge,
    FlowterNode
  }
})
export default class FlowterFlowchart extends Mixins(FlowterFlowchartRendererMixin) {
}
