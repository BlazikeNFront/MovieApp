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
        @pageChange="fetchDataForPage($event)"
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
import { movieDBAPIKey } from "../../privates.js";

export default {
  components: {
    ShowCard,
    PaginationButtons,
    Spinner,
  },

  mounted() {
    this.fetchDataForPage();
  },

  computed: {
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

  methods: {
    fetchDataForPage(
      page = this.$route.query.page,
      query = this.$route.params.userQuery
    ) {
      this.$store.dispatch("HeaderLayout/clearSearchData");
      this.fetchDataFromApi(query, page);
      const routerProps = {
        name: "user-search-result",
        params: { userQuery: query },
        query: { page },
      };
      this.$router.push(`/customSearch/${query}?page=${page}`, routerProps);
    },

    fetchDataFromApi(query, page) {
      this.$store.dispatch("HeaderLayout/updateSearchData", {
        url: `https://api.themoviedb.org/3/search/multi?api_key=${movieDBAPIKey}&language=en-US&query=${query}&page=${page}`,
      });
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