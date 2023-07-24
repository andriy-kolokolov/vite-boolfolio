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

  <transition>
    <div v-if="!loading">
      <div class="card-container row g-3">
        <project-card
            class="col-md-6 col-lg-4 col-xl-3"
            v-for="project in arrProjects"
            :key="project.id"
            :project="project"
        >
        </project-card>
      </div>
    </div>
  </transition>

</template>

<script>
import axios from "axios";
import {store} from "../store.js";
import ProjectCard from "../components/UI/ProjectCard.vue";
import {Transition} from "vue";

export default {
  name: "AppMyProjects",
  components: {ProjectCard, Transition},
  data() {
    return {
      store,
      arrProjects: [],
      currentPage: 1,
      nPages: 0,
      projectsPerPage: 4,
      loading: false,
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
      this.loading = true;
      axios.get(this.store.backEndURL + 'api/projects', {
        params: {
          page: page,
          per_page: this.projectsPerPage,
        }
      })
          .then(response => {
            this.arrProjects = response.data.data;
            this.loading = false;
          })
          .catch(error => {
            this.loading = false;
            console.error(error);
          });
    },

  }
  ,
  created() {
    axios.get(this.store.backEndURL + 'api/projects', {
      params: {
        page: this.currentPage,
        per_page: this.projectsPerPage,
      }
    })
        .then(response => {
          this.arrProjects = response.data.data;
          this.nPages = response.data.last_page;
        });
  }
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>