<template>
  <div :style="containerStyle">
    <template v-for="nodeDetails in renderedNodes">
      <flowter-node
        :key="`node-${nodeDetails.node.current.id}`"
        v-bind="nodeDetails.node.current" />
      <flowter-edge
        v-for="edge in nodeDetails.to.edge"
        :key="`edge-${edge.from}-${edge.to}`"
        v-bind="getRenderedEdge(renderedNodes[edge.from], renderedNodes[edge.to])" />
    </template>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
