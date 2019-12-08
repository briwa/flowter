---
home: true
actionText: Get Started →
actionLink: /getting-started/
footer: MIT Licensed | Copyright © 2019-present briwa
---

---

### Quick installation guide

``` bash
npm install --save @flowter/flowchart
```

``` vue
<template>
  <flowchart :nodes="nodes" :edges="edges" />
</template>
<script>
import '@flowter/flowchart/dist/flowchart.css'
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
```
