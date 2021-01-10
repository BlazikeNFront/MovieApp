<template>
  <article class="ratedShows actors">
    <div class="dataLoadingBox" v-if="!actors">
      <h3>Loading data...</h3>
      <spinner></spinner>
    </div>
    <show-rated-box
      v-else
      v-for="(actor, key) of actors"
      :id="key"
      :key="actor"
      type="person"
    ></show-rated-box>
  </article>
</template>
<script >
import ShowRatedBox from "./ShowRatedBox.vue";
export default {
  props: ["actors"],
  components: {
    ShowRatedBox,
  },
};
</script>