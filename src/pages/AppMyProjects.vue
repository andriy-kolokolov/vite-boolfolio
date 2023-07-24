<template>
  <h2>Projects List</h2>
  <nav>
    <ul class="pagination mt-3">
      <li class="page-item" :class="{disabled: currentPage === 1}">
        <a class="page-link" @click="prevPage">Previous</a>
      </li>

      <li v-for="page in nPages" :key="page" class="page-item" :class="{active: page === currentPage}">
        <span class="page-link" @click="getPage(page)">{{ page }}</span>
      </li>

      <li class="page-item" :class="{disabled: currentPage === nPages}">
        <a class="page-link" @click="nextPage">Next</a>
      </li>
    </ul>
  </nav>
  <div class="card-container row g-3">
    <project-card
        class="col-md-6 col-lg-4"
        v-for="project in arrProjects"
        :key="project.id"
        :project="project"
    >
    </project-card>
  </div>

</template>

<script>
import axios from "axios";
import {store} from "../store.js";
import ProjectCard from "../components/UI/ProjectCard.vue";

export default {
  name: "AppMyProjects",
  components: {ProjectCard},
  data() {
    return {
      store,
      arrProjects: [],
      currentPage: 1,
      nPages: 0,
    }
  },
  methods: {
    nextPage() {
      this.currentPage++;
      this.getProjects(this.currentPage);

    },
    prevPage() {
      this.currentPage--;
      this.getProjects(this.currentPage);
    },
    getPage(page) {
      this.currentPage = page;
      this.getProjects(page);
    },
    getProjects(page) {
      axios.get(this.store.backEndURL + 'api/projects', {
        params: {
          page: page,
        }
      })
          .then(response => (
              this.arrProjects = response.data.data
          ));
    },
  }
  ,
  created() {
    axios.get(this.store.backEndURL + 'api/projects', {
      params: {
        page: this.currentPage,
      }
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