<template>
  <h2>Projects List</h2>
  <ul>
    <li v-for="project in arrProjects" :key="project.id">{{ project.title }}</li>
  </ul>
</template>

<script>
import axios from "axios";

export default {
  name: "ProjectList",
  data() {
    return {
      arrProjects: [],
    }
  },
  created() {
    axios.get('http://127.0.0.1:8000/api/projects')
        .then(response => console.log(response.data));
  }
}
</script>

<style scoped>

</style>