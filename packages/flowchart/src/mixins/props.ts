// Libraries
import { Prop, Component, Vue } from 'vue-property-decorator'

// Constants
import {
  DEFAULT_NODE_WIDTH,
  DEFAULT_NODE_HEIGHT,
  DEFAULT_NODE_ROW_SPACING,
  DEFAULT_NODE_COL_SPACING,
  DEFAULT_WIDTH_MARGIN,
  DEFAULT_HEIGHT_MARGIN,
  DEFAULT_FONT_SIZE
} from '@flowter/constants'

// Types
import {
  Mode, GraphNode, GraphEdge
} from '@flowter/types'

/**
 * The Flowter flowchart props mixins.
 *
 * This class holds all the informations about what is needed
 * for the flowchart to be rendered.
 */
@Component
export default class FlowterFlowchartRendererMixin extends Vue {
  /*
   * -------------------------------
   * Props
   * -------------------------------
   */

  /**
   * Nodes to be rendered.
   *
   * The key of the nodes dictionary corresponds to
   * the node id, which means the id has to be unique.
   *
   * The bare minimum of a node is that it has to have a `text`
   * property in it. If the optional values are not set, it will
   * be set to default values. See [[GraphNode]] for more details
   * on what are the configurable optionals.
   *
   * Note that nodes has to connect to another note
   * in order to be rendered. See [[nodeLists]] for more details.
   */
  @Prop({ type: Object, required: true })
  public nodes!: Record<string, GraphNode>

  /**
   * Edges that connect the nodes.
   *
   * The bare minimum of an edge is that it has to have a `from`
   * and `to` properties in it. If the optional values are not set,
   * it will be set to default values. See [[GraphEdge]] for more
   * details on what are the configurable optionals.
   *
   * Note that the edges are in an array, which means
   * _the order of the edges matter_. The shape of the
   * whole flowchart is going to be determined by how
   * the edges are connected based on the order. See [[orderedNodes]]
   * for more details.
   *
   * The edges support different types of connection
   * between nodes:
   * 1. Different node rows, going forward
   * 2. Different node rows, going backward
   * 3. Same node rows
   * 4. Same node
   *
   * Each of these types of connection will be rendered
   * differently. See [[FlowterEdge.edgePoints]] for more details.
   */
  @Prop({ type: Array, required: true })
  public edges!: GraphEdge[]

  /**
   * How the flowchart is being rendered (optional).
   *
   * By default, the flowchart is rendered vertically
   * ([[Mode.VERTICAL]]).
   *
   * See [[Mode]] for the supported modes.
   */
  @Prop({ type: String, default: Mode.VERTICAL })
  public mode!: Mode

  /**
   * The default width of all nodes, if not specified in [[nodes]] (optional).
   *
   * If not specified, the value is set to [[DEFAULT_NODE_WIDTH]].
   */
  @Prop({ type: Number, default: DEFAULT_NODE_WIDTH })
  public nodeWidth!: number

  /**
   * The default height of all nodes, if not specified in [[nodes]] (optional).
   *
   * If not specified, the value is set to [[DEFAULT_NODE_HEIGHT]].
   */
  @Prop({ type: Number, default: DEFAULT_NODE_HEIGHT })
  public nodeHeight!: number

  /**
   * The row spacing between nodes (optional).
   *
   * Note that if the nodes have its own `x` or `y`,
   * the spacing is ignored. See [[shapeNodesVertically]] or
   * [[shapeNodesHorizontally]] for more details.
   *
   * If not specified, the value is set to [[DEFAULT_NODE_ROW_SPACING]].
   */
  @Prop({ type: Number, default: DEFAULT_NODE_ROW_SPACING })
  public nodeRowSpacing!: number

  /**
   * The spacing between nodes (optional).
   *
   * Note that if the nodes have its own `x` or `y`,
   * the spacing is ignored. See [[shapeNodesVertically]] or
   * [[shapeNodesHorizontally]] for more details.
   *
   * If not specified, the value is set to [[DEFAULT_NODE_COL_SPACING]].
   */
  @Prop({ type: Number, default: DEFAULT_NODE_COL_SPACING })
  public nodeColSpacing!: number

  /**
   * The margin value applied on both ends of the width (optional).
   *
   * If not specified, the value is set to [[DEFAULT_WIDTH_MARGIN]].
   */
  @Prop({ type: Number, default: DEFAULT_WIDTH_MARGIN })
  public widthMargin!: number

  /**
   * The margin value applied on both ends of the height (optional).
   *
   * If not specified, the value is set to [[DEFAULT_HEIGHT_MARGIN]].
   */
  @Prop({ type: Number, default: DEFAULT_HEIGHT_MARGIN })
  public heightMargin!: number

  /**
   * The font size of the texts in all nodes and edges (optional).
   * This value will be set as default when the individual node
   * or edge doesn't set any font size.
   *
   * If not specified, the value is set to [[DEFAULT_FONT_SIZE]].
   */
  @Prop({ type: Number, default: DEFAULT_FONT_SIZE })
  public fontSize!: number
}
