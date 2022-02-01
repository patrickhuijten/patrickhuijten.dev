<template>
  <nuxt-link class="project shadow-sm btn btn-light border-0" :to="url">
    <img class="card-img w-100 h-100" :src="project.thumbnail" />

    <h4 class="card-img-overlay">{{ project.name }}</h4>
  </nuxt-link>
</template>
<script>
export default {
  props: {
    project: {
      type: Object,
      default: null,
    },
    url: {
      type: String,
      default: null,
    },
  },
};
</script>
<style lang="scss" scoped>
.project {
  padding: 0;
  position: relative;
  .card-img {
    object-fit: cover;
  }
  .card-img-overlay {
    opacity: 0;
    background-color: var(--light);
    object-fit: cover;
    height: 100%;
    transition: opacity, background-color 250ms ease;

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>