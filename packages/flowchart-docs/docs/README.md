---
home: true
heroText: flowter
tagline: Flowchart made in Vue
footer: MIT Licensed | Copyright © 2019-present briwa
---

<div style="display: flex; justify-content: center;">
  <flowcharts-home />
</div>

## Quick start

``` bash
## install the package
npm install --save @flowter/flowchart
```

``` javascript
// somewhere in your entry file
import '@flowter/flowchart/dist/@flowter/flowchart.css'
import Flowchart from '@flowter/flowchart'

Vue.component('flowchart', Flowchart)
```

<<< @/docs/.vuepress/components/flowcharts/home.vue
