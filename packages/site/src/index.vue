<template>
  <div>
    <nav class="hero navbar">
      <div class="container">
        <div class="navbar-brand">
          <span class="navbar-burger burger">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div class="navbar-menu">
          <div class="navbar-end">
            <div class="tabs is-right">
              <ul>
                <router-link
                  tag="li"
                  :to="{ name: 'home' }">
                  <a>Home</a>
                </router-link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="scss" src="./styles/main.scss"></style>
<style lang="scss" scoped>
.navbar {
  position: absolute;
  right: 40px;
  background-color: transparent;

  .navbar-burger {
    margin-right: -40px;
  }
}
</style>