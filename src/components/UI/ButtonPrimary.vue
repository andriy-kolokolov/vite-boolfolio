<template>
  <button type="button" class="button-primary">
    <a :href="link" target="_blank">
      <slot></slot>
    </a>
  </button>
</template>

<script>
export default {
  name: "Button-Primary",
  props: {
    link: {
      type: String,
      required: true
    }
  }

}
</script>

<style scoped lang="scss">
@use 'src/scss/partials/my-variables' as *;

.button-primary {
  outline: none;
  border-width: 0;
  padding: 10px 30px;
  border-radius: $border-r-l;
  background-color: $my-color-green;
  transition: $my-link-transition-s;

  &:hover {
    scale: 1.04;
  }

  &:active {
    scale: 0.90;
  }

  a {
    font-weight: 500;
    text-decoration: none;
    color: #eeeeee;
    transition: $my-link-transition-s;
  }
}
</style>