// Libraries
import { Component, Mixins } from 'vue-property-decorator'

// Constants
import {
   DEFAULT_STROKE_WIDTH
} from '@flowter/constants'

// Mixins
import FlowterNodeProps from './props'

/**
 * The Flowter node's renderer mixin. This mixin extends the props.
 */
@Component
export default class FlowterNodeRendererMixin extends Mixins(FlowterNodeProps) {
  /*
   * -------------------------------
   * Public constants
   * -------------------------------
   */

  /**
   * The margin to account for the stroke width.
   *
   * This is to make the node always renders inside the
   * container, regardless of the stroke width.
   */
  public readonly margin = DEFAULT_STROKE_WIDTH / 2

  /**
   * The default stroke width.
   * @todo This should be configurable.
   */
  public readonly strokeWidth = DEFAULT_STROKE_WIDTH

  /*
   * -------------------------------
   * Public accessor/computed
   * -------------------------------
   */

  /**
   * The node's CSS style.
   */
  public get nodeStyle (): Record<string, string> {
    return {
      width: `${this.width}px`,
      height: `${this.height}px`,
      fontSize: `${this.fontSize}px`,
      lineHeight: `${this.height - (this.fontSize / 2)}px`,
      top: `${this.y}px`,
      left: `${this.x}px`
    }
  }

  /**
   * The node's svg viewbox.
   *
   * This is solely based on node's [[width]] and [[height]].
   */
  public get viewBox (): string {
    return `0 0 ${this.width} ${this.height}`
  }

  /**
   * Half of the node's width.
   */
  public get halfWidth () {
    return this.width / 2
  }

  /**
   * Half of the node's height.
   */
  public get halfHeight () {
    return this.height / 2
  }

  /**
   * The center of the node, with margin taken into account.
   */
  public get nodeCenter () {
    return {
      x: (this.halfWidth) - this.margin,
      y: (this.halfHeight) - this.margin
    }
  }
}
