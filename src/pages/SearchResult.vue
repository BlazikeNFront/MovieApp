<template>
  <section>
    <rate-form></rate-form>
    <!-- <ul v-if="searchData">
      <show-card
        v-for="show in searchData.results"
        :key="show.id"
        :active="show"
      ></show-card>
    </ul> -->
  </section>
</template>
<script>
//import ShowCard from "../components/UI/ShowCard.vue";
import RateForm from "../components/UI/RateForm.vue";
export default {
  components: {
    // ShowCard,
    RateForm,
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
};
</script>
<style scoped>
button {
  padding: 1rem;
}
</style>