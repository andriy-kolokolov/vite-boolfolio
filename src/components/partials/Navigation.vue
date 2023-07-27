<template>
  <nav class="navigation container-fluid">
    <ul class="my-navbar">
      <li class="nav-item">
        <router-link class="nav-link" :to="{ path: '/home' }" exact>Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{ path: '/projects' }">Projects</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{ path: '/contact-me' }">Contact me</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navigation"
}
</script>

<style scoped lang="scss">


</style>