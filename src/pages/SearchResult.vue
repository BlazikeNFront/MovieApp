<template>
  <section>
    <button @click="check">CHECK</button>
    <ul v-if="searchData">
      <show-card
        v-for="show in searchData.results"
        :key="show.id"
        :active="show"
      ></show-card>
    </ul>
  </section>
</template>
<script>
import ShowCard from "../components/UI/ShowCard.vue";

export default {
  components: {
    ShowCard,
  },

  data() {
    return {
      searchData: null,
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
  methods: {
    check() {
      console.log(this.searchData.results);
    },
  },
};
</script>
<style scoped>
button {
  padding: 1rem;
}
</style>