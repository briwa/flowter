# Getting started
## Introduction
`flowter` is a set of tools to create and render flowcharts in Vue.
The only tool available to use right now is `@flowter/flowchart` component. Internally,
the package uses these components:
- `@flowter/node`
- `@flowter/edge`

Head on to the Github repo to find out about the setup of this tool.

## Installation
To use the flowchart component, install the package:
```bash
npm install --save @flowter/flowchart
```

This component uses external styling file for the CSS instead of inline styles,
so the style has to be included in your page just once, preferably in the entry file:

```javascript
import '@flowter/flowchart/dist/@flowter/flowchart.css'
```

This allows you to modify and override the base styling to your needs.

To use the component in your own component, either install them globally,
so that it's always available in any templates:

```javascript
import Vue from 'vue'
import Flowchart from '@flowter/flowchart'

Vue.component('flowchart', Flowchart)
```

...or, import them manually in the component:

```javascript
import Flowchart from '@flowter/flowchart'

export default {
  components: {
    Flowchart
  },
  // ...
}
```

Be sure to supply both `nodes` and `edges` property as the only required props for this component,
more details in the API page.

