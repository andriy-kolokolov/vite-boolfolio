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

  <main>
    <div class="container">
      <project-list/>
    </div>
  </main>

  <app-footer/>

</template>

<style lang="scss">

</style>
