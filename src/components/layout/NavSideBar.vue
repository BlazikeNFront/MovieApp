<template>
  <div @click="$emit('close-nav')"></div>
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
          $emit('close-nav');
          handleMoviesRequest();
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
          logout();
          $emit('close-nav');
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
      return this.$store.getters["isAuth"];
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
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
      this.$store.dispatch("HeaderLayout/updateSearchData", {
        url: `https://api.themoviedb.org/3/movie/top_rated?api_key=b9e62fadaa93179070f235a9087033e2&language=en-US&page=1`,
        movies: true,
      });
      this.$router.push("/searchResult");
    },
    handleTvShowRequest() {
      this.$store.dispatch("HeaderLayout/updateSearchData", {
        url: `https://api.themoviedb.org/3/tv/on_the_air?api_key=b9e62fadaa93179070f235a9087033e2&language=en-US&page=1
`,
      });
      this.$router.push("/searchResult");
    },
    handleCelebsRequest() {
      this.$store.dispatch("HeaderLayout/updateSearchData", {
        url:
          "https://api.themoviedb.org/3/person/popular?api_key=b9e62fadaa93179070f235a9087033e2&language=en-US&page=1",
      });
      this.$router.push("/searchResult");
    },
  },
};
</script>

<style  scoped>
div {
  position: fixed;
  z-index: 2;
  height: 100vh;
  width: 100vw;
}

nav {
  position: fixed;
  background-color: #4c4d4f;
  width: 15rem;
  height: 40rem;
  top: 5.89rem;
  border-radius: 0 15px 15px 0;
  z-index: 10;
}
li {
  padding: 1rem 1.5rem;
  font-size: 1.5rem;
  color: White;
  text-align: center;
  border-bottom: 1px solid black;
}

a {
  color: white;
  text-decoration: none;
}
</style>