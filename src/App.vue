<script>

import {defineComponent} from "vue";
import ProjectList from "./components/ProjectList.vue";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";

export default defineComponent({
  components: {ProjectList, AppHeader, AppFooter}
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

</style>
