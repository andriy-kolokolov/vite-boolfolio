<template>
  <!--  <div class="fw-bold fs-2">Projects List</div>-->
  <nav class="d-flex justify-content-between mt-4 mb-4">
    <ul class="pagination mb-0">
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
    <div class="my-input-group">
      <input type="text" class="form-control" placeholder="Search by project..." aria-label="search"
             aria-describedby="btn-search" @keyup.enter="searchProject" v-model="searchQuery">
      <button class="btn my-search-btn" type="button" id="btn-search">
        <i class="fa-solid fa-magnifying-glass" @click="searchProject"/>
      </button>
    </div>
  </nav>

  <div class="projects-result-set">
    <transition-group>
      <div class="loading-container d-flex align-items-center justify-content-center" v-if="loading">
        <div class="loading-txt">LOADING...</div>
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
  </div>

</template>

<script>
import axios from "axios";
import {store} from "../store.js";
import {ProjectCard} from "../components/UI/index.js";
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
      searchQuery: '',
    }
  },
  methods: {
    searchProject() {
      this.loading = true;
      this.arrProjects = [];
      axios.get(this.store.backEndURL + 'api/projects/search', {
        params: {
          searchQuery: this.searchQuery,
          per_page: this.projectsPerPage,
        }
      })
          .then(response => {
            this.searchQuery = '';
            this.nPages = response.data.last_page;
            this.arrProjects = response.data.data;
            this.loading = false;
          })
          .catch(error => {
            this.searchQuery = '';
            this.loading = false;
            console.error(error);
          });
    },
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
@use '../scss/partials/my-variables' as *;

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

.my-input-group {
  display: flex;
  width: 30%;

  .my-search-btn {
    background-color: transparent;
    border: transparent;

    i {
      transition: $my-link-transition-s;
    }

    &:hover {
      i {
        scale: 1.2;
        color: $my-color-primary;
      }
    }

    &:active {;

      i {
        scale: .9;
      }
    }
  }
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