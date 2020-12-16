<template>
  <main>
    <div>
      <standard-carousel
        v-if="moviesLoaded"
        :slides="trendingMovies.results"
        title="Trending Movies"
      ></standard-carousel>
      <standard-carousel
        v-if="tvShowsLoaded"
        :slides="trendingTv.results"
        title="Trending TvShow"
      ></standard-carousel>
    </div>
  </main>
</template>
<script>
export default {
  beforeCreate() {
    this.$store.dispatch("StandardCarousels/updateTrendingMovies");
    this.$store.dispatch("StandardCarousels/updateTrendingTvShows");
  },

  data() {
    return {
      trendingMovies: this.$store.getters["StandardCarousels/trendingMovies"],
      trendingTv: this.$store.getters["StandardCarousels/trendingTvShows"],
      moviesLoaded: false,
      tvShowsLoaded: false,
    };
  },
  computed: {
    updatedTrendingMovies() {
      return this.$store.getters["StandardCarousels/trendingMovies"];
    },
    updatedTrendingTvShows() {
      return this.$store.getters["StandardCarousels/trendingTvShows"];
    },
  },
  watch: {
    updatedTrendingMovies(newVal) {
      this.trendingMovies = newVal;
      this.moviesLoaded = true;
    },
    updatedTrendingTvShows(newVal) {
      this.trendingTv = newVal;
      this.tvShowsLoaded = true;
    },
  },
};
</script>
<style scoped>
</style>