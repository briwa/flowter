// Components
import FlowterEdgeStraight from './components/straight'
import FlowterEdgeBentForward from './components/bent-forward'
import FlowterEdgeBentBackward from './components/bent-backward'
import FlowterEdgeCircular from './components/circular'

// Mixins
import FlowterEdgePropsMixin from './mixins/props'

// Types
import { EdgeType, EdgeShape } from '@flowter/types'

/**
 * The Flowter edge's base component.
 * This holds all of the edge shapes' components.
 */
export default {
  name: 'FlowterEdgeBase',
  mixins: [FlowterEdgePropsMixin],
  components: {
    FlowterEdgeStraight,
    FlowterEdgeBentForward,
    FlowterEdgeBentBackward,
    FlowterEdgeCircular
  },
  computed: {
    /**
     * The component to render depending on the edge properties.
     */
    componentName () {
      const namePrefix = 'flowter-edge'

      if (this.isCircular) {
        return `${namePrefix}-${EdgeShape.CIRCULAR}`
      }

      if (this.type === EdgeType.CROSS) {
        return `${namePrefix}-${EdgeShape.STRAIGHT}`
      }

      switch (this.direction) {
        case 's':
        case 'e': {
          return `${namePrefix}-${EdgeShape.BENT_FORWARD}`
        }
        case 'n':
        case 'w': {
          return `${namePrefix}-${EdgeShape.BENT_BACKWARD}`
        }
        default: {
          throw new Error(`Invalid edge direction: ${this.direction}`)
        }
      }
    }
  }
}
