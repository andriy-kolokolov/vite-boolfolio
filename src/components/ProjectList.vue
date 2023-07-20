<template>


</template>

<script>
import axios from "axios";

export default {
  name: "ProjectList",
  data() {
    return {
      arrProjects: [],
      currentPage: 1,
      nPages: 0,
    }
  },
  methods: {
    getPage(page) {
      this.currentPage = page;
      this.getProjects();
    },
    getProjects() {
      axios.get('http://127.0.0.1:8000/api/projects', {
        page: this.currentPage,
      })
          .then(response => (
              this.arrProjects = response.data.data,
                  this.nPages = response.data.last_page
          ));
    },
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
    axios.get('http://127.0.0.1:8000/api/projects', {
      page: this.currentPage,
    })
        .then(response => (
            this.arrProjects = response.data.data,
                this.nPages = response.data.last_page
        ));
  }
}
</script>

<style scoped>


</style>