<template>
  <h2>Projects List</h2>
  <div class="card-container row g-3">
    <div class="col-md-6 col-lg-4" v-for="project in arrProjects" :key="project.id">
      <div class="card h-100"> <!-- Add 'h-100' class to make cards the same height -->
        <div class="card-body">
          <h5 class="card-title">{{ project.title }}</h5>
          <div><strong>Type: </strong>{{ project.type.name }}</div>
          <div><strong>Languages: </strong>{{ getLanguages(project.programming_languages) }}</div>
          <div><strong>Technologies: </strong>{{ getTechnologies(project.technologies) }}</div>
          <div><strong>Description: </strong>{{ project.description }}</div>
          <div><strong>Project url: </strong><a :href="project.project_url">{{ project.project_url }}</a></div>
        </div>
      </div>
    </div>
  </div>

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
  methods: {
    getLanguages(arrLanguages) {
      let res = '';
      arrLanguages.forEach(language => res += language.name + ' ');
      return res;
    },
    getTechnologies(arrTechnologies) {
      let res = '';
      arrTechnologies.forEach(technology => res += technology.name + ' ');
      return res;
    },
  }
  ,
  created() {
    axios.get('http://127.0.0.1:8000/api/projects')
        .then(response => this.arrProjects = response.data.data);
  }
}
</script>

<style scoped>




</style>