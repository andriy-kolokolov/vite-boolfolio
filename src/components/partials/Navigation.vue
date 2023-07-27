<template>
  <nav class="navigation container-fluid">
    <ul class="my-navbar">
      <li class="nav-item">
        <!-- Use router-link instead of anchor tag -->
        <router-link class="nav-link" :to="{ path: '/home' }" exact>Home</router-link>
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
  </nav>
</template>

<script>
export default {
  name: "Navigation"
}
</script>

<style scoped lang="scss">
@use 'src/scss/partials/my-variables' as *;

$border-nav-link: 5px;

.navigation {
  height: 100%;

  .my-navbar {
    height: 100%;
    font-size: 17px;
    display: flex;
    justify-content: center;
    list-style: none;
    margin-bottom: 0;

    .nav-item {
      height: 100%;

      .nav-link {
        padding: 0 15px;
        display: flex;
        align-items: center;
        height: 100%;
        border-bottom: 5px solid transparent;

        &:hover {
          border-bottom: $border-nav-link solid $my-color-primary;
        }
      }

      .nav-link.router-link-active {
        color: $my-color-primary;
        border-bottom: $border-nav-link solid $my-color-primary;
      }
    }


  }
}

</style>