// Libraries
import { Prop, Component, Vue } from 'vue-property-decorator'

// Constants
import { DEFAULT_STROKE_COLOR } from '@flowter/constants'

// Types
import {
  EdgeType, EdgeMarker, Direction
} from '@flowter/types'

/**
 * The Flowter edge's base mixin.
 * This is shared across all edge shapes.
 */
@Component
export default class FlowterEdgePropsMixin extends Vue {
  /*
   * -------------------------------
   * Props
   * -------------------------------
   */

  /**
   * The identifier of the from point.
   */
  @Prop({ type: String, required: true })
  public from!: string

  /**
   * The identifier of the from point.
   */
  @Prop({ type: String, required: true })
  public to!: string

  /**
   * The point of where the edge is from.
   */
  @Prop({ type: Object, required: true })
  public fromPosition!: { x: number, y: number }

  /**
   * The point of where the edge is to.
   */
  @Prop({ type: Object, required: true })
  public toPosition!: { x: number, y: number }

  /**
   * The direction of the edge.
   * Follows the cardinal direction.
   */
  @Prop({ type: String, required: true })
  public direction!: Direction

  /**
   * Whether the edge is rendered on one side or the other.
   */
  @Prop({ type: String, required: true })
  public side!: Direction

  /**
   * Whether the edge is circular or not.
   * This is only an edge case when the edge happens to connect to itself.
   */
  @Prop({ type: Boolean, required: true })
  public isCircular!: Direction

  /**
   * The edge text's font size.
   * This would either have its own size, or derived from the flowchart's.
   */
  @Prop({ type: Number, required: true })
  public fontSize!: number

  /**
   * The text of the edge (optional).
   */
  @Prop({ type: String, default: '' })
  public text!: string

  /**
   * The side of the marker that will be rendered (optional).
   */
  @Prop({ type: String, default: EdgeMarker.END })
  public marker!: EdgeMarker

  /**
   * The type of the edge being rendered (optional).
   */
  @Prop({ type: String, default: EdgeType.BENT })
  public type!: EdgeType

  /**
   * The color of the edge (optional).
   */
  @Prop({ type: String, default: DEFAULT_STROKE_COLOR })
  public color!: string

  /**
   * The namespace to be appended for the ids (optional).
   * Only when there are identical ids and this is to avoid conflict.
   */
  @Prop({ type: String, default: '' })
  public namespace!: string
}
