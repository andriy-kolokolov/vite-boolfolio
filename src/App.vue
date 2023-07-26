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

  <main class="mt-1">
    <div class="container-fluid">
      <router-view/>
    </div>
  </main>

  <app-footer/>

</template>

<style lang="scss">

</style>
