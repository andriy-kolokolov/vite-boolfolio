<template>
<!--  <div class="fw-bold fs-2">Projects List</div>-->
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
  <transition-group>
    <div class="loading-container d-flex align-items-center justify-content-center" v-if="loading">
      <div class="loading-txt">LOADING... </div>
      <div id="loading"></div>
    </div>
    <div v-if="!loading">
      <div class="card-container row g-4 justify-content-center">
        <project-card
            class="col-lg-6 col-xxl-4"
            v-for="project in arrProjects"
            :key="project.id"
            :project="project"
        >
        </project-card>
      </div>
    </div>
  </transition-group>

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
      projectsPerPage: 3,
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
    this.loading = true;
    axios.get(this.store.backEndURL + 'api/projects', {
      params: {
        page: this.currentPage,
        per_page: this.projectsPerPage,
      }
    })
        .then(response => {
          this.arrProjects = response.data.data;
          this.nPages = response.data.last_page;
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          console.error(error);
        });
  },
}
</script>

<style scoped lang="scss">
@use 'src/scss/partials/variables' as *;

.v-enter-active {
  transition: opacity 0.8s ease;
}

.v-leave-active {
  transition: opacity 0s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.loading-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .loading-txt {
    font-weight: bold;
    font-size: 25px;
    margin-right: 20px;
    color: $my-color-primary;
  }

  #loading {
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 7px solid rgba(255, 255, 255, .3);
    border-radius: 50%;
    border-top-color: $my-color-primary;
    animation: spin 1s ease-in-out infinite;
    -webkit-animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
}
</style>