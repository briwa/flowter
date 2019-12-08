<template>
  <div class="centered">
    <flowchart
      :nodes="nodes"
      :edges="edges" />
  </div>
</template>
<script>
export default {
  data () {
    return {
      nodes: {
        a: { text: 'Node A' },
        b: { text: 'Node B' },
        c: { text: 'Node C' },
        d: { text: 'Node D' }
      },
      edges: [
        { from: 'a', to: 'b', text: 'To B' },
        { from: 'a', to: 'c', text: 'To C' },
        { from: 'c', to: 'a', text: 'Back to A' },
        { from: 'b', to: 'a', text: 'Back to A' },
        { from: 'b', to: 'c', text: 'Straight' },
        { from: 'b', to: 'd' },
        { from: 'c', to: 'd' },
        { from: 'd', to: 'd', text: 'Circular' }
      ]
    }
  }
}
</script>