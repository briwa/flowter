// Mixins
import FlowterNodeRendererMixin from '../../mixins/renderer'

/**
 * The Flowter node rhombus's Vue class component.
 */
export default {
  name: 'FlowterNodeRhombus',
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
      return `M ${this.halfWidth} ${this.margin} `
        + `L ${this.width - this.margin} ${this.halfHeight} `
        + `L ${this.halfWidth} ${this.height - this.margin} `
        + `L ${this.margin} ${this.halfHeight} Z`
    }
  }
}



