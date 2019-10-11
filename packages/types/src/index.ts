/*
 * -------------------------------
 * Flowchart types
 * -------------------------------
 */

/**
 * The flowchart's rendering mode.
 *
 * Vertical means the nodes go from top to bottom.
 * Horizontal means the nodes go from left to right.
 */
export enum Mode {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}

/*
 * -------------------------------
 * Node types
 * -------------------------------
 */

/**
 * All of the node's possible symbols.
 */
export enum NodeSymbol {
  ROUNDED_RECTANGLE = 'rounded-rectangle',
  ELLIPSE = 'ellipse',
  RECTANGLE = 'rectangle',
  PARALLELOGRAM = 'parallelogram',
  RHOMBUS = 'rhombus'
}

/**
 * The node shape, retrieved as props in [[FlowterFlowchart.nodes]].
 *
 * `Graph` prefix is used so that it won't be confused
 * with the global `Node` type.
 */
export interface GraphNode {
  /**
   * The node's text.
   */
  text: string
  /**
   * The node's width.
   *
   * If specified, this will override [[DEFAULT_NODE_WIDTH]].
   */
  width?: number

  /**
   * The node's height.
   *
   * If specified, this will override [[DEFAULT_NODE_HEIGHT]].
   */
  height?: number

  /**
   * The node's x position in the DOM.
   *
   * If specified, this will be the position used when rendering.
   * Do be careful when setting this option manually; it might
   * not be rendered in accordance to the rest of the nodes,
   * since their positions are being calculated depending on
   * the edges.
   */
  x?: number

  /**
   * The node's y position in the DOM.
   *
   * If specified, this will be the position used when rendering.
   * Do be careful when setting this option manually; it might
   * not be rendered in accordance to the rest of the nodes,
   * since their positions are being calculated depending on
   * the edges.
   */
  y?: number

  /**
   * The node's symbol.
   *
   * If specified, this will override the default shape, which is
   * [[NodeSymbol.RECTANGLE]]
   */
  symbol?: NodeSymbol

  /**
   * The node's background color.
   *
   * If specified, this will override the default color, which is
   * [[DEFAULT_NODE_BGCOLOR]]
   */
  bgcolor?: string

  /**
   * The node text's font size.
   *
   * If specified, this will override the default font size, which is
   * [[DEFAULT_FONT_SIZE]]
   */
  fontSize?: number
}

/**
 * The ordered node shape.
 */
export interface OrderedNode {
  /**
   * All the nodes that connects to this node.
   */
  from: {
    node: Record<string, OrderedNode>
    edge: Record<string, GraphEdge>
  }

  /**
   * All the nodes that this node connects to.
   */
  to: {
    node: Record<string, OrderedNode>
    edge: Record<string, GraphEdge>
  }

  /**
   * The index that represents this node in [[NodeRow]].
   */
  index: number
}

/**
 * More detailed node shape, to be rendered in the DOM.
 */
export interface RenderedGraphNode extends GraphNode {
  id: string
  x: number
  y: number
  width: number
  height: number
  symbol: NodeSymbol
  bgcolor: string
  fontSize: number
}

/**
 * The rows of nodes.
 */
export interface NodeRow {
  nodes: RenderedGraphNode[]
  width: number
  height: number
}

/**
 * The detailed info of the node.
 *
 * This includes its position on the [[NodeRow]].
 */
export interface GraphNodeDetails {
  row: {
    idx: number
    prev: NodeRow | null
    current: NodeRow
    next: NodeRow | null
    length: number
  }
  node: {
    idx: number
    prev: RenderedGraphNode | null
    current: RenderedGraphNode
    next: RenderedGraphNode | null
  }
  from: OrderedNode['from']
  to: OrderedNode['to']
}

/*
 * -------------------------------
 * Edge types
 * -------------------------------
 */

/**
 * Determines whether an edge has to have the marker
 * at the start, end of the edge, or both.
 */
export enum EdgeMarker {
  START = 'start',
  END = 'end',
  BOTH = 'both'
}

/**
 * Types of the edges.
 */
export enum EdgeType {
  CROSS = 'cross',
  BENT = 'bent'
}

/**
 * Shapes of the edge.
 */
export enum EdgeShape {
  BENT_FORWARD = 'bent-forward',
  BENT_BACKWARD = 'bent-backward',
  STRAIGHT = 'straight',
  CIRCULAR = 'circular'
}

/**
 * The edge shape, retrieved as props in [[FlowterFlowchart.edges]].
 *
 * `Graph` prefix is used to make it consistent
 * with [[GraphNode]].
 */
export interface GraphEdge {
  /**
   * The node id this edge is connecting from.
   */
  from: string

  /**
   * The node id this edge is connecting to.
   */
  to: string

  /**
   * The text that this edge might have.
   * If not specified, the text won't be rendered
   */
  text?: string

  /**
   * The color of the edge.
   * Defaults to [[DEFAULT_STROKE_COLOR]].
   */
  color?: string

  /**
   * The type of the edge.
   * Defaults to [[EdgeType.BEND]].
   */
  type?: EdgeType

  /**
   * Whether the marker is at the end or the start.
   * Defaults to [[EdgeMarker.END]].
   */
  marker?: EdgeMarker

  /**
   * The text's font size. If not specified, it will
   * follow the flowchart's settings.
   */
  fontSize?: number
}

/**
 * The edge translated into the node position.
 */
export interface ShapedEdge {
  x: number
  y: number
  nodeDirection: Direction
}

/**
 * The edge translated into the node position.
 */
export interface EdgeSourcePosition {
  x: number
  y: number
  nodeDirection: Direction
}

/**
 * The rendered edge properties.
 */
export interface RenderedEdge extends GraphEdge {
  fromPosition: {
    x: number
    y: number
  }
  toPosition: {
    x: number
    y: number
  }
  direction: Direction
  side: Direction
  isCircular: boolean
}

/**
 * The detailed info when editing an edge.
 */
export interface EditingEdgeDetails {
  draggingType: string
  from: string
  to: string
}

/**
 * The shape of the event when editing an edge.
 */
export interface EventEditingEdge<T extends keyof EventEditingEdgePayload = keyof EventEditingEdgePayload> {
  type: string
  payload: EventEditingEdgePayload[T]
}

/**
 * The payload of an edited edge event.
 */
export interface EventEditingEdgePayload {
  'drag-end': null
  'from-to': { from: string, to: string, draggingType: string }
  'drag-type': 'from' | 'to'
}

/*
 * -------------------------------
 * Shared types
 * -------------------------------
 */

/**
 * The types of edit mode.
 */
export enum Editing {
  NONE = 'none',
  NODE = 'node',
  EDGE = 'edge'
}

/**
 * Cardinal directions.
 *
 * Determines points/directions in nodes and edges.
 */
export type Direction = 'n' | 's' | 'e' | 'w'

/**
 * The bounds, ranging from the vertical and horizontal bounds.
 */
export interface Bounds {
  x: { min: number, max: number }
  y: { min: number, max: number }
}
