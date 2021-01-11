<template>
  <article class="ratedShows tvShows">
    <div class="dataLoadingBox" v-if="!tvShows">
      <h3>Loading data...</h3>
      <spinner></spinner>
    </div>
    <show-rated-box
      v-else
      v-for="(show, key) of tvShows"
      :id="key"
      :key="key"
      type="tv"
    ></show-rated-box>
  </article>
</template>
<script>
import ShowRatedBox from "./ShowRatedBox.vue";
export default {
  props: ["tvShows"],

  components: {
    ShowRatedBox,
  },
};
</script>
<style >
</style>