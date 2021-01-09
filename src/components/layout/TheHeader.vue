<template>
  <header>
    <div class="searchBar" v-if="searchBar">
      <button class="closeSearchButton" @click="toggleSearchOption"></button>
      <form @submit.prevent="handleSearch">
        <input type="text" placeholder="...search" v-model.trim="searchInput" />
        <button class="button formButton">Search</button>
      </form>
    </div>
    <div class="headerBox" v-if="!searchBar">
      <button class="toggleMenuButton" @click="toggleNavBar"></button>
      <router-link to="/"><logo></logo></router-link>
    </div>
    <div class="headerBox" v-if="!searchBar">
      <button class="searchButton" @click="toggleSearchOption"></button>
      <div v-if="!isAuth">
        <router-link to="/login">
          <button class="button signInButton">Login</button></router-link
        >
      </div>
    </div>
  </header>
  <nav-bar v-if="navBar" @close-nav="toggleNavBar"></nav-bar>
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
      this.$store.dispatch("HeaderLayout/updateSearchData", {
        url: `https://api.themoviedb.org/3/search/multi?api_key=b9e62fadaa93179070f235a9087033e2&language=en-US&query=${this.searchInput}&page=1`,
      });
      this.$router.push("/searchResult");
      this.searchInput = "";
    },
  },
};
</script>

<style scoped>
header {
  padding: 1.5rem 1.5rem;
  margin: 0 auto;
  max-width: 500px;
  background-color: #292e2b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0 0 10px 10px;
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
::placeholder {
  color: #a8adaa;
}

form {
  display: flex;
  width: 80%;
  justify-content: space-between;
}
.headerBox {
  display: flex;
  align-items: center;
}
.searchBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.button {
  font-family: inherit;
  border-radius: 20px;
  background-color: none;
  border: none;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.5);
}

.formButton {
  font-family: inherit;
  background: black;
  padding: 0.6rem;
  color: white;
}

a {
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
  background-color: #292e2b;
  background-image: url("../../../public/assets/icons/searchIcon.png");
  box-shadow: none;
  border: none;
  background-size: cover;
  height: 3rem;
  width: 3rem;
}
.closeSearchButton {
  margin-right: 2rem;
  background-image: url("../../../public/assets/icons/closeButton.svg");
  background-color: #292e2b;
  box-shadow: none;
  border: none;
  background-size: cover;
  height: 2rem;
  width: 2rem;
}

.toggleMenuButton {
  margin-right: 2rem;
  background-color: #292e2b;
  background-image: url("../../../public/assets//icons/menu.svg");
  box-shadow: none;
  border: none;
  background-size: cover;
  height: 2.5rem;
  width: 2.5rem;
}
</style>
