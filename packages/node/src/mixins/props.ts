/**
 * The Flowter node's base mixin.
 * This is shared across all node types.
 */
export default {
  props: {
    /**
     * Id of the node.
     *
     * This is mainly used as an identifier
     * when sending out events to the parent.
     */
    id: { type: String, required: true },

    /**
     * The x position of the node.
     */
    x: { type: Number, required: true },

    /**
     * The y position of the node.
     */
    y: { type: Number, required: true },

    /**
     * The width of the node.
     */
    width: { type: Number, required: true },

    /**
     * The height of the node.
     */
    height: { type: Number, required: true },

    /**
     * Node symbol.
     */
    symbol: { type: String, required: true },

    /**
     * Node background color.
     */
    bgcolor: { type: String, required: true },

    /**
     * Node's text.
     */
    text: { type: String, required: true },

    /**
     * Node's font size.
     */
    fontSize: { type: Number, required: true }
  }
}
