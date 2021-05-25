<template>
  <header class="header">
    <div class="searchBar" v-if="searchBar">
      <button class="closeSearchButton" @click="toggleSearchOption"></button>
      <form class="form" @submit.prevent="handleSearch">
        <input
          class="input"
          type="text"
          placeholder="...search"
          v-model.trim="searchInput"
        />
        <button class="button formButton">Search</button>
      </form>
    </div>
    <div class="headerBox" v-if="!searchBar">
      <nav-bar v-if="navBar" @close-nav="toggleNavBar"></nav-bar>
      <button class="toggleMenuButton" @click="toggleNavBar"></button>
      <router-link class="routerLink" to="/"><logo></logo></router-link>
    </div>
    <div class="headerBox" v-if="!searchBar">
      <button class="searchButton" @click="toggleSearchOption"></button>
      <div v-if="!isAuth">
        <router-link class="routerLink" to="/login">
          <button class="button signInButton">Login</button></router-link
        >
      </div>
    </div>
  </header>
</template>
<script>
import Logo from "../UI/Logo.vue";
import NavBar from "../layout/NavSideBar.vue";

export default {
  components: {
    Logo,
    NavBar,
  },

  data() {
    return {
      searchInput: null,
    };
  },

  computed: {
    searchBar() {
      return this.$store.getters["HeaderLayout/headerSearchState"];
    },
    navBar() {
      return this.$store.getters["HeaderLayout/navBarState"];
    },
    isAuth() {
      return this.$store.getters["isAuth"];
    },
  },

  methods: {
    toggleSearchOption() {
      this.$store.dispatch("HeaderLayout/toggleHeaderSearch");
    },

    toggleNavBar() {
      this.$store.dispatch("HeaderLayout/toggleNavBar");
    },

    handleSearch() {
      const routerProps = {
        name: "search-result",
        params: { userQuery: this.searchInput },
        query: { page: "1" },
      };

      this.$router.push(
        `/searchResult/${routerProps.params.userQuery}?page=${routerProps.query.page}`,
        routerProps
      );

      this.searchInput = "";
    },
  },
};
</script>

<style scoped>
header {
  position: fixed;
  margin: 0 auto;
  padding: 1.5rem 1.5rem;
  width: 100%;
  max-width: 50rem;
  border-bottom: 2px solid var(--main-color);
  border-radius: 0 0 10px 10px;
  background-color: #292e2b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
}
input {
  height: 3rem;
  background-color: inherit;
  border: none;
  font-family: inherit;
  color: white;
  font-size: 2rem;
  text-align: center;
}

input::placeholder {
  color: #a8adaa;
}

form {
  display: flex;
  justify-content: space-between;
}

.headerBox {
  display: flex;
  align-items: center;
}

.searchBar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

button {
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.5);
  font-family: inherit;
}

.formButton {
  padding: 0.6rem;
  font-family: inherit;
  background: black;
  color: white;
}

.routerLink {
  text-decoration: none;
}

.signInButton {
  background-color: #292e2b;
  color: white;
  box-shadow: none;
  font-size: 1.5rem;
}
.searchButton {
  margin-right: 1rem;
  width: 3rem;
  height: 3rem;
  box-shadow: none;
  border: none;
  background-color: #292e2b;
  background-image: url("../../../public/assets/icons/searchIcon.png");
  background-size: cover;
}
.closeSearchButton {
  margin-right: 2rem;
  width: 2rem;
  height: 2rem;
  box-shadow: none;
  border: none;
  background-size: cover;
  background-image: url("../../../public/assets/icons/closeButton.svg");
  background-color: #292e2b;
}

.toggleMenuButton {
  margin-right: 2rem;
  width: 2.5rem;
  height: 2.5rem;
  box-shadow: none;
  border: none;
  background-color: #292e2b;
  background-image: url("../../../public/assets//icons/menu.svg");
  background-size: cover;
}
@media (min-width: 500px) {
  header {
    position: absolute;
    z-index: 1000;
  }
  .searchBar {
    width: 5rem;
  }
  .closeSearchButton {
    position: absolute;
  }
}
</style>
