<template>
  <flowchart :nodes="nodes" :edges="edges" />
</template>
<script>
export default {
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