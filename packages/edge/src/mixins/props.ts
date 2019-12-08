// Constants
import { DEFAULT_STROKE_COLOR } from '@flowter/constants'

// Types
import {
  EdgeType, EdgeMarker
} from '@flowter/types'

/**
 * The Flowter edge's base mixin.
 * This is shared across all edge shapes.
 */
export default {
  props: {
    /**
     * The identifier of the from point.
     */
    from: {
      type: String,
      required: true
    },

    /**
     * The identifier of the from point.
     */
    to: {
      type: String,
      required: true
    },

    /**
     * The point of where the edge is from.
     */
    fromPosition: {
      type: Object,
      required: true
    },

    /**
     * The point of where the edge is to.
     */
    toPosition: {
      type: Object,
      required: true
    },

    /**
     * The direction of the edge.
     * Follows the cardinal direction.
     */
    direction: {
      type: String,
      required: true
    },

    /**
     * Whether the edge is rendered on one side or the other.
     */
    side: {
      type: String,
      required: true
    },

    /**
     * Whether the edge is circular or not.
     * This is only an edge case when the edge happens to connect to itself.
     */
    isCircular: {
      type: Boolean,
      required: true
    },

    /**
     * The edge text's font size.
     * This would either have its own size, or derived from the flowchart's.
     */
    fontSize: {
      type: Number,
      required: true
    },

    /**
     * The text of the edge (optional).
     */
    text: {
      type: String,
      default: ''
    },

    /**
     * The side of the marker that will be rendered (optional).
     */
    marker: {
      type: String,
      default: EdgeMarker.END
    },

    /**
     * The type of the edge being rendered (optional).
     */
    type: {
      type: String,
      default: EdgeType.BENT
    },

    /**
     * The color of the edge (optional).
     */
    color: {
      type: String,
      default: DEFAULT_STROKE_COLOR
    },

    /**
     * The namespace to be appended for the ids (optional).
     * Only when there are identical ids and this is to avoid conflict.
     */
    namespace: {
      type: String,
      default: ''
    }
  }
}
