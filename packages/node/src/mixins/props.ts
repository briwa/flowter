// Libraries
import { Prop, Component, Vue } from 'vue-property-decorator'

// Types
import {
  NodeSymbol
} from '@flowter/types'

/**
 * The Flowter node's base mixin.
 * This is shared across all node types.
 */
@Component
export default class FlowterNodePropsMixin extends Vue {
  /*
   * -------------------------------
   * Props
   * -------------------------------
   */

  /**
   * Id of the node.
   *
   * This is mainly used as an identifier
   * when sending out events to the parent.
   */
  @Prop({ type: String, required: true })
  public id!: string

  /**
   * The x position of the node.
   */
  @Prop({ type: Number, required: true })
  public x!: number

  /**
   * The y position of the node.
   */
  @Prop({ type: Number, required: true })
  public y!: number

  /**
   * The width of the node.
   */
  @Prop({ type: Number, required: true })
  public width!: number

  /**
   * The height of the node.
   */
  @Prop({ type: Number, required: true })
  public height!: number

  /**
   * Node symbol.
   */
  @Prop({ type: String, required: true })
  public symbol!: NodeSymbol

  /**
   * Node background color.
   */
  @Prop({ type: String, required: true })
  public bgcolor!: string

  /**
   * Node's text.
   */
  @Prop({ type: String, required: true })
  public text!: string

  /**
   * Node's font size.
   */
  @Prop({ type: Number, required: true })
  public fontSize!: number
}
