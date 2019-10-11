// Libraries
import { Component,  Mixins } from 'vue-property-decorator'

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
@Component({
  components: {
    FlowterNodeEllipse,
    FlowterNodeParallelogram,
    FlowterNodeRectangle,
    FlowterNodeRhombus,
    FlowterNodeRoundedRectangle
  }
})
export default class FlowterNodeBase extends Mixins(FlowterNodePropsMixin) {
  /*
   * -------------------------------
   * Public accessor/computed
   * -------------------------------
   */

  /**
   * The node component name based on the symbol
   */
  public get componentName () {
    return `flowter-node-${this.symbol}`
  }
}
