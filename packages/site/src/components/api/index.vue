<template>
  <section class="section">
    <div class="container content">
      <h2>Props</h2>
      There are two required props in order for the flowchart to be rendered:
      <h3><code>nodes</code></h3>
      <p>This prop represents the nodes you're rendering in the flowchart. It is a dictionary
        with the keys being the unique identifier for each node.</p>
      <h3><code>edges</code></h3>
      <p>This prop represents the connection between the nodes. It is an array of objects which means
        one node can connect to multiple nodes at the same time.</p>
    </div>
  </section>
</template>
<script lang="ts" src="./index.ts"></script>

