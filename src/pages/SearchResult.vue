<template>
  <section>
    <ul v-if="searchData">
      <show-card
        v-for="show in searchData.results"
        :key="show.id"
        :active="show"
        :actor="show.gender"
      ></show-card>
    </ul>
  </section>
</template>
<script>
import ShowCard from "../components/UI/ShowCard/ShowCard.vue";

export default {
  components: {
    ShowCard,
  },

  data() {
    return {
      searchData: this.$store.getters["HeaderLayout/searchData"],
    };
  },

  computed: {
    searchDataAvalible() {
      return this.$store.getters["HeaderLayout/searchData"];
    },
  },
  watch: {
    searchDataAvalible(newVal) {
      this.searchData = newVal;
    },
  },
};
</script>
<style scoped>
button {
  padding: 1rem;
}
</style>