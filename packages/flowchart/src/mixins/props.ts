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
  Mode
} from '@flowter/types'

/**
 * The Flowter flowchart props mixins.
 *
 * This class holds all the informations about what is needed
 * for the flowchart to be rendered.
 */
export default {
  props: {
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
    nodes: {
      type: Object,
      required: true
    },

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
    edges: {
      type: Array,
      required: true
    },

    /**
     * How the flowchart is being rendered (optional).
     *
     * By default, the flowchart is rendered vertically
     * ([[Mode.VERTICAL]]).
     *
     * See [[Mode]] for the supported modes.
     */
    mode: {
      type: String,
      default: Mode.VERTICAL
    },

    /**
     * The default width of all nodes, if not specified in [[nodes]] (optional).
     *
     * If not specified, the value is set to [[DEFAULT_NODE_WIDTH]].
     */
    nodeWidth: {
      type: Number,
      default: DEFAULT_NODE_WIDTH
    },

    /**
     * The default height of all nodes, if not specified in [[nodes]] (optional).
     *
     * If not specified, the value is set to [[DEFAULT_NODE_HEIGHT]].
     */
    nodeHeight: {
      type: Number,
      default: DEFAULT_NODE_HEIGHT
    },

    /**
     * The row spacing between nodes (optional).
     *
     * Note that if the nodes have its own `x` or `y`,
     * the spacing is ignored. See [[shapeNodesVertically]] or
     * [[shapeNodesHorizontally]] for more details.
     *
     * If not specified, the value is set to [[DEFAULT_NODE_ROW_SPACING]].
     */
    nodeRowSpacing: {
      type: Number,
      default: DEFAULT_NODE_ROW_SPACING
    },

    /**
     * The spacing between nodes (optional).
     *
     * Note that if the nodes have its own `x` or `y`,
     * the spacing is ignored. See [[shapeNodesVertically]] or
     * [[shapeNodesHorizontally]] for more details.
     *
     * If not specified, the value is set to [[DEFAULT_NODE_COL_SPACING]].
     */
    nodeColSpacing: {
      type: Number,
      default: DEFAULT_NODE_COL_SPACING
    },

    /**
     * The margin value applied on both ends of the width (optional).
     *
     * If not specified, the value is set to [[DEFAULT_WIDTH_MARGIN]].
     */
    widthMargin: {
      type: Number,
      default: DEFAULT_WIDTH_MARGIN
    },

    /**
     * The margin value applied on both ends of the height (optional).
     *
     * If not specified, the value is set to [[DEFAULT_HEIGHT_MARGIN]].
     */
    heightMargin: {
      type: Number,
      default: DEFAULT_HEIGHT_MARGIN
    },

    /**
     * The font size of the texts in all nodes and edges (optional).
     * This value will be set as default when the individual node
     * or edge doesn't set any font size.
     *
     * If not specified, the value is set to [[DEFAULT_FONT_SIZE]].
     */
    fontSize: {
      type: Number,
      default: DEFAULT_FONT_SIZE
    }
  }
}
