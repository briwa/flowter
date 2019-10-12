// Libraries
import { Component, Mixins } from 'vue-property-decorator'

// Mixins
import FlowterNodeRendererMixin from '../../mixins/renderer'

/**
 * The Flowter node rectangle's Vue class component.
 */
@Component
export default class FlowterNodeRectangle extends Mixins(FlowterNodeRendererMixin) {
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
    return `M ${this.margin} ${this.margin} `
      + `H ${this.width - this.margin} V ${this.height - this.margin} `
      + `H ${this.margin} Z`
  }
}

