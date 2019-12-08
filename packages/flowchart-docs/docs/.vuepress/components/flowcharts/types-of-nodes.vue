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
        a: { text: 'ellipse', symbol: 'ellipse' },
        b: { text: 'rectangle', symbol: 'rectangle' },
        c: { text: 'parallelogram', symbol: 'parallelogram' },
        d: { text: 'rhombus', symbol: 'rhombus' },
        e: { text: 'rounded-rectangle', symbol: 'rounded-rectangle' }
      },
      edges: [
        { from: 'a', to: 'b' },
        { from: 'a', to: 'c' },
        { from: 'c', to: 'd' },
        { from: 'c', to: 'e' }
      ]
    }
  }
}
</script>