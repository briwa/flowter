// Mixins
import FlowterNodeRendererMixin from '../../mixins/renderer'
import { NODE_SMALLER_RATIO } from '@flowter/constants'

/**
 * The Flowter node rounded rectangle's Vue class component.
 */
export default {
  name: 'FlowterNodeRoundedRectangle',
  mixins: [FlowterNodeRendererMixin],
  computed: {
    /**
     * The node's symbol as the SVG `path`.
     *
     * This is derived from [[RenderedGraphNode.symbol]] value.
     */
    nodePoints () {
      // This symbol is a little smaller
      // than the actual node width.
      const offset = NODE_SMALLER_RATIO * this.width

      // The start of a rounded rectangle is going to have
      // the same offset as parallelogram. The arc
      // x radius will be the offset.
      const startArcX = this.margin + offset
      const endArcX = this.width - startArcX

      const rX = startArcX
      const rY = this.halfHeight
      return `M ${startArcX} ${this.margin} `
        + `H ${endArcX} `
        + `A ${rX} ${rY} 0 0 1 ${endArcX} ${this.height - this.margin} `
        + `H ${startArcX} `
        + `A ${rX} ${rY} 0 0 1 ${startArcX} ${this.margin} Z`
    }
  }
}

