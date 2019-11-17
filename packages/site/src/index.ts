// Libraries
import { Component, Vue } from 'vue-property-decorator'

import '@flowter/flowchart/dist/@flowter/flowchart.css'
const Flowchart = require('@flowter/flowchart')

/**
 * The site component.
 */
@Component({
  components: {
    Flowchart
  }
})
export default class FlowterSite extends Vue {
  // Data
  public nodes = {
    a: { text: 'Node A' },
    b: { text: 'Node B' },
    c: { text: 'Node C' }
  }
  public edges = [
    { from: 'a', to: 'b', text: 'To B' },
    { from: 'a', to: 'c', text: 'To C' }
  ]
}
