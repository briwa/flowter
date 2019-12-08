import '@flowter/flowchart/dist/@flowter/flowchart.css'
import Flowchart from '@flowter/flowchart'

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  Vue.component('flowchart', Flowchart)
}
