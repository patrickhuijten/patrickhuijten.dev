<template>
  <div class="page">
    <div class="container">
      <div class="grid">
        <div class="title">
          <h2 v-text="title" />
          <span class="text-secondary" />
        </div>
        <div class="index btn-group-vertical">
          <div class="scroller" :style="{ '--offset': index }" />
          <button
            class="company"
            :class="{ active: key === index }"
            v-for="(company, key) in companies"
            :key="company._uid"
            v-text="company.name"
            @click="setIndex(key)"
          />
        </div>
        <div class="block">
          <transition-group name="list">
            <CompanyItem :company="currentCompany" :key="currentCompany._uid" />
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import CompanyItem from "@/components/work/CompanyItem";
export default {
  components: {
    CompanyItem,
  },
  props: {
    title: {
      type: String,
      default: null,
      immediate: true,
    },
    companies: {
      type: Array,
      default: [],
      immediate: true,
    },
  },
  data() {
    return {
      index: 0,
    };
  },
  computed: {
    currentCompany() {
      let currentCompany = this.companies[this.index]
        ? this.companies[this.index]
        : null;

      return currentCompany;
    },
    period() {
      const start = new moment(new Date(this.currentCompany.start_date)).format(
        "MMM YYYY"
      );
      const end = new moment(new Date(this.currentCompany.end_date)).format(
        "MMM YYYY"
      );
      const current = this.currentCompany.current;

      return `${start} - ${current ? "Present" : end}`;
    },
  },
  methods: {
    setIndex(index) {
      const instance = this;
      this.$nextTick(() => {
        instance.index = index;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-areas:
    "title title"
    "index block";
  grid-template-rows: 50px 500px;

  @include mobile-only() {
    grid-template-areas:
      "title"
      "index"
      "block";

    grid-template-rows: 50px 50px 500px;
  }

  > .title {
    grid-area: title;
  }

  > .index {
    grid-area: index;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 50px;
    position: relative;

    > .scroller {
      position: absolute;
      left: 0;
      width: 2px;
      height: 50px;
      background-color: var(--highlight);
      will-change: transform, background-color;
      transition: var(--transition);
      transform: translateY(calc(50px * var(--offset)));

      @include mobile-only() {
        display: none;
      }
    }
    @include mobile-only() {
      grid-auto-flow: column;
      grid-auto-columns: max-content;
      overflow-x: auto;
    }

    > .company {
      will-change: transform;
      color: var(--text);
      background: none;
      text-align: left;
      border-color: var(--border);
      padding-left: 20px;
      transition: color 200ms;
      &:hover {
        color: var(--highlight);
      }

      @include desktop-only() {
        border: none;
      }

      @include mobile-only() {
        padding: 0 20px;
        border-width: 0 0 2px 0;
        border-color: transparent;
      }

      &.active {
        color: var(--highlight);
        border-color: var(--highlight);
        font-weight: bold;
      }
    }
  }

  .block {
    grid-area: block;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    display: grid;
    grid-auto-rows: 100%;
    grid-auto-columns: 100%;
    position: relative;

    .responsibilities {
      margin-top: 1rem;
    }

    .company {
      position: absolute;
    }
  }
}
</style>