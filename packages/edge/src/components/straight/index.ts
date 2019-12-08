// Mixins
import FlowterEdgeRendererMixin from '../../mixins/renderer'

/**
 * The Flowter edge's Vue class component.
 */
export default {
  name: 'FlowterEdgeStraight',
  mixins: [FlowterEdgeRendererMixin],
  computed: {
    /**
     * The edge's `path` points.
     */
    points () {
      const { from, to } = this.relativePosition

      return [
        { x: from.x, y: from.y },
        { x: to.x, y: to.y }
      ]
    },

    /**
     * The edge's `path` command.
     */
    pathCommand () {
      const { from, to } = this.relativePosition

      return `M ${from.x} ${from.y} L ${to.x} ${to.y}`
    },

    /**
     * The edge's width rendered in the DOM.
     *
     * The width also accounts for the padding size, left and right.
     */
    renderedWidth () {
      return Math.abs(this.relativeWidth) + (this.paddingSize * 2)
    },

    /**
     * The edge's height rendered in the DOM.
     *
     * The height also accounts for the padding size, top and bottom.
     */
    renderedHeight () {
      return Math.abs(this.relativeHeight) + (this.paddingSize * 2)
    },

    /**
     * The position of the edge in the DOM.
     *
     * The only complication is the self-referential node, otherwise
     * it would be defined solely on the start and the edge of the edge.
     */
    domPosition () {
      return {
        x: Math.min(this.fromPosition.x, this.toPosition.x),
        y: Math.min(this.fromPosition.y, this.toPosition.y)
      }
    },

    /**
     * The styling for the edge's text.
     *
     * It should be at least at the center of the edge.
     */
    textStyle (): Record<string, string> {
      const style: Record<string, string> = {}

      switch (this.direction) {
        case 'n':
        case 's': {
          style.top = `${(this.renderedHeight / 2) - (this.fontSize * 1.5)}px`
          style.left = `${this.paddingSize}px`

          return style
        }
        case 'e':
        case 'w': {
          style.left = `${(this.renderedWidth / 2) - (this.fontSize * 1.5)}px`
          style.top = `${this.paddingSize}px`

          return style
        }
        default: {
          throw new Error(`Unknown direction: ${this.direction}`)
        }
      }
    }
  }
}
