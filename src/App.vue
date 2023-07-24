<script>

import {defineComponent} from "vue";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";

export default defineComponent({
  components: {AppHeader, AppFooter}
})
</script>

<template>

  <app-header/>

  <main class="mt-4">
    <div class="container">
      <router-view/>
    </div>
  </main>

  <app-footer/>

</template>

<style lang="scss">
@use 'scss/partials/variables' as *;

main {
  margin-bottom: calc($footer-height + 1.5rem);
}
</style>
