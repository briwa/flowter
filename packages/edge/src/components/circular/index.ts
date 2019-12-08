// Constants
import { EDGE_SR_ARC_SIZE_RATIO } from '@flowter/constants'

// Mixins
import FlowterEdgeRendererMixin from '../../mixins/renderer'

/**
 * The Flowter edge's Vue class component.
 *
 * @todo: This is an experimental feature. The arc isn't
 * properly sized based on the node yet. Will be fixed soon (?)
 */
export default {
  name: 'FlowterEdgeCircular',
  mixins: [FlowterEdgeRendererMixin],
  computed: {
    /**
     * The edge's `path` points.
     */
    points () {
      const { from, to } = this.relativePosition
      const points = [{ x: from.x, y: from.y }]

      switch (this.side) {
        case 'e':
        case 'w': {
          const halfY = this.relativeHeight / 2
          const halfArcX = this.side === 'e'
            ? (this.arcRadiusX * 2) - (this.strokeWidth * 2)
            : (this.renderedWidth - (this.arcRadiusX * 2)) + (this.strokeWidth * 2)

          const halfArcY = from.y + halfY
          points.push({ x: halfArcX, y: halfArcY })
          break
        }
        case 'n':
        case 's': {
          const halfX = this.relativeWidth / 2
          const halfArcY = this.side === 's'
            ? (this.arcRadiusY * 2) - (this.strokeWidth * 2)
            : (this.renderedHeight - (this.arcRadiusY * 2)) + (this.strokeWidth * 2)

          const halfArcX = from.x + halfX
          points.push({ x: halfArcX, y: halfArcY })
          break
        }
        default: {
          throw new Error(`Unknown edge side: ${this.side}.`)
        }
      }

      points.push({ x: to.x, y: to.y })

      return points
    },

    /**
     * The edge's `path` command.
     */
    pathCommand () {
      const { from, to } = this.relativePosition
      const isSweeping = this.side === 'e' || this.side === 'n'

      return `M ${from.x} ${from.y} `
        + `A ${Math.floor(this.renderedWidth / EDGE_SR_ARC_SIZE_RATIO)} `
        + `${Math.floor(this.renderedHeight / EDGE_SR_ARC_SIZE_RATIO)} `
        + `0 1 ${Number(isSweeping)} ${to.x} ${to.y}`
    },

    /**
     * The edge's width rendered in the DOM.
     *
     * The width also accounts for the padding size, left and right.
     */
    renderedWidth () {
      switch (this.arcSide) {
        case 'v': {
          // @todo This is still incorrect. Find out the right value
          return this.relativeHeight * 3
        }
        case 'h': {
          // @todo This is still incorrect. Find out the right value
          return Math.abs(this.relativeWidth) + (this.paddingSize * 2)
        }
        default: {
          throw new Error(`Invalid arc side: ${this.arcSide}`)
        }
      }
    },

    /**
     * The edge's height rendered in the DOM.
     *
     * The height also accounts for the padding size, top and bottom.
     */
    renderedHeight () {
      switch (this.arcSide) {
        case 'v': {
          return Math.abs(this.relativeHeight) + (this.paddingSize * 2)
        }
        case 'h': {
          // @todo This is still incorrect. Find out the right value
          return this.relativeWidth / 1.25
        }
        default: {
          throw new Error(`Invalid arc side: ${this.arcSide}`)
        }
      }
    },

    /**
     * The position of the edge in the DOM.
     *
     * The only complication is the self-referential node, otherwise
     * it would be defined solely on the start and the edge of the edge.
     */
    domPosition () {
      switch (this.side) {
        case 'w': {
          const xOffset = this.renderedWidth - (this.paddingSize * 2)

          return {
            x: this.fromPosition.x - xOffset,
            y: this.fromPosition.y
          }
        }
        case 'n': {
          const yOffset = this.renderedHeight - (this.paddingSize * 2)

          return {
            x: this.fromPosition.x,
            y: this.fromPosition.y - yOffset
          }
        }
        case 's':
        case 'e': {
          return {
            x: this.fromPosition.x,
            y: this.fromPosition.y
          }
        }
        default: {
          throw new Error(`Unknown edge side: ${this.side}.`)
        }
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
        case 'e':
        case 'w': {
          style.top = `${(this.renderedHeight / 2) - this.fontSize}px`
          const delimiter = this.side === 'e'
            ? 'right' : 'left'

          style[delimiter] = `${this.paddingSize}px`

          return style
        }
        case 'n':
        case 's': {
          style.left = `${(this.renderedWidth / 2) - this.fontSize}px`
          const delimiter = this.side === 's'
            ? 'bottom' : 'top'

          style[delimiter] = `${this.paddingSize}px`

          return style
        }
        default: {
          throw new Error(`Unknown direction: ${this.direction}`)
        }
      }
    },

    /**
     * Whether the ellipse arc is shaped vertically or horizontally.
     */
    arcSide () {
      if (this.fromPosition.x === this.toPosition.x) {
        return 'v'
      }

      if (this.fromPosition.y === this.toPosition.y) {
        return 'h'
      }

      throw new Error ('Invalid circular edge position.')
    },

    /**
     * The arc horizontal radius.
     */
    arcRadiusX () {
      return Math.floor(this.renderedWidth / EDGE_SR_ARC_SIZE_RATIO)
    },

    /**
     * The arc vertical radius.
     */
    arcRadiusY () {
      return Math.floor(this.renderedHeight / EDGE_SR_ARC_SIZE_RATIO)
    }
  }
}
