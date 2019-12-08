# API
The main interface for the flowchart component is its properties.
The component only has two required properties, `nodes` and `edges`,
which make up the entire flowchart. The rest of the properties will use 
predefined values.

## Properties

(insert link to file here)

<<< @/../flowchart/src/mixins/props.ts

## `nodes`
The `nodes` property is a dictionary of nodes that will be connected
via `edges`. The key of each node in the dictionary is the ID of the node,
making it unique. The only required property in the node is its `text`.

(insert link to file here)

```typescript
/**
 * `nodes` property.
 */
type Nodes = Record<string, {
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
}>
```
## `edges`
The `edges` property is an array of edges, which connects the nodes to each other. The only required properties
are `from` and `to` of the node IDs. A node has to connect to another node; if no edge
connects them, the node won't be rendered. It is a set of edges in an array which means a node
can connect to multiple nodes via the edges.

(insert link to file here)

```typescript
type Edges = Array< {
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
}>
```

