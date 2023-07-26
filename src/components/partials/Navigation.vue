<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <!-- Use router-link instead of anchor tag -->
            <router-link class="nav-link" :to="{ path: '/' }" exact>Home</router-link>
          </li>
          <li class="nav-item">
            <!-- Use router-link instead of anchor tag -->
            <router-link class="nav-link" :to="{ path: '/projects' }">Projects</router-link>
          </li>
          <li class="nav-item">
            <!-- Use router-link instead of anchor tag -->
            <router-link class="nav-link" :to="{ path: '/contact-me' }">Contact me</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation"
}
</script>

<style scoped lang="scss">
.nav-item {

  .router-link-active {
    color: #0079fd;
    font-weight: bold;
  }
}
</style>