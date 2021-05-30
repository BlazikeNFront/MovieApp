<template>
  <div class="backdrop" @click="$emit('close-nav')"></div>
  <nav>
    <ul>
      <li
        @click="
          handleRouteChange();
          $emit('close-nav');
        "
      >
        My Account
      </li>

      <li
        @click.prevent="
          handleMoviesRequest();
          $emit('close-nav');
        "
      >
        Movies
      </li>
      <li
        @click.prevent="
          $emit('close-nav');
          handleTvShowRequest();
        "
      >
        TvShows
      </li>
      <li
        @click.prevent="
          $emit('close-nav');
          handleCelebsRequest();
        "
      >
        Celebs
      </li>
      <li
        v-if="isAuth"
        @click="
          $emit('close-nav');
          logout();
        "
      >
        Logout
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  emits: ["close-nav"],
  computed: {
    isAuth() {
      return this.$store.getters["UserAuth/isAuth"];
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("UserAuth/logout");
      this.$router.push("/");
    },
    handleRouteChange() {
      if (this.isAuth) {
        this.$router.push("/UserAccountDetails");
      } else {
        this.$router.push("/login");
      }
    },
    handleMoviesRequest() {
      this.$router.push({
        name: "nav-search-result",
        params: { typeOfSearch: "movies" },
        query: { page: 1 },
      });
    },
    handleTvShowRequest() {
      this.$router.push({
        name: "nav-search-result",
        params: { typeOfSearch: "tvShows" },
        query: { page: 1 },
      });
    },
    handleCelebsRequest() {
      this.$router.push({
        name: "nav-search-result",
        params: { typeOfSearch: "celebs" },
        query: { page: 1 },
      });
    },
  },
};
</script>

<style  scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
}

nav {
  position: fixed;
  top: 5.89rem;
  left: 0;
  width: 15rem;
  height: 20rem;
  border-radius: 0 15px 15px 0;
  background-color: #1a1919;
  z-index: 1000;
}
li {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid black;
  font-size: 1.5rem;
  color: White;
  text-align: center;
  list-style-type: none;
  cursor: pointer;
}
li:hover {
  background-color: #242222;
  text-shadow: 0px 0px 4px #ffffff;
}

a {
  color: white;
  text-decoration: none;
}
@media (min-width: 500px) {
  .backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 33rem;
    height: 65.5rem;
    z-index: 2;
  }
  nav {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>