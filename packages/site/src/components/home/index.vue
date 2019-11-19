<template>
  <div>
    <section class="hero is-fullheight is-default is-bold">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column is-7">
              <div class="centered-vh">
                <div
                  v-show="selectedDemo === 'rendered'"
                  class="centered-vh demo-cont">
                  <flowchart
                    :nodes="nodes"
                    :edges="edges" />
                </div>
                <div
                  v-show="selectedDemo === 'code'"
                  class="demo-cont">
                  <highlight-code
                    :code="vueCode"
                    lang="vue" />
                </div>
                <div class="tabs is-toggle">
                  <ul>
                    <li :class="{ 'is-active': selectedDemo === 'rendered' }">
                      <a @click.prevent="onSelectDemo('rendered')">
                        <span>Rendered</span>
                      </a>
                    </li>
                    <li :class="{ 'is-active': selectedDemo === 'code' }">
                      <a @click.prevent="onSelectDemo('code')">
                        <span>Code</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="column is-5 has-text-centered">
              <h1 class="title is-2">
                flowter
              </h1>
              <h2 class="subtitle is-4">
                Your flowchart made in Vue
              </h2>
              <p class="has-text-centered">
                <a
                  class="button is-medium is-primary is-outlined"
                  href="#getting-started">
                  Get started
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container content">
        <h2 id="getting-started">Getting started</h2>
        <p>Install the package:</p>
        <highlight-code>
          npm install --save @flowter/flowchart
        </highlight-code>
        <p>Import the component and the CSS:</p>
        <highlight-code lang="javascript">
          import '@flowter/flowchart/dist/@flowter/flowchart.css'
          import Flowchart from '@flowter/flowchart'

          Vue.component('Flowchart', Flowchart)
        </highlight-code>
        <p>Use them in your component:</p>
        <highlight-code
          :code="vueCode"
          lang="vue" />
        <p>Head over to the <router-link :to="{ name: 'api' }">API page</router-link>
        to learn more about the props.</p>
      </div>
    </section>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="scss" src="./styles.scss" scoped></style>
