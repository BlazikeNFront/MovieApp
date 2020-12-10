<template>
  <header>
    <div class="searchBar" v-if="headerState === 'searchBar'">
      <input type="text" placeholder="...search" />
      <button class="searchBarExit" @click="toggleSearch"></button>
    </div>
    <div class="headerBox" v-if="headerState === 'standard'">
      <button class="menuButton" @click='toggleNavBar'></button>
      <logo></logo>
    </div>
    <div class="headerBox" v-if="headerState === 'standard'">
      <button class="searchButton" @click="toggleSearch"></button>
      <base-button CSS="common headerSignIn">Sign In</base-button>
    </div>
  </header>
  <nav-bar v-if='navBarState' @close-nav='toggleNavBar'></nav-bar>
</template>
<script>
import Logo from "../UI/Logo.vue";
import NavBar from "../layout/NavSideBar.vue";

export default {
  components: {
    Logo,
    NavBar
  },
  // PUT THIS DATA  INTO VUEX AS GLOBAL STATE OF DATA
  data() {
    return {
      headerState: "standard",
      navBarState:false,
    };
  },
  methods: {
    toggleSearch() {
      if (this.headerState === "standard") {
        this.headerState = "searchBar";
      } else {
        this.headerState = "standard";
      }
      
    },

    toggleNavBar(){
      this.navBarState = !this.navBarState
      console.log(this.navBarState)
    }
  },
};
</script>

<style scoped>
header {
  padding: 1.5rem 1.5rem;
  background-color: #292e2b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
input {
  width: 85vw;
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
.headerBox {
  display: flex;
  align-items: center;
}
.searchBar {
  display: flex;
  align-items: center;
}

.searchButton {
  margin-right: 2rem;
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
