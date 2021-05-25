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
    <h2 v-else-if="searchData.length === 0">
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
  mounted() {
    this.$store.dispatch("HeaderLayout/updateSearchData", {
      url: `https://api.themoviedb.org/3/search/multi?api_key=b9e62fadaa93179070f235a9087033e2&language=en-US&query=${this.$route.params.userQuery}&page=${this.$route.query.page}`,
    });
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
  margin: 19rem auto;
  width: 90%;
  text-align: center;
}
</style>