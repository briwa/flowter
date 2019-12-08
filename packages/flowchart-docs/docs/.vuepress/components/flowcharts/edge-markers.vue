<template>
  <div class="centered">
    <flowchart
      style="height: 100px;"
      mode="horizontal"
      :nodes="nodes"
      :edges="edgesWithTypes" />
    <button @click="toggleMode">Edges marker on {{ availableTypes[edgeMarker] }}. Click to toggle</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      nodes: {
        a: { text: 'Node A' },
        b: { text: 'Node B' }
      },
      edges: [
        { from: 'a', to: 'b', text: 'To B', marker: 'end' },
      ],
      edgeMarker: 0
    }
  },
  computed: {
    availableTypes () {
      return ['end', 'both']
    },
    edgesWithTypes () {
      return this.edges.map((edge) => ({
        ...edge,
        marker: this.availableTypes[this.edgeMarker]
      }))
    }
  },
  methods: {
    toggleMode () {
      this.edgeMarker = Number(!this.edgeMarker)
    }
  }
}
</script>