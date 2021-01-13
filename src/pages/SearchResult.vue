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
    <h2 v-if="searchData.results.length === 0">
      Sorry not a single data found ... :(
    </h2>
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
h2 {
  display: block;
  width: 90%;
  font-size: 4rem;
  margin: 19rem auto;
  text-align: center;
}

button {
  padding: 1rem;
}
</style>