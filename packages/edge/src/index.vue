<template>
  <component :is="componentName" v-bind="$props" />
</template>
<script lang="ts" src="./index.ts"></script>
<style>
.flowter-edge-parent {
  position: absolute;
  z-index: 1;
}

.flowter-edge-child span {
  position: absolute;

}
.flowter-edge-child path {
  cursor: pointer;
}
</style>
