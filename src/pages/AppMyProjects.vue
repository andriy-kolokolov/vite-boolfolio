<template>
  <!--  <div class="fw-bold fs-2">Projects List</div>-->
  <nav class="row mt-4 mb-4"
       :class="{'justify-content-center': searching, 'justify-content-between': !searching}">
    <div :class="{'d-none': searching}" class="col d-flex justify-content-start">
      <div v-if="!searching" class="row">
        <ul class="col d-flex align-items-center pagination mb-0">
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

        <div class="col p-0 d-flex justify-content-center align-items-center refresh-result-set">
          <i @click="getProjects(currentPage)" class="fa-solid fa-rotate"></i>
        </div>
      </div>
    </div>

    <div :class="{'col-5': searching === true, 'col-4': !searching}"
         class=" my-input-group d-flex align-items-center">
      <div v-if="searching" class="back-to-result-set" @click="getProjects(currentPage), searching = false">
        <i class="fa-solid fa-circle-arrow-left"></i>
        <div class="d-flex align-items-center ">Back</div>
      </div>
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
      searching: false,
    }
  },
  methods: {
    searchProject() {
      this.searching = true
      this.loading = true;
      this.arrProjects = [];
      axios.get(this.store.backEndURL + 'api/projects/search', {
        params: {
          searchQuery: this.searchQuery,
        }
      })
          .then(response => {
            this.searchQuery = '';
            this.arrProjects = response.data;
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

.back-to-result-set {
  transition: $my-link-transition-s;
  cursor: pointer;
  display: flex;
  margin-right: 10px;

  i {
    padding: 5px;
  }
  &:hover {
    color: $my-color-primary;
    scale: 1.1;
  }

}

.refresh-result-set {
  i {
    padding: 15px;
    scale: 1.1;
    cursor: pointer;
    font-size: 20px;
    transition: $my-link-transition-s;

    &:hover {
      scale: 1.3;
      color: $my-color-primary;
      transform: rotate(90deg);
    }

    &:active {
      transform: rotate(300deg);
    }
  }
}

.my-input-group {
  display: flex;

  .form-control:focus {
    //border-color: $my-color-primary;
    border-color: rgb(112, 131, 235, 0.40);
    opacity: .7;
    box-shadow: 0 0 5px 0.25rem rgb(112, 131, 235, 0.30);
  }

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