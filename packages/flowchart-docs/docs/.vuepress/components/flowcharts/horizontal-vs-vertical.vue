<template>
  <div class="centered">
    <flowchart
      :mode="availableMode[mode]"
      :nodes="nodes"
      :edges="edges" />
    <button @click="toggleMode">{{ availableMode[mode] }} mode. Click to toggle</button>
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
      mode: 0
    }
  },
  computed: {
    availableMode () {
      return ['vertical', 'horizontal']
    }
  },
  methods: {
    toggleMode () {
      this.mode = Number(!this.mode)
    }
  }
}
</script>