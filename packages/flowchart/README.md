# @flowter/flowchart
[![npm](https://img.shields.io/npm/v/@flowter/flowchart.svg)](https://www.npmjs.com/package/@flowter/flowchart)

A simple flowchart component made with Vue. Requires a graph-like data structure as an input and renders it as a flowchart.

## Installation
```
npm install --save @flowter/flowchart
```

## Usage
Import in your component:
```javascript
import Flowchart from '@flowter/flowchart'
Vue.component('Flowchart', Flowchart)
```

```html
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
</script>
```

It would render something like this:

![flowchart](https://user-images.githubusercontent.com/8046636/54693874-4bacba00-4b62-11e9-8ff1-a3d6fc192dfc.png)

All of the nodes and edges are being positioned and shaped by default, although you can customize it if you want to (but not now, see **TODO**).
The goal is to make creating flowcharts as simple as possible.

If you need more visual customizations, of course you can add your own styling with CSS.

Please see the [docs](https://briwa.github.io/vue-flowter) for more details on the props.

## Running in development
Make sure you've done the setup beforehand.
```
npm run install && npm run bootstrap
```

To run the flowchart component in the browser:
```
npm run serve:flowchart
```

## TODO
This component is a work in progress. See issues for more details.

## Hats off
- [Vue CLI](https://cli.vuejs.org/) for the quick, hassle-free setup.

## License
MIT
