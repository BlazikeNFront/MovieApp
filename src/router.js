import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index.js";
import MainPage from "./pages/MainPage.vue";
import UserSearchResult from "./pages/UserSearchResult.vue";
import NavSearchResult from "./pages/NavSearchResult.vue";
import DetailViewMovie from "./pages/DetailViews/DetaliViewMovie.vue";
import DetailViewShow from "./pages/DetailViews/DetailViewShow.vue";
import SignUpForm from "./pages/SignUpFrom.vue";
import UserAuth from "./pages/userAuth.vue";
import UserAccountDetails from "./pages/UserAccountDetails.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: MainPage },
    { path: "/signUp", component: SignUpForm },
    { path: "/login", component: UserAuth },
    {
      path: "/UserAccountDetails",
      component: UserAccountDetails,
      beforeEnter(to, from, next) {
        if (!store.getters["UserAuth/isAuth"]) {
          next("/login");
        } else {
          next();
        }
      },
    },

    {
      name: "user-search-result",
      path: "/customSearch/:userQuery",
      component: UserSearchResult,
    },
    {
      name: "nav-search-result",
      path: "/searchResult/:typeOfSearch",
      component: NavSearchResult,
      props: true,
    },
    { path: "/movie/:movieID", component: DetailViewMovie },
    { path: "/tv/:showID", component: DetailViewShow },
  ],
});

export default router;
