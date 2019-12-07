// Mixins
import FlowterNodeRendererMixin from '../../mixins/renderer'

/**
 * The Flowter node rectangle's Vue class component.
 */
export default {
  name: 'FlowterNodeRectangle',
  mixins: [FlowterNodeRendererMixin],
  computed: {
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
    nodePoints () {
      return `M ${this.margin} ${this.margin} `
        + `H ${this.width - this.margin} V ${this.height - this.margin} `
        + `H ${this.margin} Z`
    }
  }
}

