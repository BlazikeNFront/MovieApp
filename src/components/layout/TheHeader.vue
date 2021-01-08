<template>
  <header>
    <div class="searchBar" v-if="searchBar">
      <button class="searchBarExit" @click="toggleSearchOption"></button>
      <form @submit.prevent="handleSearch">
        <input type="text" placeholder="...search" v-model.trim="searchInput" />
        <base-button CSS="common searchBarConfirm">Search</base-button>
      </form>
    </div>
    <div class="headerBox" v-if="!searchBar">
      <button class="menuButton" @click="toggleNavBar"></button>
      <router-link to="/"><logo></logo></router-link>
    </div>
    <div class="headerBox" v-if="!searchBar">
      <button class="searchButton" @click="toggleSearchOption"></button>
      <div v-if="!isAuth">
        <router-link to="/login">
          <base-button CSS="common headerSignIn"
            >Login</base-button
          ></router-link
        >
      </div>
    </div>
  </header>
  <nav-bar v-if="navBar" @close-nav="toggleNavBar"></nav-bar>
</template>
<script>
import Logo from "../UI/Logo.vue";
import NavBar from "../layout/NavSideBar.vue";
import BaseButton from "../UI/BaseButton.vue";

export default {
  components: {
    Logo,
    NavBar,
    BaseButton,
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
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
input {
  width: 70vw;
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
}
.headerBox {
  display: flex;
  align-items: center;
}
.searchBar {
  display: flex;
  align-items: center;
}

a {
  text-decoration: none;
}

.searchButton {
  margin-right: 1rem;
  background-color: #292e2b;
  background-image: url("../../assets/icons/searchIcon.png");
  box-shadow: none;
  border: none;
  background-size: cover;
  height: 3rem;
  width: 3rem;
}
.searchBarExit {
  margin-right: 2rem;
  background-image: url("../../assets/icons/closeButton.svg");
  background-color: #292e2b;
  box-shadow: none;
  border: none;
  background-size: cover;
  height: 2rem;
  width: 2rem;
}

.menuButton {
  margin-right: 2rem;
  background-color: #292e2b;
  background-image: url("../../assets/icons/menu.svg");
  box-shadow: none;
  border: none;
  background-size: cover;
  height: 2.5rem;
  width: 2.5rem;
}
</style>
