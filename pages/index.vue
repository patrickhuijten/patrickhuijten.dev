<template>
  <div>
    <component
      :data-aos="{ 'fade-right': index > 0 }"
      data-aos-duration="1000"
      v-for="(page, index) in pages"
      :is="page.name"
      :key="page.uuid"
      v-bind="page.content"
      :colorTheme="colorTheme"
    />
  </div>
</template>
<script>
import Work from "~/components/pages/work";
import About from "~/components/pages/about";
export default {
  components: {
    About,
    Work,
  },
  meta() {
    return {
      description: "hello world",
    };
  },
  async asyncData({ app }) {
    const { data } = await app.$storyapi.get("cdn/stories", {
      version: "draft",
    });
    return {
      pages: data.stories
        .filter((page) => page.parent_id === 0)
        .sort((a, b) => a.content.index - b.content.index),
    };
  },
};
</script>