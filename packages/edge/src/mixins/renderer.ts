// Libraries
import { Component, Mixins } from 'vue-property-decorator'

// Constants
import {
  MIN_EDGE_SIZE, MIN_EDGE_DETOUR_SIZE, DEFAULT_STROKE_WIDTH
} from '@flowter/constants'

// Types
import { EdgeMarker } from '@flowter/types'

// Mixins
import FlowterEdgeProps from './props'

/**
 * The Flowter edge's renderer mixin. This mixin extends the props.
 */
@Component
export default class FlowterEdgeRendererMixin extends Mixins(FlowterEdgeProps) {
  /*
   * -------------------------------
   * Properties from the edge components
   * -------------------------------
   */
  public renderedWidth!: number
  public renderedHeight!: number
  public domPosition!: { x: number, y: number }

  /*
   * -------------------------------
   * Public constants
   * -------------------------------
   */

  /**
   * Defines the stroke width of the edge.
   * @todo This should be configurable.
   */
  public readonly strokeWidth = DEFAULT_STROKE_WIDTH

  /*
   * -------------------------------
   * Private constants
   * -------------------------------
   */

  /**
   * The minimum size allowed for an edge.
   */
  private readonly minSize = MIN_EDGE_SIZE

  /**
   * The size allocated to render the edge detour.
   */
  private readonly detourSize = MIN_EDGE_DETOUR_SIZE

  /*
   * -------------------------------
   * Public accessor/computed
   * -------------------------------
   */

  /**
   * Whether the arrow marker is rendered at the start of the `path`.
   */
  public get markerStart () {
    switch (this.marker) {
      case EdgeMarker.BOTH: return `url(#${this.arrowId})`
      default: return null
    }
  }

  /**
   * Whether the arrow marker is rendered at the end of the `path`.
   */
  public get markerEnd () {
    switch (this.marker) {
      case EdgeMarker.END:
      case EdgeMarker.BOTH: return `url(#${this.arrowId})`
      default: return null
    }
  }

  /**
   * Defines the `shapeRendering` property in the `path`.
   *
   * It is only needed for certain types of edges.
   */
  public get shapeRendering () {
    return null
  }

  /**
   * Defines the unique arrow marker id.
   */
  public get arrowId () {
    return `${this.namespace ? this.namespace + '-' : ''}`
      + `arrow-${this.from}-${this.to}`
  }

  /**
   * The edge's padding size.
   *
   * For edges that go backward, it adds an extra padding from
   * the [[detourSize]] so that the detour won't be rendered
   * near the edge of the container.
   */
  public get paddingSize () {
    switch (this.direction) {
      case 's':
      case 'e': {
        return this.minSize
      }
      case 'n':
      case 'w': {
        return (this.minSize + this.detourSize)
      }
      default: throw new Error(`Unknown direction: ${this.direction}`)
    }
  }

  /**
   * The width relative to the start and the end of the edge.
   */
  public get relativeWidth () {
    return this.toPosition.x - this.fromPosition.x
  }

  /**
   * The height relative to the start and the end of the edge.
   */
  public get relativeHeight () {
    return this.toPosition.y - this.fromPosition.y
  }

  /**
   * The edge's CSS style.
   *
   * This defines the position and the size of the edge in the DOM.
   * The position relies on the nodes' from and to position. This
   * also accounts for the padding which is needed so that it won't
   * be rendered right at the edge of the container.
   */
  public get containerStyle () {
    return {
      width: `${this.renderedWidth}px`,
      height: `${this.renderedHeight}px`,
      top: `${this.domPosition.y - this.paddingSize}px`,
      left: `${this.domPosition.x - this.paddingSize}px`,
      fontSize: `${this.fontSize}px`
    }
  }

  /**
   * Defines the `viewBox` property of the SVG.
   *
   * Based on the edge's container size itself.
   */
  public get viewBox () {
    return `0 0 ${this.renderedWidth} ${this.renderedHeight}`
  }

  /**
   * Relative position of the start and end in the SVG.
   *
   * It is determined by the actual position of the nodes
   * relative to the SVG position in the DOM
   */
  public get relativePosition () {
    return {
      from: {
        x: this.fromPosition.x - this.domPosition.x + this.paddingSize,
        y: this.fromPosition.y - this.domPosition.y + this.paddingSize
      },
      to: {
        x: this.toPosition.x - this.domPosition.x + this.paddingSize,
        y: this.toPosition.y - this.domPosition.y + this.paddingSize
      }
    }
  }
}
