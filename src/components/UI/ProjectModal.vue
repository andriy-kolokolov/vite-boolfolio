<template>
  <transition>
    <div v-if="show" class="project-modal" @click="hideModal">
      <div class="modal-content">
        <div class="modal__img-wrapper">
          <img v-if="!hasNoImg" :src="projectImage" alt="">
          <h1 v-else class="text-center">No image available :(</h1>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {

    }
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    project: {
      type: Object,
      required: true,
    },
    projectImage: {
      type: String,
    }
  },
  computed: {
    hasNoImg() {
      return this.projectImage.includes("no-img");
    },
  },
  methods: {
    hideModal() {
      this.$emit('update:show', false)
    }
  },
}
</script>

<style scoped lang="scss">
@use "src/scss/partials/my-variables" as *;

.project-modal {
  z-index: 100;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-content {

    .modal__img-wrapper {
      margin: auto;
      width: 80vw;
      aspect-ratio: 16 / 6;

      img {
        border-radius: $border-r-s;
        width: 100%;
      }
    }
  }
}

.v-enter-active{
  transition: opacity .5s ease;
}

.v-leave-active {
  transition: opacity .3s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>