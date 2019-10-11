<template>
  <component :is="componentName" v-bind="$props" />
</template>
<script lang="ts" src="./index.ts"></script>
<style>
.flowter-node-parent {
  position: absolute;
  z-index: 2;
  overflow: hidden;
}

.flowter-node-parent:hover {
  cursor: pointer;
}

.flowter-node-parent span {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}

.flowter-node-parent .flowter-node-text {
  position: absolute;
  text-align: center;
  width: 100%;
  height: 100%;
}
</style>
