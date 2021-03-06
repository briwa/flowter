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
export default class FlowterSiteHome extends Vue {
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
  public vueCode = `
    <template>
      <flowchart
        :nodes="nodes"
        :edges="edges" />
    </template>
    <script>
      import '@flowter/flowchart/dist/@flowter/flowchart.css'
      import Flowchart from '@flowter/flowchart'

      export default {
        components: {
          Flowchart
        },
        data () {
          return {
            nodes: {
              a: { text: 'Node A' },
              b: { text: 'Node B' },
              c: { text: 'Node C' }
            },
            edges: [
              { from: 'a', to: 'b', text: 'To B' },
              { from: 'a', to: 'c', text: 'To C' }
            ]
          }
        }
      }
    </script>
  `
  public selectedDemo = 'rendered'

  // Methods
  public onSelectDemo (type: string) {
    this.selectedDemo = type
  }
}
