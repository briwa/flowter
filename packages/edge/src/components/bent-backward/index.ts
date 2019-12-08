// Mixins
import FlowterEdgeRendererMixin from '../../mixins/renderer'

/**
 * The Flowter edge's Vue class component.
 */
export default {
  name: 'FlowterEdgeBentBackward',
  mixins: [FlowterEdgeRendererMixin],
  computed: {
    /**
     * The edge's `path` points.
     */
    points () {
      const { from, to } = this.relativePosition
      const points = [{ x: from.x, y: from.y }]

      switch (this.direction) {
        case 'n': {
          // To simplify the calc, always assume
          // that the edges go from left to right.
          // For edges that go right to left, we'll just inverse it.
          // This is determined from where the endpoint is in the flowchart.
          const isEdgeRightSide = this.side === 'e'

          // The detour value depends on whether
          // the node is going right to left or left to right
          const detourSize = this.paddingSize / 2
          const relativeDetourSize = isEdgeRightSide
            ? detourSize : -detourSize

          // Two types of backward edge;
          // - they move horizontally then vertically (because the target is at ne)
          // - they move vertically then horizontally (because the target is at sw)
          // Inverse the start/end for nodes going right to left
          const isEdgeGoingHV = isEdgeRightSide
            ? from.x > to.x : to.x > from.x

          // If they go horizontally then vertically (HV),
          // they just need to make a little detour before going vertical
          // Otherwise, go all the way till the end point
          const middlePointX = isEdgeGoingHV
            ? from.x + relativeDetourSize : to.x + relativeDetourSize

          points.push(
            { x: middlePointX, y: from.y },
            { x: middlePointX, y: to.y },
            { x: to.x, y: to.y }
          )

          return points
        }
        case 'w': {
          // To simplify the calc, always assume
          // that the edges go from top to bottom.
          // For edges that go bottom to top, we'll just inverse it.
          // This is determined from where the endpoint is in the flowchart.
          const isEdgeBottomSide = this.side === 's'

          // The detour value depends on whether
          // the node is going bottom to top or top to bottom
          const detourSize = this.paddingSize / 2
          const relativeDetourSize = isEdgeBottomSide
            ? detourSize : -detourSize

          // Two types of backward edge;
          // - they move vertically then horizontally (because the target is at se)
          // - they move horizontally then vertically (because the target is at nw)
          const isEdgeGoingVH = isEdgeBottomSide
            ? from.y > to.y : to.y > from.y

          // If they go horizontally then vertically (HV),
          // they just need to make a little detour before going vertical
          // Otherwise, go all the way till the end point
          const middlePointY = isEdgeGoingVH
            ? from.y + relativeDetourSize : to.y + relativeDetourSize

          points.push(
            { x: from.x, y: middlePointY },
            { x: to.x, y: middlePointY },
            { x: to.x, y: to.y }
          )

          return points
        }
        default: {
          throw new Error(`Invalid direction for bent-forward edge: ${this.direction}`)
        }
      }
    },

    /**
     * The edge's `path` command.
     */
    pathCommand () {
      return this.points.reduce((command, point, index) => {
        const prevPoint = this.points[index - 1]
        const separator = index < this.points.length - 1 ? ' ' : ''

        if (!prevPoint) {
          return command + `M ${point.x} ${point.y}${separator}`
        }

        if (prevPoint.x === point.x) {
          return command + `V ${point.y}${separator}`
        }

        if (prevPoint.y === point.y) {
          return command + `H ${point.x}${separator}`
        }

        throw new Error(`Invalid point: ${point}`)
      }, '')
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
        case 'n': {
          style.top = `${(this.renderedHeight / 2) - (this.fontSize * 1.5)}px`
          const delimiter = this.side === 'e'
            ? 'right' : 'left'

          style[delimiter] = `${this.paddingSize}px`

          return style
        }
        case 'w': {
          style.left = `${(this.renderedWidth / 2) - (this.fontSize * 1.5)}px`
          const delimiter = this.side === 's'
            ? 'bottom' : 'top'

          style[delimiter] = `${this.paddingSize}px`

          return style
        }
        default: {
          throw new Error(`Unknown direction: ${this.direction}`)
        }
      }
    }
  }
}
