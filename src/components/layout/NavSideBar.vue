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
      <li>
        <router-link to="/show" @click="$emit('close-nav')"
          >Details</router-link
        >
      </li>
      <li @click="$emit('close-nav')">Movies</li>
      <li @click="$emit('close-nav')">TvShows</li>
      <li @click="$emit('close-nav')">Celebs</li>
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