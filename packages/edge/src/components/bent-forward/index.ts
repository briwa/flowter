// Libraries
import { Component, Mixins } from 'vue-property-decorator'

// Mixins
import FlowterEdgeRendererMixin from '../../mixins/renderer'

/**
 * The Flowter edge's Vue class component.
 */
@Component
export default class FlowterEdgeBentForward extends Mixins(FlowterEdgeRendererMixin) {
  /*
   * -------------------------------
   * Public accessor/computed
   * -------------------------------
   */

  /**
   * The edge's `path` points.
   */
  public get points () {
    const { from, to } = this.relativePosition
    const points = [{ x: from.x, y: from.y }]

    switch (this.direction) {
      case 's': {
        const halfLength = (to.y + this.paddingSize) * 0.5
        points.push(
          { x: from.x, y: halfLength },
          { x: to.x, y: halfLength },
          { x: to.x, y: to.y }
        )

        return points
      }
      case 'e': {
        const halfLength = (to.x + this.paddingSize) * 0.5
        points.push(
          { x: halfLength, y: from.y },
          { x: halfLength, y: to.y },
          { x: to.x, y: to.y }
        )

        return points
      }
      default: {
        throw new Error(`Invalid direction for bent-forward edge: ${this.direction}`)
      }
    }
  }

  /**
   * The edge's `path` command.
   */
  public get pathCommand () {
    return this.points.reduce((command, point, index) => {
      const prevPoint = this.points[index - 1]
      const separator = index < this.points.length - 1
        ? ' ' : ''

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
  }

  /**
   * The edge's width rendered in the DOM.
   *
   * The width also accounts for the padding size, left and right.
   */
  public get renderedWidth () {
    return Math.abs(this.relativeWidth) + (this.paddingSize * 2)
  }

  /**
   * The edge's height rendered in the DOM.
   *
   * The height also accounts for the padding size, top and bottom.
   */
  public get renderedHeight () {
    return Math.abs(this.relativeHeight) + (this.paddingSize * 2)
  }

  /**
   * The position of the edge in the DOM.
   *
   * The only complication is the self-referential node, otherwise
   * it would be defined solely on the start and the edge of the edge.
   */
  public get domPosition () {
    return {
      x: Math.min(this.fromPosition.x, this.toPosition.x),
      y: Math.min(this.fromPosition.y, this.toPosition.y)
    }
  }

  /**
   * The styling for the edge's text.
   *
   * It should be at least at the center of the edge.
   */
  public get textStyle (): Record<string, string> {
    const style: Record<string, string> = {}

    switch (this.direction) {
      case 's': {
        style.top = `${(this.renderedHeight / 2) - (this.fontSize * 1.5)}px`
        const delimiter = this.relativeWidth > 0
          ? 'right' : 'left'

        style[delimiter] = `${this.paddingSize}px`

        return style
      }
      case 'e': {
        style.left = `${(this.renderedWidth / 2) - (this.fontSize * 1.5)}px`
        const delimiter = this.relativeHeight > 0
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
