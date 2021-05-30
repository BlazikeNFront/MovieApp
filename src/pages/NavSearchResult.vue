<template>
  <div>
    <div v-if="searchData">
      <ul>
        <spinner class="spinner" v-if="searchData.length === 0"></spinner>
        <show-card
          v-else
          v-for="show in searchData"
          :key="show.id"
          :active="show"
          :actor="show.gender"
        ></show-card>
      </ul>
      <pagination-buttons
        v-if="numberOfPages"
        class="searchResult__paginationButton"
        :numberOfPages="parseInt(numberOfPages)"
        :currentPage="parseInt(currentPage)"
        @pageChange="changePage($event)"
      ></pagination-buttons>
    </div>
    <h2 v-else-if="searchData.length === 0">
      Sorry not a single data found ... :(
    </h2>
  </div>
</template>
<script>
import ShowCard from "../components/UI/ShowCard/ShowCard.vue";
import PaginationButtons from "../components/UI/Common/PaginationButtons.vue";
import Spinner from "../components/UI/Common/Spinner.vue";
export default {
  components: {
    ShowCard,
    PaginationButtons,
    Spinner,
  },
  props: ["typeOfSearch"],
  mounted() {
    this.fetchDataBasedOnTypeOfShow();
  },

  computed: {
    currentTypeOfSearch() {
      return this.typeOfSearch;
    },
    searchData() {
      return this.$store.getters["HeaderLayout/searchData"];
    },
    numberOfPages() {
      return this.$store.getters["HeaderLayout/getNumberOfPages"];
    },
    currentPage() {
      return this.$route.query.page;
    },
  },
  watch: {
    currentTypeOfSearch(newVal) {
      this.fetchDataBasedOnTypeOfShow(newVal);
    },
  },
  methods: {
    fetchDataBasedOnTypeOfShow(page = this.$route.query.page) {
      console.log(page);
      this.$store.dispatch("HeaderLayout/clearSearchData");

      switch (this.currentTypeOfSearch) {
        case "movies":
          this.$store.dispatch("HeaderLayout/updateSearchData", {
            url: `https://api.themoviedb.org/3/movie/top_rated?api_key=b9e62fadaa93179070f235a9087033e2&language=en-US&page=${page}`,
            movies: true,
          });

          break;

        case "tvShows":
          this.$store.dispatch("HeaderLayout/updateSearchData", {
            url: `https://api.themoviedb.org/3/tv/on_the_air?api_key=b9e62fadaa93179070f235a9087033e2&language=en-US&page=${page}
`,
          });

          break;

        case "celebs":
          this.$store.dispatch("HeaderLayout/updateSearchData", {
            url: ` https://api.themoviedb.org/3/person/popular?api_key=b9e62fadaa93179070f235a9087033e2&language=en-US&page=${page}`,
          });

          break;
      }
    },
    changePage(page) {
      this.$router.push({
        name: "nav-search-result",
        params: { typeOfSearch: this.currentTypeOfSearch },
        query: { page },
      });
      console.log(page);
      this.fetchDataBasedOnTypeOfShow(page);
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
.spinner {
  width: 100%;
  display: flex;

  flex-direction: column;
  align-items: center;
}
</style>