// Libraries
import { Component, Vue } from 'vue-property-decorator'

import '@flowter/flowchart/dist/@flowter/flowchart.css'
const Flowchart = require('@flowter/flowchart')

/**
 * The Examples component.
 */
@Component({
  components: {
    Flowchart
  }
})
export default class FlowterSiteExamples extends Vue {
}
