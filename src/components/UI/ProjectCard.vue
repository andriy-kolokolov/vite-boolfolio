<template>
    <div>
      <div class="card h-100"> <!-- Add 'h-100' class to make cards the same height -->
        <div class="card-body d-flex flex-column justify-content-between">
          <div class="project-top">
            <div class="img-wrapper">
              <img :src="getProjectImage(project)" alt="">
              <h5 class="card-title">{{ project.title }}</h5>
            </div>
          </div>

          <div class="project-details h-100">
            <div><strong>Type: </strong>{{ project.type.name }}</div>
            <div><strong>Languages: </strong>{{ getLanguages(project.programming_languages) }}</div>
            <div><strong>Technologies: </strong>{{ getTechnologies(project.technologies) }}</div>
            <!--          <div><strong>Description: </strong>{{ project.description }}</div>-->
            <div><strong>Project url: </strong><a :href="project.project_url">{{ project.project_url }}</a></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {store} from "../../store.js";

export default {
  name: "ProjectCard",
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
@use 'src/scss/partials/variables' as *;



.card {
  border-width: 0;
  border-radius: $border-r-s;
  box-shadow: 0 0 11px 1px rgba(0,0,0,0.25);
}

.card-body {
  border-radius: $border-r-s;
  background-color: $my-bg-color-secondary;
}

.card-title {
  margin-top: 15px;
  margin-bottom: 15px;
}

.project-details {
  border: 1px solid lightgrey;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: $border-r-s;
  padding: 10px;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.20);
}

.img-wrapper {
  padding: 10px;
  max-width: 100%;
  aspect-ratio: 16 / 9;

  img {
    object-fit: cover;
    width: 100%;
    border-radius: $border-r-s;
  }
}

</style>