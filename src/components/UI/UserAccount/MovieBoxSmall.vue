<template>
  <article class="ratedShows movies">
    <div class="dataLoadingBox" v-if="!moviesRated">
      <h3>Loading data...</h3>
      <spinner></spinner>
    </div>
    <show-rated-box
      v-else
      v-for="(movie, key) of moviesRated"
      :id="key"
      :key="movie"
      type="movie"
    ></show-rated-box>
  </article>
</template>
<script>
import ShowRatedBox from "./ShowRatedBox.vue";

export default {
  props: ["moviesRated"],
  components: {
    ShowRatedBox,
  },
};
</script>
<style>
</style>