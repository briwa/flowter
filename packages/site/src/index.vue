<template>
  <div>
    <section class="hero is-fullheight is-default is-bold">
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <a class="navbar-item" href="../">
                flowter
              </a>
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
                    <li class="is-active"><a>Home</a></li>
                    <li><a href="">Getting started</a></li>
                    <li><a href="">Examples</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="columns is-vcentered">
            <div class="column is-5">
              <div>
                <flowchart
                  :nodes="nodes"
                  :edges="edges" />
              </div>
              <div class="tabs is-toggle">
                <ul>
                  <li class="is-active">
                    <a>
                      <span>Rendered</span>
                    </a>
                  </li>
                  <li>
                    <a>
                      <span>Code</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="column is-6 is-offset-1">
              <h1 class="title is-2">
                flowter
              </h1>
              <h2 class="subtitle is-4">
                Your flowchart made in Vue
              </h2>
              <div class="container">
                <code>
                  npm i -P @flowter/flowchart
                </code>
              </div>
              <br>
              <p class="has-text-centered">
                <a class="button is-medium is-primary is-outlined">
                  Get started
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="scss" src="./styles/main.scss"></style>
