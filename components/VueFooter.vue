<template>
  <footer>
    <div class="text-secondary text-center">
      <span>Patrick Huijten</span>
      <span>|</span>
      <span>
        <a :href="`mailto:${email}`" v-text="email" />
      </span>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      name: "Patrick Huijten",
      email: "psbheh@gmail.com"
    };
  }
};
</script>
<style lang="scss" scoped>
footer {
  @include desktop-only() {
    position: fixed;
    bottom: 0rem;
    padding: 1rem 0;
    will-change: background-color;
    transition: background-color var(--transition);
    background-color: var(--background);
  }
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
}
</style>