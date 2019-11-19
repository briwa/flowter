<template>
  <div>
    <section class="hero is-fullheight is-default is-bold">
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <span class="navbar-burger burger" data-target="navbarMenu">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div id="navbarMenu" class="navbar-menu">
              <div class="navbar-end">
                <div class="tabs is-right">
                  <ul>
                    <li class="is-active"><a href="#">Home</a></li>
                    <li><a href="#examples">Examples</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
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
                    <li
                      :class="{ 'is-active': selectedDemo === 'rendered' }"
                      @click="onSelectDemo('rendered')">
                      <a>
                        <span>Rendered</span>
                      </a>
                    </li>
                    <li
                      :class="{ 'is-active': selectedDemo === 'code' }"
                      @click="onSelectDemo('code')">
                      <a>
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
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="scss" src="./styles/main.scss"></style>
