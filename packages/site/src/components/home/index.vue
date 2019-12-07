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
                A flowchart made in Vue
              </h2>
              <highlight-code>
                npm install --save @flowter/flowchart
              </highlight-code>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="scss" src="./styles.scss" scoped></style>
