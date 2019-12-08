<template>
  <div class="centered">
    <flowchart
      :nodes="nodes"
      :edges="edgesWithTypes" />
    <button @click="toggleMode">Toggle edge mode</button>
  </div>
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
      ],
      edgeType: 0
    }
  },
  computed: {
    availableTypes () {
      return ['bent', 'cross']
    },
    edgesWithTypes () {
      return this.edges.map((edge) => ({
        ...edge,
        type: this.availableTypes[this.edgeType]
      }))
    }
  },
  methods: {
    toggleMode () {
      this.edgeType = Number(!this.edgeType)
    }
  }
}
</script>