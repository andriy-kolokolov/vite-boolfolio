<template>
  <div>
    <div class="card h-100"> <!-- Add 'h-100' class to make cards the same height -->
      <div class="card-body d-flex flex-column justify-content-between">
        <div class="project-top">
          <div class="img-wrapper">
            <img :src="getProjectImage(project)" alt="">
          </div>
          <h5 class="card-title">{{ project.title }}</h5>
        </div>

        <div class="project-bot-details h-100 row g-2">
          <div><strong>Type: </strong>{{ project.type.name }}</div>
          <div><strong>Languages: </strong>{{ getLanguages(project.programming_languages) }}</div>
          <div><strong>Technologies: </strong>{{ getTechnologies(project.technologies) }}</div>
          <!--          <div><strong>Description: </strong>{{ project.description }}</div>-->
          <div class="d-flex mt-4 mb-2 justify-content-center">
            <button-primary :link="project.project_url">
              SHOW ON GITHUB
            </button-primary>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {store} from "../../store.js";
import ButtonPrimary from "./ButtonPrimary.vue";

export default {
  name: "ProjectCard",
  components: {ButtonPrimary},
  data() {
    return {
      store,
      loading: false,
    }
  },
  props: {
    project: {
      type: Object,
      required: true,
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
    getProjectImage(project) {
      return project.image === null ?
          this.store.backEndStorageURL + 'uploads/no-img.jpg' :
          this.store.backEndStorageURL + project.image;
    },
  }
}
</script>

<style scoped lang="scss">
@use 'src/scss/partials/my-variables' as *;

.card {
  border-width: 0;
  border-radius: $border-r-m;
  box-shadow: $my-box-shadow-l;

  .card-body {
    padding: 30px;
    border-radius: $border-r-m;
    background-color: $my-bg-color-primary;

    .project-top {

      .img-wrapper {
        max-width: 100%;
        aspect-ratio: 16 / 9;

        img {
          object-fit: cover;
          width: 100%;
          border-radius: $border-r-s;
          border: 1px solid lightgrey;
          box-shadow: $my-box-shadow-m;
          transition: .3s;

          &:hover {
            scale: 1.03;
          }

          @media (max-width: 768px) {
            &:hover {
              scale: 1.0;
            }
          }
        }
      }

      .card-title {
        padding: 10px;
        background-color: $my-bg-color-primary;
        border-radius: $border-r-s;
        box-shadow: $my-box-shadow-s;
        color: $my-txt-color;
        font-family: 'Scandia', sans-serif;
        font-weight: bold;
        margin-top: 25px;
        margin-bottom: 25px;
      }
    }

    .project-bot-details {
      color: $my-txt-color;
      font-family: 'Scandia', sans-serif;
      padding: 15px 20px;
      border: 1px solid lightgrey;
      background-color: $my-bg-color-primary;
      border-radius: $border-r-s;
      box-shadow: $my-box-shadow-s;
      transition: $my-link-transition-s;

      &:hover {
        scale: 1.03;
      }
    }

  }
}


</style>