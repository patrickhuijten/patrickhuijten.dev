<template>
  <div class="light-switcher">
    <font-awesome-icon
      :icon="['far', 'moon']"
      @click="setColorTheme('dark')"
      :class="{ active: colorTheme === 'dark' }"
    />
    <font-awesome-icon
      :icon="['fas', 'sun']"
      @click="setColorTheme('light')"
      :class="{ active: colorTheme === 'light' }"
    />
    <font-awesome-icon
      :icon="['fas', 'adjust']"
      @click="setColorTheme('auto')"
      :class="{ active: colorTheme === 'auto' }"
    />
  </div>
</template>
<script>
export default {
  props: ["colorTheme"],
  data() {
    return {
      colorTheme: null,
    };
  },
  methods: {
    setColorTheme(colorTheme) {
      this.colorTheme = colorTheme;
      this.$cookies.set("color-theme", colorTheme);
      window.document.documentElement.setAttribute("color-theme", colorTheme);
    },
    getColorTheme() {
      if (window) {
        const colorTheme = window.localStorage.getItem("color-theme");
        if (colorTheme) {
          this.colorTheme = colorTheme;
        }
        this.setColorTheme(colorTheme);
      }
    },
  },
  mounted() {
    this.getColorTheme();
  },
};
</script>
<style lang="scss" scoped>
.light-switcher {
  position: fixed;
  top: 50px;
  right: 50px;
  height: 20px;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 20px;
  gap: 20px;
  z-index: 1;

  svg {
    cursor: pointer;
    &.active {
      color: var(--highlight) !important;
    }
  }
}
</style>
