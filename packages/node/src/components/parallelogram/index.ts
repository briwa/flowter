// Libraries
import { Component, Mixins } from 'vue-property-decorator'

// Mixins
import FlowterNodeRendererMixin from '../../mixins/renderer'
import { NODE_SMALLER_RATIO } from '@flowter/constants'

/**
 * The Flowter node paralellogram's Vue class component.
 */
@Component
export default class FlowterNodeParallelogram extends Mixins(FlowterNodeRendererMixin) {
  /*
   * -------------------------------
   * Public accessor/computed
   * -------------------------------
   */

  /**
   * The node's symbol as the SVG `path`.
   *
   * This is derived from [[RenderedGraphNode.symbol]] value.
   */
  public get nodePoints () {
    // This symbol is a little smaller
    // than the actual node width.
    const offset = NODE_SMALLER_RATIO * this.width

    // Parallelogram is basically rectangle
    // with added offset for start and the finish
    return `M ${this.margin + offset} ${this.margin} `
      + `H ${this.width - this.margin} L ${this.width - (this.margin + offset)} ${this.height - this.margin} `
      + `H ${this.margin} Z`
  }
}

