// Components
import FlowterNodeEllipse from './components/ellipse'
import FlowterNodeParallelogram from './components/parallelogram'
import FlowterNodeRectangle from './components/rectangle'
import FlowterNodeRhombus from './components/rhombus'
import FlowterNodeRoundedRectangle from './components/rounded-rectangle'

// Mixins
import FlowterNodePropsMixin from './mixins/props'

/**
 * The Flowter node's base component.
 * This holds all the node symbols' components.
 */
export default {
  name: 'FlowterNodeBase',
  mixins: [FlowterNodePropsMixin],
  components: {
    FlowterNodeEllipse,
    FlowterNodeParallelogram,
    FlowterNodeRectangle,
    FlowterNodeRhombus,
    FlowterNodeRoundedRectangle
  },
  computed: {
    componentName (): string {
      return `flowter-node-${this.symbol}`
    }
  }
}
