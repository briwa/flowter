// Styles
import '@flowter/node/dist/@flowter/node.css'
import '@flowter/edge/dist/@flowter/edge.css'

// Components
// TODO: Strict mode won't allow these components to be imported without types.
// Using require as a workaround but a proper fix is needed.
const FlowterEdge = require('@flowter/edge')
const FlowterNode = require('@flowter/node')

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
export default  {
  name: 'FlowterFlowchart',
  mixins: [FlowterFlowchartRendererMixin],
  components: {
    FlowterEdge,
    FlowterNode
  }
}
