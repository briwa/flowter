// Libraries
import { Component, Mixins } from 'vue-property-decorator'

// Mixins
import FlowterFlowchartPropsMixin from './props'

// Constants
import {
  DEFAULT_NODE_BGCOLOR,
  NODE_RHOMBUS_RATIO
} from '@flowter/constants'

// Types
import {
  Mode, GraphNode, RenderedGraphNode,
  GraphNodeDetails, OrderedNode, NodeRow, Bounds,
  NodeSymbol, Direction, RenderedEdge
} from '@flowter/types'

/**
 * The Flowter flowchart renderer mixins.
 *
 * This class is responsible in shaping the retrieved props
 * into the something that the node and the edge needs,
 * eventually being rendered as a flowchart.
 */
@Component
export default class FlowterFlowchartRendererMixin extends Mixins(FlowterFlowchartPropsMixin) {
  /*
   * -------------------------------
   * Public accessor/computed
   * -------------------------------
   */

  /**
   * The style of the flowchart's container.
   */
  public get containerStyle (): Record<string, string> {
    const style: Record<string, string> = {}
    style.width = `${this.renderedWidth}px`
    style.height = `${this.renderedHeight}px`
    style.position = 'relative'

    return style
  }

  /**
   * A dictionary of all the rendered nodes details.
   *
   * Since it is being computed in [[nodeLists]] as an array
   * of node rows, this is to make it easier to access by the ids,
   * while retaining the info. See [[GraphNodeDetails]] for all the info.
   */
  public get renderedNodes (): Record<string, GraphNodeDetails> {
    const dict: Record<string, GraphNodeDetails> = {}

    this.nodeLists.forEach((row, rowIdx) => {
      row.nodes.forEach((node, colIdx) => {
        const prevNode = row.nodes[colIdx - 1] || null
        const nextNode = row.nodes[colIdx + 1] || null
        const prevRow = this.nodeLists[rowIdx - 1] || null
        const nextRow = this.nodeLists[rowIdx + 1] || null

        dict[node.id] = {
          row: {
            idx: rowIdx,
            prev: prevRow,
            current: row,
            next: nextRow,
            length: row.nodes.length
          },
          node: {
            idx: colIdx,
            prev: prevNode,
            current: node,
            next: nextNode
          },
          to: this.orderedNodes.dict[node.id].to,
          from: this.orderedNodes.dict[node.id].from
        }
      })
    })

    return dict
  }

  /*
   * -------------------------------
   * Private accessor/computed
   * -------------------------------
   */

  /**
   * Flowchart's natural width.
   *
   * Computed from the bounds' min and max `x` values.
   * See [[allBounds]] for more details.
   */
  private get renderedWidth () {
    return this.allBounds.x.max - this.allBounds.x.min + (this.widthMargin * 2)
  }

  /**
   * Flowchart's natural height.
   *
   * Computed from the bounds' min and max `y` values.
   * See [[allBounds]] for more details.
   */
  private get renderedHeight () {
    return this.allBounds.y.max - this.allBounds.y.min + (this.heightMargin * 2)
  }

  /**
   * The flowchart's bounds.
   *
   * For the `x` min/max values, it is calculated from
   * the leftmost and the rightmost nodes.
   * For the `y` min/max values, it is calculated from
   * the topmost and the bottommost nodes.
   * See [[getBounds]] for more details.
   */
  private get allBounds (): Bounds {
    const { x, y } = this.nodeLists.reduce<Bounds>((bounds, row) => {
      return row.nodes.reduce(this.getBounds, bounds)
    }, {
      x: {
        min: -Infinity,
        max: +Infinity
      },
      y: {
        min: -Infinity,
        max: +Infinity
      }
    })

    // All bounds should take the margin into account
    return {
      x: {
        min: x.min,
        max: x.max
      },
      y: {
        min: y.min,
        max: y.max
      }
    }
  }

  /**
   * All nodes in a form of an array of node rows.
   *
   * The order is set based on [[orderedNodes]]. For performance
   * reason, the size and the position of the nodes are also assigned
   * when looping through the nodes. See [[shapeNodesVertically]] and
   * [[shapeNodesHorizontally]] for more details.
   */
  private get nodeLists (): NodeRow[] {
    const { maxIndex, dict } = this.orderedNodes
    const nodeList: NodeRow[] = Array.from({ length: maxIndex + 1 }, () => ({
      nodes: [],
      width: 0,
      height: 0
    }))

    // Find out maximum width/height possible
    let maxWidth = 0
    let maxHeight = 0

    // Loop through the nodes dictionary
    // to shape it into rows of nodes
    for (const nodeId in dict) {
      if (dict.hasOwnProperty(nodeId)) {
        const { index } = dict[nodeId]
        const node = this.nodes[nodeId]
        const renderedNode = this.shapeNode(nodeId, node)

        nodeList[index].nodes.push(renderedNode)
        nodeList[index].width = nodeList[index].width + renderedNode.width + this.nodeColSpacing
        nodeList[index].height = nodeList[index].height + renderedNode.height + this.nodeRowSpacing

        // Always check whether this is the row that has the most width/height
        maxWidth = Math.max(maxWidth, nodeList[index].width)
        maxHeight = Math.max(maxHeight, nodeList[index].height)
      }
    }

    // Shape the nodes to assign
    // positions depending on the mode
    switch (this.mode) {
      case Mode.VERTICAL: {
        this.shapeNodesVertically(nodeList, maxWidth)
        break
      }
      case Mode.HORIZONTAL: {
        this.shapeNodesHorizontally(nodeList, maxHeight)
        break
      }
      default: {
        throw new Error(`Unknown mode :${this.mode}`)
      }
    }

    return nodeList
  }

  /**
   * All nodes sorted based on the edges, in a form of a dictionary.
   *
   * Since the way the flowchart is rendered is by rows,
   * the rows are only defined by edges that connect one node
   * to another node from the adjacent row, going forward.
   * Any other connections are simply ignored, and let [[FlowterEdge]]
   * renders the connection as the path.
   *
   * `dict` determines all the nodes by its id. Each member contains
   * all the connections to another nodes along with its index, representing
   * its position in [[nodeLists]].
   * `maxIndex` determines the maximum number of node rows.
   */
  private get orderedNodes (): { dict: Record<string, OrderedNode>, maxIndex: number } {
    return this.edges.reduce<{ dict: Record<string, OrderedNode>, maxIndex: number }>((result, edge) => {
      const { dict } = result

      if (!dict[edge.from]) {
        dict[edge.from] = {
          from: { edge: {}, node: {} },
          to: { edge: {}, node: {} },
          index: 0
        }
      }

      const fromNode = dict[edge.from]
      const newToIndex = fromNode.index + 1

      // A valid node index difference is when
      // two nodes connect, which is why the to-node
      // has only one index higher than the from-node
      if (!dict[edge.to]) {
        dict[edge.to] = {
          from: { edge: {}, node: {} },
          to: { edge: {}, node: {} },
          index: newToIndex
        }
      }

      const toNode = dict[edge.to]

      // Establish the reference between two nodes,
      // both the nodes and the edges
      fromNode.to.node[edge.to] = toNode
      fromNode.to.edge[edge.to] = edge
      toNode.from.node[edge.from] = fromNode
      toNode.from.edge[edge.from] = edge

      // Do not assign the new index to the to-node
      // if it's just a connection within the row
      const inSameRow = fromNode.index === toNode.index

      // The index difference that matters is when two nodes
      // connect between two adjacent rows, so the current to-node
      // index is exactly one index lower than the intended index
      const isNextRow = toNode.index === newToIndex

      if (!inSameRow && isNextRow) {
        toNode.index = newToIndex

        // Update the maximum row for future usage
        result.maxIndex = Math.max(result.maxIndex, newToIndex)
      }

      return result
    }, { dict: {}, maxIndex: 0 })
  }

  /*
   * -------------------------------
   * Public methods
   * -------------------------------
   */

  /**
   * Shapes the edge given from and to node to be rendered by [[FlowterEdge]].
   */
  public getRenderedEdge (fromNodeDetails: GraphNodeDetails, toNodeDetails: GraphNodeDetails): RenderedEdge {
    const { node: fromNode, row: fromRow } = fromNodeDetails
    const fromDirections = this.getNodeDirections(fromNode.current)

    const { node: toNode, row: toRow } = toNodeDetails
    const toDirections = this.getNodeDirections(toNode.current)

    let fromDirection = 'n' as Direction
    let toDirection = 'n' as Direction

    const fromPosition = { x: 0, y: 0 }
    const toPosition = { x: 0, y: 0 }

    const direction = this.getEdgeDirection(fromNodeDetails, toNodeDetails)
    const side = this.getEdgeSide(fromNodeDetails, toNodeDetails)
    const isCircular = fromNode.current.id === toNode.current.id

    if (toRow.idx > fromRow.idx) {
      // When the edges go forward,
      // it is always going from top to bottom (vertically)
      // or left to right (horizontally).
      switch (direction) {
        case 'n':
        case 's': {
          fromDirection = 's'
          toDirection = 'n'
          break
        }
        case 'e':
        case 'w': {
          fromDirection = 'e'
          toDirection = 'w'
          break
        }
        default: {
          throw new Error(`Unknown edge direction: ${direction}`)
        }
      }
    } else if (toRow.idx < fromRow.idx) {
      switch (direction) {
        case 'n':
        case 's': {
          fromDirection = side
          toDirection = side
          break
        }
        case 'e':
        case 'w': {
          fromDirection = side
          toDirection = side
          break
        }
        default: {
          throw new Error(`Unknown edge direction: ${direction}`)
        }
      }
    } else if (toNode.idx !== fromNode.idx) {
      fromDirection = direction

      switch (direction) {
        case 'n': {
          toDirection = 's'
          break
        }
        case 's': {
          toDirection = 'n'
          break
        }
        case 'e': {
          toDirection = 'w'
          break
        }
        case 'w': {
          toDirection = 'e'
          break
        }
        default: {
          throw new Error(`Unknown edge direction: ${direction}`)
        }
      }
    } else {
      switch (direction) {
        case 'w':
        case 'e': {
          fromDirection = 'n'
          toDirection = 's'
          break
        }
        case 'n':
        case 's': {
          fromDirection = 'w'
          toDirection = 'e'
          break
        }
        default: {
          throw new Error(`Unknown edge direction: ${direction}`)
        }
      }
    }

    fromPosition.x = fromDirections[fromDirection].x + fromNode.current.x
    fromPosition.y = fromDirections[fromDirection].y + fromNode.current.y
    toPosition.x = toDirections[toDirection].x + toNode.current.x
    toPosition.y = toDirections[toDirection].y + toNode.current.y

    const edge = fromNodeDetails.to.edge[toNode.current.id]
    const fontSize = typeof edge.fontSize === 'undefined' ? this.fontSize : edge.fontSize

    return {
      ...edge,
      fontSize,
      fromPosition,
      toPosition,
      direction,
      side,
      isCircular
    }
  }

  /*
   * -------------------------------
   * Private methods
   * -------------------------------
   */

  /**
   * Shapes the node from [[GraphNode]] to [[RenderedGraphNode]].
   *
   * This would conditionally set the values depending on whether it exists
   * or not, otherwise it is set to its default value.
   *
   * For nodes with [[NodeSymbol.RHOMBUS]], it will be rendered slightly bigger
   * than the rest. See [[NODE_RHOMBUS_RATIO]] for more details.
   *
   * For `x` and `y`, values are set to `-Infinity` if not specified, since
   * there will be some logic to set the actual values. See [[shapeNodesVertically]]
   * or [[shapeNodesHorizontally]] for mode details.
   */
  private shapeNode (id: string, node: GraphNode): RenderedGraphNode {
    const symbol = typeof node.symbol !== 'undefined' ? node.symbol : NodeSymbol.RECTANGLE
    const text = typeof node.text !== 'undefined' ? node.text.toString() : ''
    const bgcolor = typeof node.bgcolor !== 'undefined' ? node.bgcolor : DEFAULT_NODE_BGCOLOR
    const x = typeof node.x !== 'undefined' ? node.x : -Infinity
    const y = typeof node.y !== 'undefined' ? node.y : -Infinity
    const fontSize = typeof node.fontSize !== 'undefined' ? node.fontSize : this.fontSize

    const defaultNodeWidth = symbol === NodeSymbol.RHOMBUS
      ? this.nodeWidth * NODE_RHOMBUS_RATIO : this.nodeWidth
    const defaultNodeHeight = symbol === NodeSymbol.RHOMBUS
      ? this.nodeHeight * NODE_RHOMBUS_RATIO : this.nodeHeight
    const width = typeof node.width !== 'undefined' ? node.width : defaultNodeWidth
    const height = typeof node.height !== 'undefined' ? node.height : defaultNodeHeight

    return {
      id,
      text,
      x,
      y,
      width,
      height,
      symbol,
      bgcolor,
      fontSize
    }
  }

  /**
   * The direction of where the edge is going relative to the flowchart.
   *
   * This is based on where the from-node and the to-node are in the flowchart.
   * It is used to determine direction of the edge is rendered.
   */
  private getEdgeDirection (from: GraphNodeDetails, to: GraphNodeDetails): Direction {
    switch (this.mode) {
      case Mode.VERTICAL: {
        if (to.row.idx === from.row.idx) {
          return to.node.idx > from.node.idx
            ? 'e' : 'w'
        }

        return to.row.idx > from.row.idx
          ? 's' : 'n'
      }
      case Mode.HORIZONTAL: {
        if (to.row.idx === from.row.idx) {
          return to.node.idx > from.node.idx
            ? 's' : 'n'
        }

        return to.row.idx > from.row.idx
          ? 'e' : 'w'
      }
    }
  }

  /**
   * The side in which the edge is located, relative to the flowchart.
   */
  private getEdgeSide (from: GraphNodeDetails, to: GraphNodeDetails) {
    const {
      node: fromNode,
      row: fromRow
    } = from

    const {
      node: toNode,
      row: toRow
    } = to

    const startSide = fromNode.idx - Math.floor(fromRow.length / 2)
    const endSide = toNode.idx - Math.floor(toRow.length / 2)
    const isNodeAtTheRightSide = startSide + endSide >= 0

    switch (this.mode) {
      case Mode.VERTICAL: {
        return isNodeAtTheRightSide ? 'e' : 'w'
      }
      case Mode.HORIZONTAL: {
        return isNodeAtTheRightSide ? 's' : 'n'
      }
      default: {
        throw new Error(`Unknown mode: ${this.mode}.`)
      }
    }
  }

  /**
   * Get the node's relative direction as the start/end point of an edge.
   */
  private getNodeDirections (node: RenderedGraphNode): Record<Direction, { x: number, y: number }> {
    return {
      n: { x: node.width / 2, y: 0 },
      w: { x: 0, y: node.height / 2 },
      e: { x: node.width, y: node.height / 2 },
      s: { x: node.width / 2, y: node.height }
    }
  }

  /**
   * Shapes all nodes position when being rendered in [[Mode.VERTICAL]].
   *
   * The nodes' position will be rendered from the center towards the edge
   * of the flowchart. This would take the nodes' `x` and `y` values into account
   * if specified from [[nodes]].
   */
  private shapeNodesVertically (nodeList: NodeRow[], maxWidth: number) {
    let cumulativeY = this.heightMargin

    nodeList.forEach((row) => {
      // Nodes should start from the far left of the row
      let cumulativeX = (maxWidth / 2) - (row.width / 2) + this.widthMargin

      // Start with zero because the padding has been accounted for
      // when accumulating each node's y
      let maxHeight = 0

      row.nodes.forEach((node) => {
        const hasCustomX = node.x !== -Infinity
        const hasCustomY = node.y !== -Infinity

        // Use the x/y value provided from the props,
        // otherwise accumulate from the previous node
        node.x = hasCustomX ? node.x : cumulativeX
        node.y = hasCustomY ? node.y : cumulativeY

        // The y position depends on the node with the highest height
        maxHeight = Math.max(maxHeight, node.height)

        // The current node's column spacing is determined
        // by whether the previous node has custom x. This is because
        // if the x has been tampered, it means it doesn't need the spacing
        // from the previous node
        const colSpacing = hasCustomX
          ? this.nodeColSpacing - (node.x - cumulativeX) : this.nodeColSpacing

        // Accumulate the x for each node
        cumulativeX = node.x + node.width + colSpacing
      })

      // Accumulate the y for each row
      cumulativeY = cumulativeY + maxHeight + this.nodeRowSpacing
    })
  }

  /**
   * Shapes all nodes position when being rendered in [[Mode.HORIZONTAL]].
   *
   * The nodes' position will be rendered from the center towards the edge
   * of the flowchart. This would take the nodes' `x` and `y` values into account
   * if specified from [[nodes]].
   */
  private shapeNodesHorizontally (nodeList: NodeRow[], maxHeight: number) {
    let cumulativeX = this.widthMargin

    nodeList.forEach((row) => {
      // Nodes should start from the far top of the row
      let cumulativeY = (maxHeight / 2) - (row.height / 2) + this.heightMargin

      // Start with zero because the padding has been accounted for
      // when accumulating each node's x
      let maxWidth = 0

      row.nodes.forEach((node) => {
        const hasCustomX = node.x !== -Infinity
        const hasCustomY = node.y !== -Infinity

        // Use the x/y value provided from the props,
        // otherwise accumulate from the previous node
        node.x = hasCustomX ? node.x : cumulativeX
        node.y = hasCustomY ? node.y : cumulativeY

        // The x position depends on the node with the highest width
        maxWidth = Math.max(maxWidth, node.width)

        // The current node's column spacing is determined
        // by whether the previous node has custom x. This is because
        // if the x has been tampered, it means it doesn't need the spacing
        // from the previous node
        const rowSpacing = hasCustomY
          ? this.nodeRowSpacing - (node.y - cumulativeY) : this.nodeRowSpacing

        // Accumulate the y for each node
        cumulativeY = node.y + node.height + rowSpacing
      })

      // Accumulate the x for each row
      cumulativeX = cumulativeX + maxWidth + this.nodeColSpacing
    })
  }

  /**
   * Given a node, it checks whether the node exceeds the bounds
   * `x` and `y` range. If it does, update the bounds range.
   */
  private getBounds (bounds: Bounds, node: RenderedGraphNode): Bounds {
    if (bounds.x.min === -Infinity || node.x <= bounds.x.min) {
      bounds.x.min = node.x
    } else if (node.x + node.width > bounds.x.max || bounds.x.max === +Infinity) {
      bounds.x.max = node.x + node.width
    }

    if (bounds.y.min === -Infinity || node.y <= bounds.y.min) {
      bounds.y.min = node.y
    } else if (node.y + node.height > bounds.y.max || bounds.y.max === +Infinity) {
      bounds.y.max = node.y + node.height
    }

    return bounds
  }
}
